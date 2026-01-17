import React, { useEffect, useMemo, useState } from 'react';
import '../../components/Products/Products.css'; 
import './UIPage.css'; // File CSS riêng
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useProductList } from '../../hook/useProductList';
import ProductCarousel from '../../components/Products/components/ProductCarousel';

const UIPage = () => {
  const { fetchByCategory, byCategory } = useProductList();
  
  // ID danh mục trong db.json (đảm bảo bạn có categoryId="ui")
  const UI_CATEGORY_ID = 'ui'; 

  // Bộ lọc công cụ thiết kế
  const DESIGN_TOOLS = ['All', 'Figma', 'Sketch', 'Adobe XD', 'Tailwind', 'Icons', '3D'];
  
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    fetchByCategory(UI_CATEGORY_ID);
  }, [fetchByCategory]);

  // Logic lọc sản phẩm
  const displayedProducts = useMemo(() => {
    if (filter === 'All') return byCategory;
    return byCategory.filter(p => p.title.toLowerCase().includes(filter.toLowerCase()));
  }, [byCategory, filter]);

  const bestSellers = useMemo(() => {
    return byCategory.slice(0, 4);
  }, [byCategory]);

  return (
    <div className="ui-page animate-enter">
      <Header />

      {/* --- HERO SECTION: Tập trung vào vẻ đẹp và sự sáng tạo --- */}
      <section className="ui-hero">
        <h1 className="hero-title">
          UI Kits. <span style={{ color: '#86868b' }}>Pixel Perfect.</span>
        </h1>
        <p className="hero-subtitle">
          Nâng tầm thiết kế với bộ sưu tập Figma, Icons và Design Systems cao cấp.
        </p>
      </section>

      {/* --- QUICK FILTER NAV --- */}
      <div className="quick-nav-container">
        {DESIGN_TOOLS.map((item) => (
          <button 
            key={item}
            className={`nav-pill ${filter === item ? 'active' : ''}`}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* --- FEATURED BANNER 1: Figma System --- */}
      <section className="promo-section">
        <div className="promo-card">
           {/* Ảnh Gradient/Abstract nghệ thuật */}
           <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2264&auto=format&fit=crop" 
              className="promo-bg"
              alt="Design System"
           />
           <div className="promo-content">
              <h2 className="promo-headline">Ultimate Figma System</h2>
              <p className="promo-subhead">
                Hơn 5000+ Components. Auto Layout 5.0. Dark Mode Ready.
              </p>
              <a href="#" className="promo-cta">Xem Preview</a>
           </div>
        </div>
      </section>

      {/* --- DANH SÁCH SẢN PHẨM CHÍNH --- */}
      <div style={{marginTop: -40}}>
         <ProductCarousel 
            titleStart={filter === 'All' ? "Thư viện thiết kế." : `${filter} Assets.`}
            titleHighlight="Cảm hứng bất tận."
            products={displayedProducts} 
          />
      </div>

      {/* --- FEATURED BANNER 2: 3D Icons / Illustrations --- */}
      <section className="promo-section">
        <div className="promo-card">
           {/* Ảnh 3D nổi bật */}
           <img 
              src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop" 
              className="promo-bg"
              alt="3D Icons"
           />
           <div className="promo-content dark-text">
              <h2 className="promo-headline">3D Abstract Pack</h2>
              <p className="promo-subhead">
                Bộ sưu tập hình khối 3D chất lượng 4K. Tương thích Blender & C4D.
              </p>
              <a href="#" className="promo-cta" style={{background: '#1d1d1f'}}>Mua ngay</a>
           </div>
        </div>
      </section>

      {/* --- BEST SELLERS --- */}
      <ProductCarousel 
        titleStart="Trending."
        titleHighlight="Xu hướng thiết kế 2026."
        products={bestSellers} 
      />

      {/* --- BANNER PHỤ: Icon Set --- */}
      <section className="promo-section">
        <div className="promo-card" style={{height: 400}}>
           <img 
              src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2148&auto=format&fit=crop" 
              className="promo-bg"
              alt="Icon Set"
           />
           <div className="promo-content dark-text">
              <h2 className="promo-headline" style={{fontSize: 32}}>Minimalist Icons</h2>
              <p className="promo-subhead" style={{fontSize: 18}}>
                2000+ vector icons. Sạch sẽ, tinh tế, đa dụng.
              </p>
           </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UIPage;