import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import type { Product } from '../../types';



const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  // 1. Fetch dữ liệu từ json-server
  useEffect(() => {
    // Gọi các sản phẩm có cờ isFeatured=true
    fetch('http://localhost:3001/products?isFeatured=true')
      .then((res) => res.json())
      .then((data) => {
        // Đảm bảo lấy đủ 4 sản phẩm để không bị lỗi layout
        setFeaturedProducts(data.slice(0, 4));
      })
      .catch((err) => console.error("Lỗi tải sản phẩm nổi bật:", err));
  }, []);

  // Hook Scroll Reveal (Giữ nguyên code cũ của bạn)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );
    const hiddenElements = document.querySelectorAll('.reveal');
    hiddenElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [featuredProducts]); // Thêm dependency để chạy lại khi có data

  // Hàm format giá tiền
  const formatPrice = (price: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  return (
    <div className="home-container">
      <Header />

      {/* 1. HERO SECTION (Giữ nguyên) */}
      <section className="hero-section">
        <div className="hero-glow"></div>
        <div className="reveal">
          <div className="hero-pill">
             <span>Mới</span> AI Generator Code v2.0
          </div>
          <h1 className="hero-title">
            Mã nguồn <span className="gradient-text">tinh hoa.</span><br />
            Hiệu năng <span className="highlight-text">đột phá.</span>
          </h1>
          <p className="hero-subtitle">
            Khám phá thư viện source code cao cấp dành cho Web & Mobile.
            Được kiểm duyệt kỹ lưỡng, sạch sẽ và sẵn sàng scale-up.
          </p>
          <div className="hero-buttons">
            <Link to="/products" className="btn-primary">Mua trọn bộ</Link>
          </div>
        </div>
      </section>

      {/* 2. BENTO GRID (DYNAMIC DATA) */}
      <section className="section-container">
        <div className="reveal" style={{marginBottom: '40px', textAlign: 'left'}}>
          <h2 style={{fontSize: '48px', fontWeight: 700}}>Sản phẩm tiêu biểu.</h2>
        </div>

        {/* Chỉ render khi đã load được dữ liệu */}
        {featuredProducts.length >= 4 && (
          <div className="bento-grid">
            
            {/* CARD 1: Large (Lấy phần tử đầu tiên: index 0) */}
            <Link to={`/product/${featuredProducts[0].id}`} className="bento-card card-large reveal">
              <div className="card-header">
                <span className="card-badge blue">{featuredProducts[0].marketingBadge || 'HOT'}</span>
                <h3 className="card-title">{featuredProducts[0].title}</h3>
                <p className="card-price">{formatPrice(featuredProducts[0].price)}</p>
                <div className="card-tech-stack">
                  {featuredProducts[0].tech?.slice(0, 3).map((t, i) => (
                    <span key={i} className="tech-dot">{t}</span>
                  ))}
                </div>
              </div>
              <div className="card-image-wrapper">
                <img src={featuredProducts[0].image} alt={featuredProducts[0].title} className="card-image" />
              </div>
            </Link>

            {/* CARD 2: Tall (Lấy phần tử thứ 2: index 1) */}
            <Link to={`/product/${featuredProducts[1].id}`} className="bento-card card-tall reveal">
               <div className="card-header">
                <span className="card-badge purple">{featuredProducts[1].marketingBadge || 'NEW'}</span>
                <h3 className="card-title">{featuredProducts[1].title}</h3>
                <p className="card-price">{formatPrice(featuredProducts[1].price)}</p>
                <div className="card-tech-stack">
                  {featuredProducts[1].tech?.slice(0, 2).map((t, i) => (
                    <span key={i} className="tech-dot">{t}</span>
                  ))}
                </div>
              </div>
              <div className="card-image-wrapper">
                 <img src={featuredProducts[1].image} alt={featuredProducts[1].title} className="card-image" />
              </div>
            </Link>

            {/* CARD 3: Normal (Lấy phần tử thứ 3: index 2) */}
            <Link to={`/product/${featuredProducts[2].id}`} className="bento-card reveal">
               <div className="card-header">
                <span className="card-badge orange">{featuredProducts[2].marketingBadge || 'PRO'}</span>
                <h3 className="card-title">{featuredProducts[2].title}</h3>
                <p className="card-price">{formatPrice(featuredProducts[2].price)}</p>
              </div>
              <div className="card-image-wrapper">
                  <img src={featuredProducts[2].image} alt={featuredProducts[2].title} className="card-image" />
              </div>
            </Link>

             {/* CARD 4: Normal (Lấy phần tử thứ 4: index 3) */}
             <Link to={`/product/${featuredProducts[3].id}`} className="bento-card reveal">
               <div className="card-header">
                <span className="card-badge">{featuredProducts[3].marketingBadge || 'LITE'}</span>
                <h3 className="card-title">{featuredProducts[3].title}</h3>
                <p className="card-price">{formatPrice(featuredProducts[3].price)}</p>
              </div>
              <div className="card-image-wrapper">
                  <img src={featuredProducts[3].image} alt={featuredProducts[3].title} className="card-image" />
              </div>
            </Link>
          </div>
        )}
      </section>

      {/* 3. INFINITE MARQUEE (Giữ nguyên) */}
      <section className="reveal">
         {/* ... (Code marquee cũ của bạn) */}
          <div style={{textAlign: 'center', marginBottom: '20px'}}>
           <p style={{fontSize: '12px', fontWeight: 600, color: '#86868b', letterSpacing: '0.1em'}}>
             ĐƯỢC TIN DÙNG BỞI HƠN 1000+ STARTUP
           </p>
        </div>
        <div className="marquee-container">
          <div className="marquee-content">
            {Array(2).fill(0).map((_, i) => (
              <React.Fragment key={i}>
                <span className="logo-item">ACME Corp</span>
                <span className="logo-item">Stark Ind</span>
                <span className="logo-item">Wayne Ent</span>
                <span className="logo-item">Cyberdyne</span>
                <span className="logo-item">Umbrella</span>
                <span className="logo-item">Massive Dynamic</span>
                <span className="logo-item">Hooli</span>
                <span className="logo-item">Pied Piper</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;