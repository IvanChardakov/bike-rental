import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { messages } from '../utils/messages';
import Input from '../components/Form/Input';
import Error from '../components/Form/Error';
import Button from '../components/common/Button';
import { LoginFormData } from '../types/formData';
import { EMAIL_PATTERN } from '../utils/constants';
import StyledForm from '../components/Form/StyledForm';
import UserManagerContext from '../services/userManager/UserManagerContext';

function Login() {
  const { login } = useContext(UserManagerContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    const { email, password } = data;
    const user = login(email, password);

    if (user) {
      navigate(`/${user?.role}-dashboard`);
    } else {
      setError('root.wrongCredentials', { message: messages.wrong_credentials });
    }
  };

  return (
    <StyledForm
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      formTitle="Login"
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
      {errors?.root?.wrongCredentials && (
        <Error errorMessage={errors?.root?.wrongCredentials?.message} />
      )}

      <div className="flex justify-between items-center">
        <Button type="submit" buttonText={'Login'} />

        <Link to="/register" className="ml-4 text-blue-500">
          Register
        </Link>
      </div>
    </StyledForm>
  );
}

export default Login;
