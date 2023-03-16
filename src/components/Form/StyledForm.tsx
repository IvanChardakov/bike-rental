import React from 'react';

export interface FormProps {
  defaultValues?: any;
  children?: React.ReactNode;
  buttonLabel?: string;
  onSubmit?: any;
  handleSubmit?: any;
  register?: any;
  formTitle?: string;
  parentClasses?: string;
  formClasses?: string;
}

function StyledForm({
  register,
  handleSubmit,
  onSubmit,
  children,
  formTitle,
  parentClasses = 'max-w-md ',
  formClasses = '',
  ...rest
}: FormProps) {
  return (
    <div className={`mx-auto ${parentClasses}`}>
      <form
        className={`p-6 bg-white rounded shadow-md ${formClasses}`}
        onSubmit={handleSubmit(onSubmit)}
        {...rest}
      >
        {formTitle ? <h2 className="text-xl font-bold mb-4">{formTitle}</h2> : null}
        {children}
      </form>
    </div>
  );
}

export default StyledForm;
