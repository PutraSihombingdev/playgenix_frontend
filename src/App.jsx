import AppRoutes from './routes/AppRoutes';
import { useEffect } from 'react';
import { message } from 'antd';

function App() {
  useEffect(() => {
    message.info('Test notifikasi dari App.jsx');
  }, []);
  return <AppRoutes />;
}

export default App;
