import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';

import { Skill } from '../../../models/skill';

import SkillApi from '../../../services/apis/skill.service';

import Input from '../../../components/input';
import SlideOver from '../../../components/slide-over';
import Loading from '../../../components/loading';

interface Props {
  isOpen: boolean;
  onClose: () => void;

  skill?: Skill;
}

export default function SkillForm(props: Props) {

  const validationSchema = Yup.object({
    name: Yup.string().required('Nome é obrigatório'),
    years: Yup.number().min(0, 'Ano deve ser maior ou igual a 0(zero)').required('Anos é obrigatório'),
    percent: Yup.number().min(1, 'Porcentagem deve ser maior ou igual a 0(zero)')
      .max(100, 'Porcentagem deve ser menos ou igual a 100(cem)').required('Porcentagem é obrigatório')
  });

  const initialValues = props.skill || new Skill();

  async function onSubmit(values: Skill, helpers: FormikHelpers<Skill>) {
    await SkillApi.save(values);
    helpers.setSubmitting(false);
    props.onClose();
  }

  return (
    <SlideOver isOpen={props.isOpen} onClose={props.onClose}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div className="bg-indigo-600 text-white px-6 py-7">
              <h2 className="text-xl">{props.skill?.id ? 'Editar Habilidade' : 'Novo Habilidade'}</h2>
              <p className="text-sm text-white/60">
                {props.skill?.id && 'Vamos modificar as informações abaixo para editar sua habilidade.'}
                {!props.skill?.id && 'Comece preenchendo as informações abaixo para criar sua nova habilidade.'}
              </p>
            </div>

            <div className="p-6 flex-1 space-y-4">
              <Input name="name" label="Nome" placeholder="Informe o nome" />
              <div className="flex">
                <div className="flex-1 pr-2">
                  <Input type="number" name="years" label="Anos" placeholder="Informe os anos" />
                </div>
                <div className="flex-1 pl-2">
                  <Input type="number" name="percent" label="Porcentagem" placeholder="Informe a porcentagem"/>
                </div>
              </div>
            </div>

            <div className="border border-top p-4 space-x-2 text-right">
              <button type="button" onClick={props.onClose} className="rounded-md border py-2 px-4 text-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
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