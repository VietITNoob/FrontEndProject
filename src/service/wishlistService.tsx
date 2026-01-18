import type { Product } from '../types';

export interface WishlistItem {
  id: string | number;
  title: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
  dateAdded: string;
}

const API_URL = 'http://localhost:3001/wishlist';

class WishlistService {

// Lấy tất cả các mặt hàng trong danh sách yêu thích
  async getWishlistItems(): Promise<WishlistItem[]> {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch wishlist items');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching wishlist items:', error);

      return [];
    }
  }

  // Thêm sản phẩm vào danh sách yêu thích
  async addToWishlist(product: Product): Promise<WishlistItem> {
    const wishlistItem: Omit<WishlistItem, 'id'> = {
      title: product.title,
      price: product.price,
      image: product.image || '',
      description: product.description,
      category: product.categoryId,
      dateAdded: new Date().toISOString()
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(wishlistItem),
      });

      if (!response.ok) {
        throw new Error('Failed to add item to wishlist');
      }

      const newItem = await response.json();
      return { ...newItem, id: newItem.id || product.id };
    } catch (error) {
      console.error('Error adding item to wishlist:', error);
      throw error;
    }
  }

  // Xóa sản phẩm khỏi danh sách yêu thích
  async removeFromWishlist(itemId: string | number): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/${itemId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to remove item from wishlist');
      }
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
      throw error;
    }
  }

  // Xóa tất cả các mục trong danh sách yêu thích
  async clearWishlist(): Promise<void> {
    try {
      const items = await this.getWishlistItems();
      const deletePromises = items.map(item => this.removeFromWishlist(item.id));
      await Promise.all(deletePromises);
    } catch (error) {
      console.error('Error clearing wishlist:', error);
      throw error;
    }
  }

  // Kiểm tra xem sản phẩm có trong danh sách yêu thích không
  async isInWishlist(productId: string | number): Promise<boolean> {
    try {
      const items = await this.getWishlistItems();
      return items.some(item => item.id === productId);
    } catch (error) {
      console.error('Error checking if item is in wishlist:', error);
      return false;
    }
  }
}

export const wishlistService = new WishlistService();
