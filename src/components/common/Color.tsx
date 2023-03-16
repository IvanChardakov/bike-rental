import React from 'react';
import styled from 'styled-components';

interface ColorProps {
  color: string;
}

const ColorDiv = styled.div<{ color: string }>`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

function Color({ color }: ColorProps) {
  return <ColorDiv color={color} />;
}

export default Color;
