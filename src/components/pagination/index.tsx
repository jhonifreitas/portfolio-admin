import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

interface Props {
  page: number;
  length: number;
  perPage: number;
}

export default function Pagination(props: Props) {

  const pages = Array.from(Array(3).keys());

  return (
    <div className="flex items-center justify-between bg-white py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Anterior
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Próximo
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Mostrando <span className="font-medium">1</span> à <span className="font-medium">{props.page + props.perPage - 1}</span> de{' '}
            <span className="font-medium">{props.length}</span> resultados
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            >
              <span className="sr-only">Anterior</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>

            {pages.map(page => (
              <a
                href="#"
                key={page}
                className={`relative inline-flex items-center border px-4 py-2 text-sm font-medium
                ${ props.page === (page + 1) ? 'bg-indigo-50 border-indigo-500 text-indigo-600 z-20' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50' }`}
              >
                {page + 1}
              </a>
            ))}
            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            >
              <span className="sr-only">Próximo</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  )
}