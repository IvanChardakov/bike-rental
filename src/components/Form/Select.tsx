import React, { SelectHTMLAttributes } from 'react';
import Label from './Label';
import Error from './Error';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: string[] | number[];
  error?: string;
  register?: any;
  validation?: any;
  renderCustomOptions?: (a: string | number) => JSX.Element;
}

function Select({
  name,
  label,
  error,
  register,
  validation,
  options,
  renderCustomOptions,
  ...rest
}: SelectProps) {
  return (
    <div className="mb-4">
      <Label name={name} label={label} />

      <select
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={name}
        {...register(name, { ...validation })}
        {...rest}
      >
        <option disabled selected>
          -- select an option --
        </option>
        {options.map((o) => {
          if (renderCustomOptions) {
            return renderCustomOptions(o);
          }
          return (
            <option value={o}>
              <span>{o}</span>
            </option>
          );
        })}
      </select>

      {error && <Error errorMessage={error} />}
    </div>
  );
}

export default Select;
