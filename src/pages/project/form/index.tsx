import { useState } from 'react';

import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';

import { Skill } from '../../../models/skill';
import { Project } from '../../../models/project';
import { Company } from '../../../models/company';

import SkillApi from '../../../services/apis/skill.service';
import CompanyApi from '../../../services/apis/company.service';
import ProjectApi from '../../../services/apis/project.service';

import Input from '../../../components/input';
import Loading from '../../../components/loading';
import ComboBox from '../../../components/combobox';
import SlideOver from '../../../components/slide-over';

interface Props {
  isOpen: boolean;
  onClose: (project?: Project) => void;

  project?: Project;
}

export default function ProjectForm(props: Props) {

  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);

  const types = [
    {id: 'mobile', name: 'Aplicativo'},
    {id: 'system', name: 'Sistema'},
    {id: 'website', name: 'Site'},
    {id: 'e-commerce', name: 'Site de Vendas'},
  ];

  const validationSchema = Yup.object({
    name: Yup.string().required('Nome é obrigatório'),
    companyId: Yup.string().required('Empresa é obrigatório'),
    skillIds: Yup.array().of(Yup.string()).min(1, 'Selecione ao menos uma habilidade'),
    type: Yup.string().equals(types.map(x => x.id)).required('Tipo é obrigatório'),
    description_PT: Yup.string().required('Descrição em português é obrigatório'),
    description_EN: Yup.string().required('Descrição em inglês é obrigatório'),

    link: Yup.string().url('Link precisa ser uma URL válida')
  });

  const initialValues = props.project || new Project();

  useState(async () => {
    await getSkills();
    await getCompanies();
    setLoading(false);
  });

  async function getSkills() {
    const skills = await SkillApi.getAll();
    setSkills(skills);
  }

  async function getCompanies() {
    const companies = await CompanyApi.getAll();
    setCompanies(companies);
  }

  async function onSubmit(values: Project, helpers: FormikHelpers<Project>) {
    const project = await ProjectApi.save(values);
    helpers.setSubmitting(false);
    props.onClose(project);
  }

  return (
    <SlideOver isOpen={props.isOpen} onClose={props.onClose}>
      {loading && <Loading absolute />}
      {!loading &&
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <div className="bg-indigo-600 text-white px-6 py-7">
                <h2 className="text-xl">{props.project?.id ? 'Editar Projeto' : 'Novo Projeto'}</h2>
                <p className="text-sm text-white/60">
                  {props.project?.id && 'Vamos modificar as informações abaixo para editar seu projeto.'}
                  {!props.project?.id && 'Comece preenchendo as informações abaixo para criar seu novo projeto.'}
                </p>
              </div>

              <div className="p-6 flex-1 space-y-4">
                <Input name="name" label="Nome" placeholder="Informe o nome" />
                <Input name="link" label="Link" placeholder="Informe o link" />
                <ComboBox name="companyId" label="Empresas" items={companies} />
                <ComboBox name="skillIds" label="Habilidades" items={skills} multiple />
                <ComboBox name="type" label="Tipo" items={types} />
                <Input
                  type="textarea"
                  name="description_PT"
                  label="Descrição (PT)"
                  placeholder="Informe a descrição em português"
                />
                <Input
                  type="textarea"
                  name="description_EN"
                  label="Descrição (EN)"
                  placeholder="Informe a descrição em inglês"
                />
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
      }
    </SlideOver>
  );
}