import React from 'react';
import { useForm } from 'react-hook-form';

import Input from '../Form/Input';
import Button from '../common/Button';
import StyledForm from '../Form/StyledForm';

import { messages } from '../../utils/messages';
import { ReservationFormData } from '../../types/formData';

interface ReservationFormProps {
  onSubmit: (data: ReservationFormData) => void;
  formTitle?: string;
  submitText?: string;
}

function ReservationForm({ onSubmit, formTitle, submitText }: ReservationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReservationFormData>();

  return (
    <StyledForm
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      formTitle={formTitle}
    >
      <Input
        name="fromDate"
        register={register}
        validation={{
          required: messages.required_field,
        }}
        error={errors?.fromDate?.message}
        label="From"
        type="date"
      />
      <Input
        name="toDate"
        register={register}
        validation={{ required: messages.required_field }}
        error={errors?.toDate?.message}
        label="To"
        type="date"
      />
      <Button type="submit" buttonText={submitText} />
    </StyledForm>
  );
}

export default ReservationForm;
