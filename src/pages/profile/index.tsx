import { useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';

import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';

import { Profile } from '../../models/profile';

import Input from '../../components/input';
import Loading from '../../components/loading';

import ProfileApi from '../../services/apis/profile.service';

export default function ProfileForm() {
  
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile>(new Profile());

  useState(async () => {
    const profileId = process.env.REACT_APP_PROFILE_ID;
    if (profileId) {
      const profile = await ProfileApi.getById(profileId);
      
      // PROFESSION INI
      const date = new Date(profile.profession_init);
      
      const monthInt = date.getMonth() + 1;
      const month = monthInt < 10 ? `0${monthInt}` : monthInt;

      const dayInt = date.getDate();
      const day = dayInt < 10 ? `0${dayInt}` : dayInt;
      
      profile.profession_init = `${date.getFullYear()}-${month}-${day}`;
      
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

  async function onSubmit(values: Profile, helpers: FormikHelpers<Profile>) {
    await ProfileApi.update(profile.id, values);
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
                    <div className="flex-1 pr-2">
                      <Input name="name" label="Nome" placeholder="Informe o nome" />
                    </div>
                    <div className="flex-1 pl-2">
                      <Input name="profession_init" label="Início da Profissão" placeholder="Informe o início da profissão" />
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
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`rounded-full border border-transparent p-3 text-sm font-medium text-white
                  absolute bottom-0 right-0 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                  ${isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                >
                  {isSubmitting && <Loading />}
                  {!isSubmitting && <CheckIcon className="h-10 w-10" />}
                </button>
              </Form>
            )}
          </Formik>
        }
      </div>
    </div>
  );
}