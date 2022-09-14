import { useState } from 'react';

import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';

import { Profile } from '../../models/profile';
import { FileUpload } from '../../models/file-upload';

import Input from '../../components/input';
import Loading from '../../components/loading';
import UploadImage from '../../components/upload-image';
import UploadAvatar from '../../components/upload-avatar';

import ProfileApi from '../../services/apis/profile.service';
import { CookieService } from '../../services/cookie.service';

export default function ProfileForm() {
  
  const [loading, setLoading] = useState(true);
  const [cvPT, setCVPT] = useState<FileUpload>();
  const [cvEN, setCVEN] = useState<FileUpload>();
  const [photo, setPhoto] = useState<FileUpload>();
  const [profile, setProfile] = useState<Profile>(new Profile());

  useState(async () => {
    const profileStr = CookieService.getCookie('profile');
    if (profileStr) {
      const profile: Profile = JSON.parse(profileStr);

      // PROFESSION INI
      const date = new Date(profile.profession_init);
      
      const monthInt = date.getMonth() + 1;
      const month = monthInt < 10 ? `0${monthInt}` : monthInt;

      const dayInt = date.getDate();
      const day = dayInt < 10 ? `0${dayInt}` : dayInt;
      
      profile.profession_init = `${date.getFullYear()}-${month}-${day}`;

      if (profile.photo) setPhoto(new FileUpload(profile.photo));
      if (profile.CV_PT) setCVPT(new FileUpload(profile.CV_PT));
      if (profile.CV_EN) setCVEN(new FileUpload(profile.CV_EN));
      
      setProfile(profile);
    }
    setLoading(false);
  });

  const validationSchema = Yup.object({
    name: Yup.string().required('Nome é obrigatório'),
    profession_PT: Yup.string().required('Profissão em português é obrigatório'),
    profession_EN: Yup.string().required('Profissão em inglês é obrigatório'),
    profession_init: Yup.date().required('Início da Profissão é obrigatório'),
    about_PT: Yup.string().required('Descrição em português é obrigatório'),
    about_EN: Yup.string().required('Descrição em inglês é obrigatório')
  });

  function onChangeCVPT(files?: FileUpload | FileUpload[]) {
    if (files instanceof Array) setCVPT(files[0]);
    else setCVPT(files);
  }

  function onChangeCVEN(files?: FileUpload | FileUpload[]) {
    if (files instanceof Array) setCVEN(files[0]);
    else setCVEN(files);
  }

  async function onSubmit(values: Profile, helpers: FormikHelpers<Profile>) {
    if (photo?.file) {
      values.photo = await ProfileApi.uploadFile(profile.id, photo.file, `photo.${photo.extension}`);
    } else if (profile.photo && !photo) {
      await ProfileApi.deleteFile(profile.photo);
      values.photo = null;
    }

    if (cvPT?.file) {
      values.CV_PT = await ProfileApi.uploadFile(profile.id, cvPT.file, `cv_pt.${cvPT.extension}`);
    } else if (profile.CV_PT && !cvPT) {
      await ProfileApi.deleteFile(profile.CV_PT);
      values.CV_PT = null;
    }

    if (cvEN?.file) {
      values.CV_EN = await ProfileApi.uploadFile(profile.id, cvEN.file, `cv_en.${cvEN.extension}`);
    } else if (profile.CV_EN && !cvEN) {
      await ProfileApi.deleteFile(profile.CV_EN);
      values.CV_EN = null;
    }

    values.profession_init = new Date(values.profession_init);

    const data = await ProfileApi.update(profile.id, values);
    CookieService.setCookie('profile', JSON.stringify(data));
    helpers.setSubmitting(false);
  }

  return (
    <div className="page-profile-form relative min-h-full">
      <h2 className="text-3xl font-medium">Perfil</h2>
      <p className="mb-6 text-gray-500">Informações pessoais de seu perfil profissional.</p>
      
      <div className={`h-full bg-white shadow rounded-lg px-4 py-2 overflow-hidden ${loading && 'relative py-16'}`}>
        {loading && <Loading absolute />}

        {!loading &&
          <Formik initialValues={profile} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <div className="p-6 flex-1 space-y-4">
                  <div className="flex">
                    <div className="flex-1">
                      <UploadAvatar
                        label="Foto"
                        path={photo?.path}
                        onChange={setPhoto}
                      />
                    </div>
                    <div className="flex-1 text-right">
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
                  </div>

                  <div className="flex">
                    <div className="flex-1 pr-2">
                      <Input name="name" label="Nome" placeholder="Informe o nome" />
                    </div>
                    <div className="flex-1 pl-2">
                      <Input type="date" name="profession_init" label="Início da Profissão" placeholder="Informe o início da profissão" />
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-1 pr-2">
                      <Input name="profession_PT" label="Profissão (PT)" placeholder="Informe a profissão em português" />
                    </div>
                    <div className="flex-1 pl-2">
                      <Input name="profession_EN" label="Profissão (EN)" placeholder="Informe a profissão em inglês" />
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-1 pr-2">
                      <Input
                        type="textarea"
                        name="about_PT"
                        label="Descrição (PT)"
                        placeholder="Informe a descrição em português"
                      />
                    </div>
                    <div className="flex-1 pl-2">
                      <Input
                        type="textarea"
                        name="about_EN"
                        label="Descrição (EN)"
                        placeholder="Informe a descrição em inglês"
                      />
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-1 pr-2">
                      <UploadImage
                        label="Currículo (PT)"
                        path={cvPT?.path}
                        onChange={onChangeCVPT}
                      />
                    </div>
                    <div className="flex-1 pl-2">
                      <UploadImage
                        label="Currículo (EN)"
                        path={cvEN?.path}
                        onChange={onChangeCVEN}
                      />
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        }
      </div>
    </div>
  );
}