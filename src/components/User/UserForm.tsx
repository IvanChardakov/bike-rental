import React from 'react';
import { useForm } from 'react-hook-form';

import Input from '../Form/Input';
import Select from '../Form/Select';
import Button from '../common/Button';
import { IUser } from '../../types/user';
import StyledForm from '../Form/StyledForm';
import { messages } from '../../utils/messages';
import { EMAIL_PATTERN } from '../../utils/constants';

interface UserFormProps {
  onSubmit: (data: Omit<IUser, 'id'>) => void;
  initialValues?: IUser;
  formTitle?: string;
  submitText?: string;
}

function UserForm({ onSubmit, initialValues, formTitle, submitText }: UserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<IUser, 'id'>>({
    defaultValues: initialValues,
  });

  return (
    <StyledForm
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      formTitle={formTitle}
    >
      <Input
        name="email"
        register={register}
        validation={{
          required: messages.required_field,
          pattern: { value: EMAIL_PATTERN, message: messages.not_valid_email },
        }}
        error={errors?.email?.message}
        label="Email"
      />
      <Input
        name="password"
        register={register}
        validation={{ required: messages.required_field }}
        error={errors?.password?.message}
        label="Password"
        type="password"
      />
      <Select
        name={'role'}
        label={'User role'}
        options={['manager', 'user']}
        register={register}
        validation={{ required: messages.required_field }}
        error={errors?.role?.message}
      />
      <Button type="submit" buttonText={submitText} />
    </StyledForm>
  );
}

export default UserForm;
