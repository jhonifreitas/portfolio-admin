import { Link } from 'react-router-dom';

export default function Error500() {
  return (
    <div className="page-error-500 flex items-center justify-center h-screen">
      <div className="text-center">
        <p className="text-indigo-600 text-lg font-medium">500</p>
        <div className="my-4">
          <h2 className="text-4xl font-bold">Oops! Ocorreu um erro</h2>
          <p className="text-gray-400">Fique tranquilo, estamos cientes e trabalhando na correção.</p>
        </div>
        <Link to="/" className="text-indigo-600 block">Voltar ao início</Link>
      </div>
    </div>
  );
}