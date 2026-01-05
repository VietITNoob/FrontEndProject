import React, { useEffect, useMemo, useState } from 'react';
import '../../components/Products/Products.css'; 
import './MobilePage.css'; 
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useProductList } from '../../hook/useProductList';
import ProductCarousel from '../../components/Products/components/ProductCarousel';

const MobilePage = () => {
  const { fetchByCategory, byCategory } = useProductList();
  
  // ID danh mục trong Database (Đảm bảo DB bạn có category 'mobile-apps' hoặc tương tự)
  const MOBILE_CATEGORY_ID = 'mobile'; 

  // Thay đổi bộ lọc thành Công nghệ / Ngôn ngữ
  const TECH_STACKS = ['All', 'Flutter', 'React Native', 'Swift', 'Kotlin', 'Ionic'];
  
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    fetchByCategory(MOBILE_CATEGORY_ID);
  }, [fetchByCategory]);

  // Logic lọc theo tên công nghệ có trong tiêu đề sản phẩm
  const displayedProducts = useMemo(() => {
    if (filter === 'All') return byCategory;
    return byCategory.filter(p => p.title.toLowerCase().includes(filter.toLowerCase()));
  }, [byCategory, filter]);

  const bestSellers = useMemo(() => {
    // Giả lập lấy 4 sp đầu tiên
    return byCategory.slice(0, 4);
  }, [byCategory]);

  return (
    <div className="mobile-page animate-enter">
      <Header />

      {/* --- HERO SECTION: Thay đổi thông điệp --- */}
      <section className="mobile-hero">
        <h1 className="hero-title">
          Mobile Apps. <span style={{ color: '#6e6e73' }}>Code less. Create more.</span>
        </h1>
        <p className="hero-subtitle">
          Khởi động dự án của bạn với các mẫu Source Code chất lượng cao.
        </p>
      </section>

      {/* --- QUICK FILTER NAV: Thay bằng Tech Stacks --- */}
      <div className="quick-nav-container">
        {TECH_STACKS.map((item) => (
          <button 
            key={item}
            className={`nav-pill ${filter === item ? 'active' : ''}`}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* --- FEATURED BANNER 1: E-commerce / Super App --- */}
      <section className="promo-section">
        <div className="promo-card">
           {/* Ảnh UI/UX App thay vì ảnh điện thoại */}
           <img 
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop" 
              className="promo-bg"
              alt="App UI"
              style={{filter: 'brightness(0.8)'}} // Làm tối ảnh một chút để chữ nổi bật
           />
           <div className="promo-content">
              <h2 className="promo-headline">Super E-commerce Kit</h2>
              <p className="promo-subhead">
                Full Flutter Source Code. iOS & Android ready.
              </p>
              <a href="#" className="promo-cta">Xem Demo</a>
           </div>
        </div>
      </section>

      {/* --- DANH SÁCH SẢN PHẨM --- */}
      <div style={{marginTop: -40}}>
         <ProductCarousel 
            titleStart={filter === 'All' ? "Kho ứng dụng." : `${filter} Templates.`}
            titleHighlight="Giải pháp tối ưu cho Developer."
            products={displayedProducts} 
          />
      </div>

      {/* --- FEATURED BANNER 2: Social / Delivery App --- */}
      <section className="promo-section">
        <div className="promo-card">
           <img 
              src="https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop" 
              className="promo-bg"
              alt="Social App"
           />
           <div className="promo-content dark-text"> {/* Chữ màu tối nếu nền ảnh sáng */}
              <h2 className="promo-headline">Social Network App</h2>
              <p className="promo-subhead">
                Xây dựng cộng đồng của riêng bạn. Tích hợp Chat & Video Call.
              </p>
              <a href="#" className="promo-cta" style={{background: '#1d1d1f'}}>Mua Source Code</a>
           </div>
        </div>
      </section>

      {/* --- BEST SELLERS --- */}
      <ProductCarousel 
        titleStart="Bán chạy nhất."
        titleHighlight="Các dự án được tin dùng."
        products={bestSellers} 
      />

      <Footer />
    </div>
  );
};

export default MobilePage;