import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
]);
