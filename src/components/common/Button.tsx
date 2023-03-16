import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background: #3894a1;
  color: white;
  font-weight: bold;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  :hover {
    background: #296972;
  }
  :disabled {
    cursor: not-allowed;
    background: rgb(56 148 161 / 50%);
  }
`;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonText: string | undefined;
}

function Button({ buttonText, ...rest }: ButtonProps) {
  return <StyledButton {...rest}>{buttonText}</StyledButton>;
}

export default Button;
