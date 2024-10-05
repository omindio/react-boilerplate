import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConfigProvider, theme, App as AntdApp } from 'antd';
import { AntdProvider } from '@shared/contexts/AntdContext';
import esES from 'antd/lib/locale/es_ES';

import AppRoutes from './AppRoutes';

const App: React.FC = () => (
  <ConfigProvider
    locale={esES}
    theme={{
      algorithm: theme.defaultAlgorithm,
      token: {
        colorPrimary: '#00b96b',
        borderRadius: 5,
      },
    }}
  >
    <AntdApp>
      <AntdProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AntdProvider>
    </AntdApp>
  </ConfigProvider>
);

export default App;
