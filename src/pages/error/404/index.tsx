import { Link } from 'react-router-dom';

export default function Error404() {
  return (
    <div className="page-error-404 flex items-center justify-center h-screen">
      <div className="text-center">
        <p className="text-indigo-600 text-lg font-medium">404</p>
        <div className="my-4">
          <h2 className="text-4xl font-bold">Página não encontrada</h2>
          <p className="text-gray-400">Desculpe, não conseguimos encontrar a página que você está procurando.</p>
        </div>
        <Link to="/" className="text-indigo-600 block">Voltar ao início</Link>
      </div>
    </div>
  );
}