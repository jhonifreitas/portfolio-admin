import { useState } from 'react';
import { FolderPlusIcon, PlusIcon } from '@heroicons/react/24/outline';

import { Social } from '../../../models/social';

import SocialForm from '../form';
import Loading from '../../../components/loading';
import Pagination from '../../../components/pagination';

import SocialApi from '../../../services/apis/social.service';

export default function SocialList() {
  
  const [social, setSocial] = useState<Social>();
  const [loading, setLoading] = useState(true);
  const [socials, setSocials] = useState<Social[]>([]);
  const [formIsOpen, setFormIsOpen] = useState(false);

  useState(async () => {
    const socials = await SocialApi.getAll();
    setSocials(socials);
    setLoading(false);
  })

  function openSocial(social?: Social) {
    setSocial(social);
    setFormIsOpen(true);
  }

  function formClose(social?: Social) {
    setFormIsOpen(false);
    setSocial(undefined);

    if (social) {
      const index = socials.findIndex(x => x.id === social.id);
      if (index >= 0) socials[index] = social;
      else socials.push(social);
    }
  }

  return (
    <div className={`page-social-list relative min-h-full ${ socials.length ? 'pb-24' : ''}`}>
      <h2 className={`text-3xl font-medium ${ !socials.length ? 'mb-6' : '' }`}>Redes Sociais</h2>

      {/* TABLE */}
      { socials.length > 0 &&
        <>
          <p className="mb-6 text-gray-500">Listagem de todos as redes sociais já registradas.</p>

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
                {socials.map((social) => (
                  <tr key={social.id}>
                    <td className="border-b py-4 px-7">
                      {social.type === 'linked-in' && 'Linked-In'}
                      {social.type === 'github' && 'GitHub'}
                      {social.type === 'facebook' && 'Facebook'}
                      {social.type === 'whatsapp' && 'WhatsApp'}
                      {social.type === 'phone' && 'Telefone'}
                      {social.type === 'email' && 'E-mail'}
                    </td>
                    <td className="border-b py-4 px-7">{social.link}</td>
                    <td
                      className="border-b py-4 px-7 cursor-pointer duration-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-500"
                      onClick={() => openSocial(social)}
                    >
                      Editar
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination page={1} perPage={10} length={socials.length} />
          </div>

          <button
            type="button"
            onClick={() => openSocial()}
            className={`rounded-full border border-transparent bg-indigo-600 p-3 text-sm font-medium text-white
            absolute bottom-0 right-0 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
          >
            <PlusIcon className="h-10 w-10" />
          </button>
        </>
      }

      {/* EMPTY */}
      { !socials.length &&
        <div className="relative bg-white shadow rounded-lg p-8 text-center overflow-hidden">
          {loading && <Loading absolute />}

          <FolderPlusIcon className="text-gray-400 h-12 w-12 mx-auto" />
          <div className="mt-4 mb-5">
            <h5>Nenhuma rede social</h5>
            <p className="text-gray-400">Vamos começar criando uma nova rede social</p>
          </div>
          <button
            type="button"
            onClick={() => openSocial()}
            className="inline-flex justify-center gap-x-2 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <PlusIcon className="h-5 w-5" />
            Nova Rede Social
          </button>
        </div>
      }

      <SocialForm social={social} isOpen={formIsOpen} onClose={formClose} />
    </div>
  );
}