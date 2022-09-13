import { useState } from 'react';
import { FolderPlusIcon, PlusIcon } from '@heroicons/react/24/outline';

import { Project } from '../../../models/project';

import ProjectForm from '../form';
import Loading from '../../../components/loading';
import Pagination from '../../../components/pagination';

import ProjectApi from '../../../services/apis/project.service';

export default function ProjectList() {
  
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<Project>();
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  useState(async () => {
    const companies = await ProjectApi.getAll();
    setProjects(companies);
    setLoading(false);
  });

  function openProject(project?: Project) {
    setProject(project);
    setFormIsOpen(true);
  }

  function formClose(project?: Project) {
    setFormIsOpen(false);
    setProject(undefined);

    if (project) {
      const index = projects.findIndex(x => x.id === project.id);
      if (index >= 0) projects[index] = project;
      else projects.push(project);
    }
  }

  return (
    <div className={`page-project-list relative min-h-full ${ projects.length ? 'pb-24' : ''}`}>
      <h2 className={`text-3xl font-medium ${ !projects.length ? 'mb-6' : '' }`}>Projetos</h2>

      {/* TABLE */}
      { projects.length > 0 &&
        <>
          <p className="mb-6 text-gray-500">Listagem de todos os projetos já registrados.</p>

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
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td className="border-b py-4 px-7">{project.name}</td>
                    <td
                      className="border-b py-4 px-7 cursor-pointer duration-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-500"
                      onClick={() => openProject(project)}
                    >
                      Editar
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination page={1} perPage={10} length={projects.length} />
          </div>

          <button
            type="button"
            onClick={() => openProject()}
            className={`rounded-full border border-transparent bg-indigo-600 p-3 text-sm font-medium text-white
            absolute bottom-0 right-0 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
          >
            <PlusIcon className="h-10 w-10" />
          </button>
        </>
      }

      {/* EMPTY */}
      { !projects.length &&
        <div className="relative bg-white shadow rounded-lg p-8 text-center overflow-hidden">
          {loading && <Loading absolute />}

          <FolderPlusIcon className="text-gray-400 h-12 w-12 mx-auto" />
          <div className="mt-4 mb-5">
            <h5>Nenhum projeto</h5>
            <p className="text-gray-400">Vamos começar criando um novo projeto</p>
          </div>
          <button
            type="button"
            onClick={() => openProject()}
            className="inline-flex justify-center gap-x-2 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <PlusIcon className="h-5 w-5" />
            Novo Projeto
          </button>
        </div>
      }

      <ProjectForm project={project} isOpen={formIsOpen} onClose={formClose} />
    </div>
  );
}