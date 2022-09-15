import { XMarkIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

import { FileUpload } from "../../models/file-upload";

interface Props {
  label: string;
  paths?: string[];
  path?: string | null;
  multiple?: boolean;
  accept?: string;

  onChange: (file: FileUpload | FileUpload[] | undefined) => void;
}

export default function UploadImage(props: Props) {

  const [files, setFiles] = useState<FileUpload[]>([]);
  const accept = props.accept || 'image/*,application/pdf';

  if (props.path && !files.length) setFiles([new FileUpload(props.path)]);
  // else if (props.paths && !files.length) {
  //   for (const path of props.paths) {
  //     const file = new FileUpload(path);
  //     files.push(file);
  //   }
  //   setFiles(files);
  // }

  function onUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      for (let index = 0; index < event.target.files.length; index++) {
        const file = event.target.files.item(index);
        if (file) {
          const reader = new FileReader();

          reader.addEventListener("load", (event) => {
            const base64 = event.target?.result as string;
            const image = new FileUpload(base64, file);
            files.push(image);
            setFiles(files);

            if (props.multiple) props.onChange(files);
            else props.onChange(image);
          });
          reader.readAsDataURL(file);
        }
      }

      event.target.value = '';
    }
  }

  function onRemove(index: number) {
    files.splice(index, 1);
    setFiles(files);
    props.onChange(files);
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{props.label}</label>

      {/* UPLOAD */}
      {(props.multiple || (!props.multiple && files.length === 0)) &&
        <label
          htmlFor="file-upload"
          className={`mt-1 flex flex-auto justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6
          hover:cursor-pointer hover:border-indigo-400`}
        >
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            className="sr-only"
            accept={accept}
            multiple={props.multiple}
            onChange={onUpload}
          />
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-sm">Carregar Arquivo</span>
            <p className="text-xs text-gray-500">PNG, JPG, GIF, PDF até 10MB</p>
          </div>
        </label>
      }

      {/* FILES */}
      {files.length > 0 &&
        <div className="flex gap-x-4 gap-y-3 flex-wrap mt-3">
          {files.map((file, index) => (
            <div key={index} className="relative flex-auto shadow-md rounded-md overflow-hidden">
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="absolute top-0 right-0 bg-rose-500 text-white p-1 hover:bg-rose-400 focus:outline-none"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>

              <div className="flex h-full items-center p-3 bg-gray-100">
                {file.isImage &&
                  <div className="rounded-md h-16 w-16 overflow-hidden bg-gray-200 flex items-center">
                    <img src={file.path} alt="" />
                  </div>
                }

                {!file.isImage &&
                  <div className="p-3 rounded-md bg-indigo-600 text-white">
                    <svg
                      fill="currentColor"
                      viewBox="0 0 384 512"
                      className="mx-auto h-8 w-8"
                    >
                      <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z"/>
                    </svg>
                  </div>
                }
                <div className="px-3">
                  <p className="text-sm">{file.fileName}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  );
}
