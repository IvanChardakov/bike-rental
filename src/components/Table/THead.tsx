import React from 'react';

function THead({ title }: { title: string }) {
  return <th className="border border-gray-400 px-4 py-2 capitalize">{title}</th>;
}

export default THead;
