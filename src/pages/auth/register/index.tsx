import { Link, useLocation, useNavigate } from 'react-router-dom';

import Input from '../../../components/input';

export default function Register() {

  const location = useLocation();
  const navigate = useNavigate();

  const responseBody: {[key: string]: FormDataEntryValue} = {};

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.forEach((value, property) => responseBody[property] = value);
    console.log(responseBody);
    navigate(location.search || '/');
  }

  return (
    <div className="page-register h-screen bg-gray-100">
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Crie sua nova conta
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              ou{' '}
              <Link to="/entrar" className="text-indigo-600 hover:text-indigo-500">
                faça seu login agora
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6 bg-white shadow p-10 rounded-lg" onSubmit={onSubmit}>
            <Input type="email" name="email" label="E-mail" required />
            <Input type="password" name="password" label="Senha" required />

            <Input type="checkbox" name="term" label="Termos e Condições de uso" />

            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Criar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}