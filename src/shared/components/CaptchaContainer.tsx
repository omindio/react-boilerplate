import React from 'react';
import styled from 'styled-components';

interface CaptchaContainerProps {
  children: React.ReactNode;
}

const ContainerStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  > div {
    transform: scale(0.93);
  }
`;

const CaptchaContainer: React.FC<CaptchaContainerProps> = ({ children }) => (
  <ContainerStyled>
    <div>{children}</div>
  </ContainerStyled>
);

export default CaptchaContainer;
