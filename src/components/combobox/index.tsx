import { Fragment } from 'react';
import { useField } from 'formik';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';


interface Item {
  id: string;
  name: string;
  image?: string;
  disabled?: boolean;
} 

interface Props {
  id?: string;
  value?: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;

  name: string;
  items: Item[];
  multiple?: boolean;
}

export default function ComboBox(props: Props) {
  
  const [field, meta, helpers] = useField(props.name);
  const selected = props.items.find(x => x.id === field.value);

  function onChange(value: Item) {
    helpers.setValue(value.id);
  }

  return (
    <div>
      <Listbox
        value={selected}
        name={props.name}
        multiple={props.multiple}
        disabled={props.disabled}
        onChange={onChange}
      >
        {({ open }) => (
          <>
            {props.label && <Listbox.Label className="block text-sm font-medium text-gray-700">{props.label}</Listbox.Label>}
            <div className="relative my-1">
              <Listbox.Button
                className={`relative w-full cursor-default rounded-md border border-gray-300 bg-white
                py-2 pl-3 pr-10 text-left shadow-sm sm:text-sm focus:outline-none focus:ring-1
                ${meta.error ?
                'text-rose-700 border-rose-400 focus:border-rose-500 focus:ring-rose-500' :
                'text-gray-500 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
              >
                {selected &&
                  <span className="flex items-center">
                    { selected?.image && <img src={selected.image} alt="" className="h-6 w-6 flex-shrink-0 rounded-full mr-3" /> }
                    <span className="block truncate text-gray-800">{selected.name}</span>
                  </span>
                }
                {!selected && <span className="block truncate">{props.placeholder || 'Selecione um item'}</span>}
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {props.items.map((item) => (
                    <Listbox.Option
                      key={item.id}
                      value={item}
                      disabled={item.disabled}
                      className={({ selected }) => (
                        `relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white
                        ${selected ? 'bg-indigo-400 text-white' : 'text-gray-900'}`
                      )}
                    >
                      {({ selected }) => (
                        <>
                          <div className="flex items-center">
                            { item.image && <img src={item.image} alt="" className="h-6 w-6 flex-shrink-0 rounded-full mr-3" />}
                            <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                              {item.name}
                            </span>
                          </div>

                          {selected &&
                            <span className="absolute inset-y-0 right-0 flex items-center right-2">
                              <CheckIcon className="h-5 w-5" />
                            </span>
                          }
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>

      {/* ERROR */}
      { meta.error && <p className="text-rose-600 text-sm">{meta.error}</p>}
    </div>
  );
}