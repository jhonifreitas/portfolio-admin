import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';

import { Social, SocialType } from '../../../models/social';

import SocialApi from '../../../services/apis/social.service';

import Input from '../../../components/input';
import Loading from '../../../components/loading';
import ComboBox from '../../../components/combobox';
import SlideOver from '../../../components/slide-over';

interface Props {
  isOpen: boolean;
  onClose: (social?: Social) => void;

  social?: Social;
}

export default function SocialForm(props: Props) {

  const types = [
    {id: 'email', name: 'E-mail'},
    {id: 'phone', name: 'Telefone'},
    {id: 'whatsapp', name: 'WhatsApp'},
    {id: 'linked-in', name: 'Linked-In'},
    {id: 'github', name: 'GitHub'},
    {id: 'facebook', name: 'Facebook'}
  ];

  const validationSchema = Yup.object({
    type: Yup.string()
      .equals(types.map(x => x.id))
      .required('Anos é obrigatório'),
    link: Yup.string()
      .when('type', {
        is: (type: SocialType) => type === 'phone' || type === 'whatsapp',
        then: Yup.string()
          .min(10, 'Telefone deve ser maior ou igual a 10(dez)')
          .max(11, 'Telefone deve ser menor ou igual a 11(onze)')
      })
      .when('type', {
        is: 'email',
        then: Yup.string().email('E-mail precisa ser válido')
      })
      .when('type', {
        is: (type: SocialType) => type === 'linked-in' || type === 'github' || type === 'facebook',
        then: Yup.string().url('Link precisa ser uma URL válida')
      })
      .required('Link é obrigatório')
  });

  const initialValues = props.social || new Social();

  async function onSubmit(values: Social, helpers: FormikHelpers<Social>) {
    const social = await SocialApi.save(values);
    helpers.setSubmitting(false);
    props.onClose(social);
  }

  return (
    <SlideOver isOpen={props.isOpen} onClose={props.onClose}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div className="bg-indigo-600 text-white px-6 py-7">
              <h2 className="text-xl">{props.social?.id ? 'Editar Rede Social' : 'Nova Rede Social'}</h2>
              <p className="text-sm text-white/60">
                {props.social?.id && 'Vamos modificar as informações abaixo para editar sua rede social.'}
                {!props.social?.id && 'Comece preenchendo as informações abaixo para criar sua nova rede social.'}
              </p>
            </div>

            <div className="p-6 flex-1 space-y-4">
              <ComboBox name="type" label="Tipo" items={types} />
              <Input name="link" label="Link" placeholder="Informe o link" />
            </div>

            <div className="border border-top p-4 space-x-2 text-right">
              <button type="button" onClick={() => props.onClose()} className="rounded-md border py-2 px-4 text-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`group relative inline-flex items-center justify-center rounded-md border border-transparent
                py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                ${isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
              >
                {isSubmitting ?
                  <>
                    <Loading />
                    <span className="ml-2">Salvando</span>
                  </>
                : 'Salvar'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </SlideOver>
  );
}