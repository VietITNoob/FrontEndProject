
import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import LoginPage from '../components/Auth/Login/LoginPage';
import RegisterPage from '../components/Auth/Register/RegisterPage';
import ProductDetail from "../pages/productDetail/ProductDetail.tsx";
import ProductsPage from "../components/Products/ProductsPage.tsx";
import CartPage from '../pages/Cart/CartPage';


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
    element: <ProductsPage />, 
  },
  {
    path:'/cart',
    element: <CartPage />,

  },
  {
    path:"/product/:id",
    element: <ProductDetail />
  }

]);
