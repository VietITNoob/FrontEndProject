import { useEffect } from 'react';
import './Products.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CategoryNav from './components/CategoryNav';
import ProductCarousel from './components/ProductCarousel';
import { useState } from 'react';
import { productService } from '../../service/productService.tsx';
import type {Product} from "../../types";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    // Cuộn lên đầu trang và tải sản phẩm
    window.scrollTo(0, 0);
    fetchProducts();
  }, []);

  const fetchProducts = async (categoryId?: string) => {
    try {
      let data;
      if (categoryId) {
        data = await productService.getBycategory(categoryId);
      } else {
        data = await productService.getAll();
      }
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    fetchProducts(categoryId);
  };

  return (
    <div className="store-container">
      {/* 1. Reuse Global Header */}
      <Header />

      {/* 2. Top Banner / Title */}
      <div style={{ padding: '80px 0 40px', maxWidth: '1400px', margin: '0 auto', paddingLeft: '40px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 700, color: '#1d1d1f' }}>
          Store. <span style={{ color: '#6e6e73' }}>Món quà tuyệt vời nhất.</span>
        </h1>
      </div>

      {/* 3. Category Icons */}
      <CategoryNav onSelectCategory={handleCategorySelect} />

      {/* 4. Section: All Products */}
      <ProductCarousel 
        titleStart={selectedCategory ? "Selected Category." : "All Products."}
        titleHighlight={selectedCategory ? "Explore our selection." : "Discover our entire collection."}
        products={products} 
      />

      {/* 7. Footer */}
      <Footer />
    </div>
  );
};

export default ProductsPage;