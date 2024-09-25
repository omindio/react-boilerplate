import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import esES from 'antd/lib/locale/es_ES';

import MainRoutes from './routes/MainRoutes';

const App: React.FC = () => (
  <ConfigProvider
    locale={esES}
    theme={{
      algorithm: theme.defaultAlgorithm,
      token: {
        colorPrimary: '#00b96b',
        borderRadius: 5,

        // Alias Token
        //colorBgContainer: '#f6ffed',
      },
    }}
  >
    <Router>
      <MainRoutes />
    </Router>
  </ConfigProvider>
);

export default App;
