import { useState } from 'react';
import { FolderPlusIcon, PlusIcon } from '@heroicons/react/24/outline';

import { Skill } from '../../../models/skill';

import SkillForm from '../form';
import Pagination from '../../../components/pagination';
import SkillApi from '../../../services/apis/skill.service';

export default function SkillList() {
  
  const [skill, setSkill] = useState<Skill>();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [formIsOpen, setFormIsOpen] = useState(false);

  useState(async () => {
    const skills = await SkillApi.getAll();
    setSkills(skills);
  })

  function openSkill(skill?: Skill) {
    setSkill(skill);
    setFormIsOpen(true);
  }

  return (
    <div className={`page-skill-list relative min-h-full ${ skills.length ? 'pb-24' : ''}`}>
      <h2 className={`text-3xl font-medium ${ !skills.length ? 'mb-6' : '' }`}>Habilidades</h2>

      {/* TABLE */}
      { skills.length > 0 &&
        <>
          <p className="mb-6 text-gray-500">Listagem de todos as habilidades já registradas.</p>

          <div className="bg-white border shadow rounded-lg overflow-hidden">
            <table className="border-collapse table-auto w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="border-b font-medium py-4 px-7">
                    Nome
                  </th>
                  <th className="border-b font-medium py-4 px-7 w-10"></th>
                </tr>
              </thead>
              <tbody>
                {skills.map((skill) => (
                  <tr key={skill.id}>
                    <td className="border-b py-4 px-7">{skill.name}</td>
                    <td
                      className="border-b py-4 px-7 cursor-pointer duration-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-500"
                      onClick={() => openSkill(skill)}
                    >
                      Editar
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination page={1} perPage={10} length={skills.length} />
          </div>

          <button
            type="button"
            onClick={() => openSkill()}
            className={`rounded-full border border-transparent bg-indigo-600 p-3 text-sm font-medium text-white
            absolute bottom-0 right-0 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
          >
            <PlusIcon className="h-10 w-10" />
          </button>
        </>
      }

      {/* EMPTY */}
      { !skills.length &&
        <div className="bg-white shadow rounded-lg p-8 text-center">
          <FolderPlusIcon className="text-gray-400 h-12 w-12 mx-auto" />
          <div className="mt-4 mb-5">
            <h5>Nenhuma habilidade</h5>
            <p className="text-gray-400">Vamos começar criando uma nova habilidade</p>
          </div>
          <button
            type="button"
            onClick={() => openSkill()}
            className="inline-flex justify-center gap-x-2 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <PlusIcon className="h-5 w-5" />
            Nova Habilidade
          </button>
        </div>
      }

      <SkillForm skill={skill} isOpen={formIsOpen} onClose={() => setFormIsOpen(false)} />
    </div>
  );
}