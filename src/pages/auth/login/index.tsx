import { Link, useLocation, useNavigate } from 'react-router-dom';

import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';

import Input from '../../../components/input';

interface FormValue {
  email: string;
  password: string;
  remember: boolean;
}

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email : Yup.string().email('E-mail precisa ser válido').required('E-mail é obrigatório'),
    password: Yup.string().required('Senha é obrigatório'),

    remeber: Yup.boolean()
  });

  const initialValues: FormValue = {email: '', password: '', remember: false};

  function onSubmit(values: FormValue, helpers: FormikHelpers<FormValue>) {
    console.log(values);

    helpers.setSubmitting(false);
    navigate(location.search || '/');
  }

  return (
    <div className="page-login min-h-screen bg-gray-100">
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Faça login em sua conta
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              ou{' '}
              <Link to="/cadastre-se" className="text-indigo-600 hover:text-indigo-500">
                comece seu teste gratuito de 14 dias
              </Link>
            </p>
          </div>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form className="mt-8 space-y-6 bg-white shadow p-10 rounded-lg">
              <Input type="email" name="email" label="E-mail" placeholder="Informe seu e-mail" />
              <Input type="password" name="password" label="Senha" placeholder="Informe sua senha" />

              <div className="flex items-center justify-between">
                <Input type="checkbox" name="remember" label="Lembrar-se" />

                <div className="text-sm">
                  <Link to="/esqueci-senha" className="text-indigo-600 hover:text-indigo-500">
                    Esqueceu sua senha?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Entrar
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}