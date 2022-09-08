import React from 'react';

import { Project } from '../../../interfaces/project';

import Input from '../../../components/input';
import SlideOver from '../../../components/slide-over';

interface Props {
  isOpen: boolean;
  onClose: () => void;

  project?: Project;
}

export default function ProjectForm(props: Props) {

  const responseBody: {[key: string]: FormDataEntryValue} = {};

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.forEach((value, property) => responseBody[property] = value);
    console.log(responseBody);
    props.onClose();
  }

  return (
    <form className="page-project-form" onSubmit={onSubmit}>
      <SlideOver isOpen={props.isOpen} onClose={props.onClose}>
        <div className="bg-indigo-600 text-white px-6 py-7">
          <h2 className="text-xl">Novo Projeto</h2>
          <p className="text-sm text-white/60">Comece preenchendo as informações abaixo para criar seu novo projeto.</p>
        </div>

        <div className="p-6 flex-1 space-y-4">
          <Input type="text" name="name" label="Nome" value={props.project?.name} />
          <Input type="textarea" name="description" label="Descrição" value={props.project?.description} />
        </div>

        <div className="border border-top p-4 space-x-2 text-right">
          <button type="button" onClick={props.onClose} className="rounded-md border py-2 px-4 text-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
            Cancelar
          </button>
          <button type="submit" className="rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Salvar
          </button>
        </div>
      </SlideOver>
    </form>
  );
}