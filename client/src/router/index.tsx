import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/home';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
]);

export default router;
