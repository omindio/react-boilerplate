import React, { createContext, useContext, ReactNode } from 'react';
import { App as AntdApp } from 'antd';

const AntdContext = createContext<any>(null);

export const AntdProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { message, modal } = AntdApp.useApp();
  return (
    <AntdContext.Provider value={{ message, modal }}>
      {children}
    </AntdContext.Provider>
  );
};

export const useAntd = () => {
  return useContext(AntdContext);
};
