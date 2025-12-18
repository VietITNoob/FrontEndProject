import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import LoginPage from '../components/Auth/Login/LoginPage';
import RegisterPage from '../components/Auth/Register/RegisterPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/products",      // <--- 2. Đường dẫn mới
    element: <ProductsPage />
  },
  {
    path:"/product",
    element: <ProductDetail />
  }

]);
