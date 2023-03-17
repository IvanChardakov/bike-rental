import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { messages } from '../utils/messages';
import Input from '../components/Form/Input';
import Error from '../components/Form/Error';
import Button from '../components/common/Button';
import { EMAIL_PATTERN } from '../utils/constants';
import { RegisterFormData } from '../types/formData';
import StyledForm from '../components/Form/StyledForm';
import UserManagerContext from '../services/userManager/UserManagerContext';

function Register() {
  const { createUser } = useContext(UserManagerContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm<RegisterFormData>();

  const onSubmit = (data: RegisterFormData) => {
    const { email, password } = data;

    try {
      createUser({ email, password, role: 'user' });
      alert('Thank you for registering. Please log in');
      navigate('/login');
    } catch (error: any) {
      if (error?.message) {
        setError('root.serverError', { message: error?.message });
      }
    }
  };

  return (
    <StyledForm
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      formTitle="Register"
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
      <Input
        name="confirmPassword"
        register={register}
        validation={{
          required: messages.required_field,
          validate: (val: string) => {
            if (watch('password') !== val) {
              return messages.password_dont_match;
            }
          },
        }}
        error={errors?.confirmPassword?.message}
        label="Confirm password"
        type="password"
      />

      {errors?.root?.serverError && <Error errorMessage={errors?.root?.serverError?.message} />}

      <div className="flex justify-between items-center">
        <Button type="submit" buttonText={'Register'} />
        <Link to="/login" className="ml-4 text-blue-500">
          Sign in
        </Link>
      </div>
    </StyledForm>
  );
}

export default Register;
