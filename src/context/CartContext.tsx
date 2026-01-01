import React, { createContext, useState, useEffect, type ReactNode, useContext } from 'react';
import { cartService, type CartItem } from '../service/cartService';
import type { Product } from '../types';


interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (cartItemId: string | number) => Promise<void>;
  itemCount: number;
}

// tạo 1 context với giá trị mặc định
const CartContext = createContext<CartContextType | undefined>(undefined);

// tạo 1 provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Lấy các mặt hàng ban đầu trong giỏ hàng
    const fetchCart = async () => {
      try {
        const items = await cartService.getCartItems();
        setCartItems(items);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };
    fetchCart();
  }, []);

  const addToCart = async (product: Product) => {
    try {
      const existingItem = cartItems.find(item => item.id === product.id);
      if (existingItem) {
        const updatedItem = { ...existingItem, quantity: existingItem.quantity + 1 };
        const returnedItem = await cartService.updateCartItem(updatedItem);
        setCartItems(prevItems => prevItems.map(item => item.id === product.id ? returnedItem : item));
      } else {
        const newItem = await cartService.addToCart(product);
        setCartItems(prevItems => [...prevItems, newItem]);
      }
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  const removeFromCart = async (cartItemId: string | number) => {
    try {
      await cartService.removeFromCart(cartItemId);
      setCartItems(prevItems => prevItems.filter(item => item.id !== cartItemId));
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
