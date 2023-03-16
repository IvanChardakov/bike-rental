import { InputHTMLAttributes } from 'react';
import Error from './Error';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  error?: string;
  register?: any;
  validation?: any;
}

function Checkbox({ register, name, error, validation, label, ...rest }: CheckboxProps) {
  return (
    <div className="mb-4">
      <input
        className="mr-2 leading-tight"
        type="checkbox"
        id={name}
        {...register(name, { ...validation })}
        {...rest}
      />
      <label className="text-gray-700 font-bold" htmlFor={name}>
        {label}
      </label>
      {error && <Error errorMessage={error} />}
    </div>
  );
}

export default Checkbox;
