import { useField } from "formik";

interface Props {
  id?: string;
  value?: any;
  label?: string;
  disabled?: boolean;
  placeholder?: string;

  name: string;
  type?: 'text' | 'number' | 'url' | 'email' | 'password' | 'textarea' | 'radio' | 'checkbox';

  rows?: number;
}

export default function Input(props: Props) {

  const [field, meta] = useField(props.name);
  const type = props.type || 'text';

  return (
    <div className={`${type === 'checkbox' || type === 'radio' ? 'flex align-center space-x-2' : '' }`}>

      {/* LABEL */}
      { props.label && type !== 'radio' && type !== 'checkbox' &&
        <label htmlFor={props.id || props.name} className="text-sm font-medium text-gray-600">{props.label}</label>
      }

      {/* TEXT - DATE */}
      { (type === 'text' || type === 'number' || type === 'url' || type === 'password' || type === 'email') &&
        <input
          id={props.id || props.name}
          name={props.name}
          type={type}
          disabled={props.disabled}
          placeholder={props.placeholder}
          value={props.value}
          onChange={field.onChange}
          className={`w-full appearance-none rounded-md border px-3 py-2 mb-1 sm:text-sm focus:z-10 focus:outline-none
          ${meta.error ?
          'text-rose-700 placeholder-rose-800 border-rose-400 focus:border-rose-500 focus:ring-rose-500' :
          'text-gray-900 placeholder-gray-500 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
        />
      }

      {/* TEXTAREA */}
      { type === 'textarea' &&
        <textarea
          id={props.id || props.name}
          name={props.name}
          rows={props.rows || 3}
          disabled={props.disabled}
          placeholder={props.placeholder}
          value={props.value}
          onChange={field.onChange}
          className={`w-full appearance-none rounded-md border px-3 py-2 sm:text-sm focus:z-10 focus:outline-none
          ${meta.error ?
          'text-rose-700 placeholder-rose-800 border-rose-400 focus:border-rose-500 focus:ring-rose-500' :
          'text-gray-900 placeholder-gray-500 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
        ></textarea>
      }

      {/* CHECKBOX - RADIO */}
      { (type === 'checkbox' || type === 'radio') &&
        <>
          <input
            id={props.id || props.name}
            name={props.name}
            type={type}
            disabled={props.disabled}
            value={props.value}
            onChange={field.onChange}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          { props.label &&
            <label htmlFor={props.id || props.name} className="block text-sm text-gray-900">{props.label}</label>
          }
        </>
      }

      {/* ERROR */}
      { meta.error && <p className="text-rose-600 text-sm">{meta.error}</p>}
    </div>
  );
}