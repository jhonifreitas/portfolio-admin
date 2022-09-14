import { useState } from 'react';

import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';

import { Company } from '../../../models/company';

import Input from '../../../components/input';
import Loading from '../../../components/loading';
import SlideOver from '../../../components/slide-over';
import { FileUpload } from '../../../models/file-upload';
import UploadImage from '../../../components/upload-image';

import CompanyApi from '../../../services/apis/company.service';

interface Props {
  isOpen: boolean;
  onClose: (company?: Company) => void;

  company?: Company;
}

export default function CompanyForm(props: Props) {

  const [logo, setLogo] = useState<FileUpload>();

  const validationSchema = Yup.object({
    name: Yup.string().required('Anos é obrigatório'),
    init: Yup.date().required('Início é obrigatório'),
    end: Yup.date(),
    link: Yup.string().url('Link precisa ser uma URL válida').required('Link é obrigatório'),

    description_PT: Yup.string().required('Descrição em português é obrigatório'),
    description_EN: Yup.string().required('Descrição em inglês é obrigatório')
  });

  const initialValues = props.company || new Company();

  useState(() => {
    // DATE INIT
    const date = new Date(initialValues.init);
      
    const monthInt = date.getMonth() + 1;
    const month = monthInt < 10 ? `0${monthInt}` : monthInt;

    const dayInt = date.getDate();
    const day = dayInt < 10 ? `0${dayInt}` : dayInt;
    initialValues.init = `${date.getFullYear()}-${month}-${day}`;

    // DATE END
    if (initialValues.end) {
      const date = new Date(initialValues.end);

      const monthInt = date.getMonth() + 1;
      const month = monthInt < 10 ? `0${monthInt}` : monthInt;

      const dayInt = date.getDate();
      const day = dayInt < 10 ? `0${dayInt}` : dayInt;
      initialValues.end = `${date.getFullYear()}-${month}-${day}`;
    }
  });

  function onChangeLogo(files?: FileUpload | FileUpload[]) {
    if (files instanceof Array) setLogo(files[0]);
    else setLogo(files);
  }

  async function onSubmit(values: Company, helpers: FormikHelpers<Company>) {
    values.init = new Date(values.init);
    if (values.end) values.end = new Date(values.end);

    const company = await CompanyApi.save(values);

    if (logo?.file) {
      await CompanyApi.uploadLogo(company.id, logo.file);
    } else if (company.logo && !logo) {
      await CompanyApi.deleteLogo(company.id);
    }

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

              <div className="flex">
                <div className="flex-1 pr-2">
                  <Input type="date" name="init" label="Início" placeholder="Informe o início" />
                </div>
                <div className="flex-1 pl-2">
                  <Input type="date" name="end" label="Saída" placeholder="Informe o saída" />
                </div>
              </div>

              <Input type="textarea" name="description_PT" label="Descrição (PT)" placeholder="Informe a descrição em português" />
              <Input type="textarea" name="description_EN" label="Descrição (EN)" placeholder="Informe a descrição em inglês" />

              <UploadImage
                label="Logo"
                path={logo?.path}
                onChange={onChangeLogo}
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
    </SlideOver>
  );
}