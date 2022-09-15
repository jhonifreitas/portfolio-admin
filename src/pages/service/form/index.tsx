import { useState } from 'react';

import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';

import { Service } from '../../../models/service';
import { FileUpload } from '../../../models/file-upload';

import Input from '../../../components/input';
import Loading from '../../../components/loading';
import SlideOver from '../../../components/slide-over';
import UploadImage from '../../../components/upload-image';

import ServiceApi from '../../../services/apis/service.service';

interface Props {
  isOpen: boolean;
  onClose: (service?: Service) => void;

  service?: Service;
}

export default function ServiceForm(props: Props) {

  const [loading, setLoading] = useState(true);
  const [icon, setIcon] = useState<FileUpload>();

  const validationSchema = Yup.object({
    title_PT: Yup.string().required('Título em português é obrigatório'),
    title_EN: Yup.string().required('Título em inglês é obrigatório'),
    description_PT: Yup.string().required('Descrição em português é obrigatório'),
    description_EN: Yup.string().required('Descrição em inglês é obrigatório')
  });

  const initialValues = props.service || new Service();

  useState(() => {
    // IMAGE
    if (initialValues.icon) {
      const icon = new FileUpload(initialValues.icon);
      setIcon(icon);
    }

    setLoading(false);
  });

  function onChangeIcon(files?: FileUpload | FileUpload[]) {
    if (files instanceof Array) setIcon(files[0]);
    else setIcon(files);
  }

  async function onSubmit(values: Service, helpers: FormikHelpers<Service>) {
    const service = await ServiceApi.save(values);

    if (icon?.file) {
      await ServiceApi.uploadIcon(service.id, icon.file);
    } else if (service.icon && !icon) {
      await ServiceApi.deleteIcon(service.id);
    }

    helpers.setSubmitting(false);
    props.onClose(service);
  }

  return (
    <SlideOver isOpen={props.isOpen} onClose={props.onClose}>
      {loading && <Loading absolute />}
      {!loading &&
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <div className="bg-indigo-600 text-white px-6 py-7">
                <h2 className="text-xl">{props.service?.id ? 'Editar Serviço' : 'Novo Serviço'}</h2>
                <p className="text-sm text-white/60">
                  {props.service?.id && 'Vamos modificar as informações abaixo para editar seu serviço.'}
                  {!props.service?.id && 'Comece preenchendo as informações abaixo para criar seu novo serviço.'}
                </p>
              </div>

              <div className="p-6 flex-1 space-y-4">
                <Input name="title_PT" label="Título (PT)" placeholder="Informe o título em português" />
                <Input name="title_EN" label="Título (EN)" placeholder="Informe o título em inglês" />
                <Input type="textarea" name="description_PT" label="Descrição (PT)" placeholder="Informe a descrição em português" />
                <Input type="textarea" name="description_EN" label="Descrição (EN)" placeholder="Informe a descrição em inglês" />

                <UploadImage
                  label="Ícone"
                  path={icon?.path}
                  onChange={onChangeIcon}
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