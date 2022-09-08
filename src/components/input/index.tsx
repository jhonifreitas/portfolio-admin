interface Props {
  id?: string;
  value?: any;
  rows?: number;
  label?: string;
  required?: boolean;
  disabled?: boolean;

  name: string;
  type: 'text' | 'date' | 'email' | 'password' | 'textarea' | 'radio' | 'checkbox';
}

export default function Input(props: Props) {
  return (
    <div className={`${props.type === 'checkbox' || props.type === 'radio' ? 'flex align-center space-x-2' : '' }`}>

      {/* LABEL */}
      { props.label && props.type !== 'radio' && props.type !== 'checkbox' &&
        <label htmlFor={props.id || props.name} className="text-sm font-medium text-gray-600">{props.label}</label>
      }

      {/* TEXT - DATE */}
      { (props.type === 'text' || props.type === 'password' || props.type === 'date' || props.type === 'email') &&
        <input
          id={props.id || props.name}
          name={props.name}
          type={props.type}
          required={props.required}
          disabled={props.disabled}
          value={props.value}
          className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
      }

      {/* TEXTAREA */}
      { props.type === 'textarea' &&
        <textarea
          id={props.id || props.name}
          name={props.name}
          rows={props.rows || 3}
          required={props.required}
          disabled={props.disabled}
          value={props.value}
          className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        ></textarea>
      }

      {/* CHECKBOX - RADIO */}
      { (props.type === 'checkbox' || props.type === 'radio') &&
        <>
          <input
            id={props.id || props.name}
            name={props.name}
            type={props.type}
            required={props.required}
            disabled={props.disabled}
            value={props.value}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          { props.label &&
            <label htmlFor={props.id || props.name} className="block text-sm text-gray-900">{props.label}</label>
          }
        </>
      }
    </div>
  );
}