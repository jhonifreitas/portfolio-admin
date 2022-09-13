import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';

import { Company } from '../../../models/company';

import CompanyApi from '../../../services/apis/company.service';

import Input from '../../../components/input';
import Loading from '../../../components/loading';
import SlideOver from '../../../components/slide-over';

interface Props {
  isOpen: boolean;
  onClose: (company?: Company) => void;

  company?: Company;
}

export default function CompanyForm(props: Props) {

  const validationSchema = Yup.object({
    name: Yup.string().required('Anos é obrigatório'),
    link: Yup.string().url('Link precisa ser uma URL válida').required('Link é obrigatório')
  });

  const initialValues = props.company || new Company();

  async function onSubmit(values: Company, helpers: FormikHelpers<Company>) {
    const company = await CompanyApi.save(values);
    helpers.setSubmitting(false);
    props.onClose(company);
  }

  return (
    <SlideOver isOpen={props.isOpen} onClose={props.onClose}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div className="bg-indigo-600 text-white px-6 py-7">
              <h2 className="text-xl">{props.company?.id ? 'Editar Empresa' : 'Nova Empresa'}</h2>
              <p className="text-sm text-white/60">
                {props.company?.id && 'Vamos modificar as informações abaixo para editar sua empresa.'}
                {!props.company?.id && 'Comece preenchendo as informações abaixo para criar sua nova empresa.'}
              </p>
            </div>

            <div className="p-6 flex-1 space-y-4">
              <Input name="name" label="Nome" placeholder="Informe o nome" />
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