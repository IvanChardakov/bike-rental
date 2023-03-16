import { InputHTMLAttributes } from 'react';
import Error from './Error';
import Label from './Label';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: string;
  register?: any;
  validation?: any;
}

function Input({ register, name, error, validation, label, ...rest }: InputProps) {
  return (
    <div className="mb-4">
      {label && <Label name={name} label={label} />}
      <input
        {...register(name, { ...validation })}
        {...rest}
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      {error && <Error errorMessage={error} />}
    </div>
  );
}

export default Input;
