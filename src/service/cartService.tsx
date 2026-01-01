import type { Product } from '../types';
import axiosClient from "../api/axiosClient.tsx";


export interface CartItem extends Product {
  quantity: number;
}

export const cartService = {
  getCartItems: (): Promise<CartItem[]> => {
    return axiosClient.get('/cart');
  },
  addToCart: (product: Product): Promise<CartItem> => {
    const cartItem = { ...product, quantity: 1 };
    return axiosClient.post('/cart', cartItem);
  },
  updateCartItem: (item: CartItem): Promise<CartItem> => {
    return axiosClient.put(`/cart/${item.id}`, item);
  },
  removeFromCart: (cartItemId: string | number): Promise<void> => {
    return axiosClient.delete(`/cart/${cartItemId}`);
  }
};
