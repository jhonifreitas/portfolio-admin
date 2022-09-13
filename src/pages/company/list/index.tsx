import { useState } from 'react';
import { FolderPlusIcon, PlusIcon } from '@heroicons/react/24/outline';

import { Company } from '../../../models/company';

import CompanyForm from '../form';
import Loading from '../../../components/loading';
import Pagination from '../../../components/pagination';

import CompanyApi from '../../../services/apis/company.service';

export default function CompanyList() {
  
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState<Company>();
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);

  useState(async () => {
    const companies = await CompanyApi.getAll();
    setCompanies(companies);
    setLoading(false);
  })

  function openCompany(company?: Company) {
    setCompany(company);
    setFormIsOpen(true);
  }

  function formClose(company?: Company) {
    setFormIsOpen(false);
    setCompany(undefined);

    if (company) {
      const index = companies.findIndex(x => x.id === company.id);
      if (index >= 0) companies[index] = company;
      else companies.push(company);
    }
  }

  return (
    <div className={`page-company-list relative min-h-full ${ companies.length ? 'pb-24' : ''}`}>
      <h2 className={`text-3xl font-medium ${ !companies.length ? 'mb-6' : '' }`}>Empresas</h2>

      {/* TABLE */}
      { companies.length > 0 &&
        <>
          <p className="mb-6 text-gray-500">Listagem de todos as empresas já registradas.</p>

          <div className="bg-white border shadow rounded-lg overflow-hidden">
            <table className="border-collapse table-auto w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="border-b font-medium py-4 px-7">Tipo</th>
                  <th className="border-b font-medium py-4 px-7">Link</th>
                  <th className="border-b font-medium py-4 px-7 w-10"></th>
                </tr>
              </thead>
              <tbody>
                {companies.map((company) => (
                  <tr key={company.id}>
                    <td className="border-b py-4 px-7">{company.name}</td>
                    <td className="border-b py-4 px-7">{company.link}</td>
                    <td
                      className="border-b py-4 px-7 cursor-pointer duration-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-500"
                      onClick={() => openCompany(company)}
                    >
                      Editar
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination page={1} perPage={10} length={companies.length} />
          </div>

          <button
            type="button"
            onClick={() => openCompany()}
            className={`rounded-full border border-transparent bg-indigo-600 p-3 text-sm font-medium text-white
            absolute bottom-0 right-0 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
          >
            <PlusIcon className="h-10 w-10" />
          </button>
        </>
      }

      {/* EMPTY */}
      { !companies.length &&
        <div className="relative bg-white shadow rounded-lg p-8 text-center overflow-hidden">
          {loading && <Loading absolute />}

          <FolderPlusIcon className="text-gray-400 h-12 w-12 mx-auto" />
          <div className="mt-4 mb-5">
            <h5>Nenhuma empresa</h5>
            <p className="text-gray-400">Vamos começar criando uma nova empresa</p>
          </div>
          <button
            type="button"
            onClick={() => openCompany()}
            className="inline-flex justify-center gap-x-2 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <PlusIcon className="h-5 w-5" />
            Nova Empresa
          </button>
        </div>
      }

      <CompanyForm company={company} isOpen={formIsOpen} onClose={formClose} />
    </div>
  );
}