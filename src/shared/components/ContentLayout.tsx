import React from 'react';
import styled from 'styled-components';
import { Layout, theme } from 'antd';

const { Content } = Layout;

interface ContentLayoutProps {
  children: React.ReactNode;
}

const ContentStyled = styled(Content)`
  padding: 0 48px;
  flex: 1;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const ContainerStyled = styled.div.withConfig({
  shouldForwardProp: (prop) => !['background', 'borderRadius'].includes(prop),
})<{
  background: string;
  borderRadius: number;
}>`
  min-height: 450px;
  padding: 24px;
  background-color: ${(props) => props.background};
  border-radius: ${(props) => props.borderRadius}px;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const ContentLayout: React.FC<ContentLayoutProps> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadius },
  } = theme.useToken();
  return (
    <ContentStyled>
      <ContainerStyled
        background={colorBgContainer}
        borderRadius={borderRadius}
      >
        {children}
      </ContainerStyled>
    </ContentStyled>
  );
};

export default ContentLayout;
