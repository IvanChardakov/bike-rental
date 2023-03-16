import React from 'react';
import { useForm } from 'react-hook-form';

import Input from '../Form/Input';
import Button from '../common/Button';
import Checkbox from '../Form/Checkbox';
import StyledForm from '../Form/StyledForm';

import { messages } from '../../utils/messages';
import { BikeFormData } from '../../types/formData';

interface UserFormProps {
  onSubmit: (data: BikeFormData) => void;
  initialValues?: BikeFormData | undefined;
  formTitle?: string;
  submitText?: string;
}

function BikeForm({ onSubmit, initialValues, formTitle, submitText }: UserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<BikeFormData>({
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
        name="model"
        register={register}
        validation={{
          required: messages.required_field,
        }}
        error={errors?.model?.message}
        label="Model"
      />
      <Input
        name="color"
        register={register}
        validation={{
          required: messages.required_field,
        }}
        error={errors?.color?.message}
        label="Color"
        type="color"
        defaultValue={getValues('color')}
        style={{ padding: 0 }}
      />
      <Input
        name="location"
        register={register}
        validation={{
          required: messages.required_field,
        }}
        error={errors?.location?.message}
        label="Location"
      />
      <Input
        name="rating"
        register={register}
        error={errors?.rating?.message}
        validation={{
          valueAsNumber: true,
          min: 1,
          max: 5,
        }}
        label="Raiting"
        type="number"
        step="0.1"
        min="1"
        max="5"
      />
      <Checkbox
        name="isAvailable"
        register={register}
        error={errors?.isAvailable?.message}
        label="Available"
      />
      <Button type="submit" buttonText={submitText} />
    </StyledForm>
  );
}

export default BikeForm;
