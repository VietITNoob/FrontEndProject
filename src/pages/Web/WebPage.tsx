import React, { useEffect, useMemo, useState } from 'react';
import '../../components/Products/Products.css'; 
import './WebPage.css'; // File CSS riêng cho trang Web
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useProductList } from '../../hook/useProductList';
import ProductCarousel from '../../components/Products/components/ProductCarousel';

const WebPage = () => {
  const { fetchByCategory, byCategory } = useProductList();
  
  // ID danh mục trong Database (Đảm bảo DB bạn có category 'web' hoặc 'website')
  const WEB_CATEGORY_ID = 'web'; 

  // Bộ lọc công nghệ Web
  const TECH_STACKS = ['All', 'React', 'Next.js', 'Vue', 'Laravel', 'Node.js', 'Tailwind'];
  
  const [filter, setFilter] = useState('All');

  // Cuộn lên đầu trang khi vào
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Fetch dữ liệu Web
 useEffect(() => {
    fetchByCategory(WEB_CATEGORY_ID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Logic lọc theo tên công nghệ (Ví dụ: Tìm chữ "Next.js" trong tên sản phẩm)
  const displayedProducts = useMemo(() => {
    if (filter === 'All') return byCategory;
    return byCategory.filter(p => p.title.toLowerCase().includes(filter.toLowerCase()));
  }, [byCategory, filter]);

  const bestSellers = useMemo(() => {
    // Giả lập lấy 4 sp đầu tiên làm best seller
    return byCategory.slice(0, 4);
  }, [byCategory]);

  return (
    <div className="web-page animate-enter">
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="web-hero">
        <h1 className="hero-title">
          Websites. <span style={{ color: '#6e6e73' }}>Powerful. Scalable.</span>
        </h1>
        <p className="hero-subtitle">
          Xây dựng nền tảng SaaS, Dashboard và E-commerce với tốc độ ánh sáng.
        </p>
      </section>

      {/* --- QUICK FILTER NAV --- */}
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

      {/* --- FEATURED BANNER 1: SaaS / Dashboard --- */}
      <section className="promo-section">
        <div className="promo-card">
           {/* Ảnh Laptop/Dashboard */}
           <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" 
              className="promo-bg"
              alt="SaaS Dashboard"
              style={{filter: 'brightness(0.7)'}} // Tối ảnh để chữ trắng nổi bật
           />
           <div className="promo-content">
              <h2 className="promo-headline">Ultimate SaaS Starter</h2>
              <p className="promo-subhead">
                Next.js 14, Stripe, Supabase & Tailwind. All-in-one kit.
              </p>
              <a href="#" className="promo-cta">Xem Live Demo</a>
           </div>
        </div>
      </section>

      {/* --- DANH SÁCH SẢN PHẨM CHÍNH --- */}
      <div style={{marginTop: -40}}>
         <ProductCarousel 
            titleStart={filter === 'All' ? "Khám phá Web." : `${filter} Projects.`}
            titleHighlight="Code sạch, chuẩn SEO."
            products={displayedProducts} 
          />
      </div>

      {/* --- FEATURED BANNER 2: Admin / CMS --- */}
      <section className="promo-section">
        <div className="promo-card">
           {/* Ảnh Code/Setup sáng sủa */}
           <img 
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2372&auto=format&fit=crop" 
              className="promo-bg"
              alt="Coding"
           />
           <div className="promo-content dark-text">
              <h2 className="promo-headline">Admin Dashboard Pro</h2>
              <p className="promo-subhead">
                Quản lý dữ liệu trực quan với React & Ant Design. Dark mode included.
              </p>
              <a href="#" className="promo-cta" style={{background: '#1d1d1f'}}>Mua ngay</a>
           </div>
        </div>
      </section>

      {/* --- BEST SELLERS --- */}
      <ProductCarousel 
        titleStart="Top Rated."
        titleHighlight="Được các Startup tin dùng."
        products={bestSellers} 
      />

      {/* --- BANNER PHỤ: Portfolio / Landing Page --- */}
      <section className="promo-section">
        <div className="promo-card" style={{height: 400}}>
           <img 
              src="https://images.unsplash.com/photo-1545665277-5937489579f2?q=80&w=2370&auto=format&fit=crop" 
              className="promo-bg"
              alt="Creative Portfolio"
           />
           <div className="promo-content">
              <h2 className="promo-headline" style={{fontSize: 32}}>Creative Portfolio</h2>
              <p className="promo-subhead" style={{fontSize: 18}}>
                Thể hiện cá tính của bạn. Hiệu ứng GSAP mượt mà.
              </p>
           </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WebPage;