import { useState } from "react";

import { FileUpload } from "../../models/file-upload";

interface Props {
  label: string;
  path?: string | null;

  onChange: (file: FileUpload | undefined) => void;
}

export default function UploadAvatar(props: Props) {

  const [image, setImage] = useState<FileUpload>();

  if (props.path && !image) setImage(new FileUpload(props.path));

  function onUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.item(0);
    if (file) {
      const reader = new FileReader();

      reader.addEventListener("load", (event) => {
        const base64 = event.target?.result as string;
        const image = new FileUpload(base64, file);
        setImage(image);
        props.onChange(image);
      });
      reader.readAsDataURL(file);

      event.target.value = '';
    }
  }

  function onRemove() {
    setImage(undefined);
    props.onChange(undefined);
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{props.label}</label>
      <div className="mt-1 flex items-center">
        <input id="inputFile" className="sr-only" type="file" accept="image/*" onChange={(event) => onUpload(event)} />

        <span className="inline-block h-20 w-20 overflow-hidden rounded-full bg-gray-100">
          <img src={image?.path || "/assets/images/avatar.png"} alt="" />
        </span>
        <label
          htmlFor="inputFile"
          className="ml-5 cursor-pointer rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Alterar
        </label>
        {image &&
          <button
            type="button"
            onClick={() => onRemove()}
            className="ml-2 rounded-md border border-rose-400 bg-white py-2 px-3 text-sm font-medium leading-4 text-rose-600 shadow-sm hover:bg-rose-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
          >
            Remover
          </button>
        }
      </div>
    </div>
  );
}
