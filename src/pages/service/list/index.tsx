import { useState } from 'react';
import { FolderPlusIcon, PlusIcon } from '@heroicons/react/24/outline';

import { Service } from '../../../models/service';

import ServiceForm from '../form';
import Loading from '../../../components/loading';
import Pagination from '../../../components/pagination';

import ServiceApi from '../../../services/apis/service.service';

export default function ServiceList() {
  
  const [service, setService] = useState<Service>();
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<Service[]>([]);
  const [formIsOpen, setFormIsOpen] = useState(false);

  useState(async () => {
    const services = await ServiceApi.getAll();
    setServices(services);
    setLoading(false);
  })

  function openService(service?: Service) {
    setService(service);
    setFormIsOpen(true);
  }

  function formClose(service?: Service) {
    setFormIsOpen(false);
    setService(undefined);

    if (service) {
      const index = services.findIndex(x => x.id === service.id);
      if (index >= 0) services[index] = service;
      else services.push(service);
    }
  }

  return (
    <div className={`page-service-list relative min-h-full ${ services.length ? 'pb-24' : ''}`}>
      <h2 className={`text-3xl font-medium ${ !services.length ? 'mb-6' : '' }`}>Serviços</h2>

      {/* TABLE */}
      { services.length > 0 &&
        <>
          <p className="mb-6 text-gray-500">Listagem de todos os serviços já registrados.</p>

          <div className="bg-white border shadow rounded-lg overflow-hidden">
            <table className="border-collapse table-auto w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="border-b font-medium py-4 px-7">Título</th>
                  <th className="border-b font-medium py-4 px-7">Descrição</th>
                  <th className="border-b font-medium py-4 px-7 w-10"></th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.id}>
                    <td className="border-b py-4 px-7">{service.title_PT}</td>
                    <td className="border-b py-4 px-7">{service.description_PT}</td>
                    <td
                      className="border-b py-4 px-7 cursor-pointer duration-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-500"
                      onClick={() => openService(service)}
                    >
                      Editar
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination page={1} perPage={10} length={services.length} />
          </div>

          <button
            type="button"
            onClick={() => openService()}
            className={`rounded-full border border-transparent bg-indigo-600 p-3 text-sm font-medium text-white
            absolute bottom-0 right-0 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
          >
            <PlusIcon className="h-10 w-10" />
          </button>
        </>
      }

      {/* EMPTY */}
      { !services.length &&
        <div className="relative bg-white shadow rounded-lg p-8 text-center overflow-hidden">
          {loading && <Loading absolute />}

          <FolderPlusIcon className="text-gray-400 h-12 w-12 mx-auto" />
          <div className="mt-4 mb-5">
            <h5>Nenhuma serviço</h5>
            <p className="text-gray-400">Vamos começar criando um novo serviço</p>
          </div>
          <button
            type="button"
            onClick={() => openService()}
            className="inline-flex justify-center gap-x-2 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <PlusIcon className="h-5 w-5" />
            Novo Serviço
          </button>
        </div>
      }

      <ServiceForm service={service} isOpen={formIsOpen} onClose={formClose} />
    </div>
  );
}