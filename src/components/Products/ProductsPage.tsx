import React, { useEffect } from 'react';
import './Products.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CategoryNav from './components/CategoryNav';
import ProductCarousel from './components/ProductCarousel';
import { LATEST_PRODUCTS, ACCESSORIES } from './data/products.data';

const ProductsPage = () => {
  // Scroll to top khi vào trang
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <CategoryNav />

      {/* 4. Section: The Latest (iPhone, Mac...) */}
      <ProductCarousel 
        titleStart="The latest." 
        titleHighlight="Truly awe-inspired gifts." 
        products={LATEST_PRODUCTS} 
      />

      {/* 5. Section: Personalization (Accessories...) */}
      {/* Trong ảnh mẫu bạn gửi có phần Holiday picks, ta tái sử dụng component */}
      <ProductCarousel 
        titleStart="Holiday picks." 
        titleHighlight="Designed to delight." 
        products={ACCESSORIES} 
      />

      {/* 6. Section: Accessories (More...) */}
      <div style={{marginTop: '40px'}}>
         <ProductCarousel 
          titleStart="Personalization." 
          titleHighlight="Make it one of a kind." 
          products={ACCESSORIES} // Có thể thay bằng data khác
        />
      </div>

      {/* 7. Footer */}
      <Footer />
    </div>
  );
};

export default ProductsPage;