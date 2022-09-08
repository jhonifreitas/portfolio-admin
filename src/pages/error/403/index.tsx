import { Link } from 'react-router-dom';

export default function Error403() {
  return (
    <div className="page-error-403 flex items-center justify-center h-screen">
      <div className="text-center">
        <p className="text-indigo-600 text-lg font-medium">403</p>
        <div className="my-4">
          <h2 className="text-4xl font-bold">Acesso Negado</h2>
          <p className="text-gray-400">Desculpe, você não tem permissão para acessar está página.</p>
        </div>
        <Link to="/" className="text-indigo-600 block">Voltar ao início</Link>
      </div>
    </div>
  );
}