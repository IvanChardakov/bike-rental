import React from 'react';

interface ErrorProps {
  errorMessage: string | undefined;
}

function Error({ errorMessage }: ErrorProps) {
  return <p className="text-red-600 italic">{errorMessage}</p>;
}

export default Error;
