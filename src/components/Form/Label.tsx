import React from 'react';

interface LalbelProps {
  name: string;
  label: string;
}

function Label({ name, label }: LalbelProps) {
  return (
    <label className="block text-gray-700 font-bold mb-2" htmlFor={name}>
      {label}
    </label>
  );
}

export default Label;
