import React, { useEffect } from 'react';
import './HomePage.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const HomePage = () => {
  // Hook Scroll Reveal
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
  }, []);

  return (
    <div className="home-container">
      <Header />

      {/* 1. HERO SECTION */}
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
            <button className="btn-primary">Mua trọn bộ</button>
          </div>
        </div>
      </section>

      {/* 2. BENTO GRID */}
      <section className="section-container">
        <div className="reveal" style={{marginBottom: '40px', textAlign: 'left'}}>
          <h2 style={{fontSize: '48px', fontWeight: 700}}>Sản phẩm tiêu biểu.</h2>
        </div>

        <div className="bento-grid">
          
          {/* CARD 1: Large */}
          <div className="bento-card card-large reveal">
            <div className="card-header">
              <span className="card-badge blue">BEST SELLER</span>
              <h3 className="card-title">E-Commerce Super</h3>
              <p className="card-price">Từ 2.499.000₫</p>
              <div className="card-tech-stack">
                <span className="tech-dot">Next.js 14</span>
                <span className="tech-dot">Stripe</span>
                <span className="tech-dot">Supabase</span>
              </div>
            </div>
            <div className="card-image-wrapper">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80" alt="E-com" className="card-image" />
            </div>
          </div>

          {/* CARD 2: Tall */}
          <div className="bento-card card-tall reveal">
             <div className="card-header">
              <span className="card-badge purple">MOBILE APP</span>
              <h3 className="card-title">Fintech Wallet</h3>
              <p className="card-price">Từ 3.999.000₫</p>
              <div className="card-tech-stack">
                <span className="tech-dot">React Native</span>
                <span className="tech-dot">TypeScript</span>
              </div>
            </div>
            <div className="card-image-wrapper">
               <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80" alt="Mobile" className="card-image" />
            </div>
          </div>

          {/* CARD 3: Normal */}
          <div className="bento-card reveal">
             <div className="card-header">
              <span className="card-badge orange">ADMIN</span>
              <h3 className="card-title">Analytic Pro</h3>
              <p className="card-price">Từ 1.499.000₫</p>
            </div>
            <div className="card-image-wrapper">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" alt="Dashboard" className="card-image" />
            </div>
          </div>

           {/* CARD 4: Normal */}
           <div className="bento-card reveal">
             <div className="card-header">
              <span className="card-badge">UI KIT</span>
              <h3 className="card-title">Glass UI</h3>
              <p className="card-price">499.000₫</p>
            </div>
            <div className="card-image-wrapper">
                <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80" alt="UI" className="card-image" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. INFINITE MARQUEE (TRUSTED BY) */}
      <section className="reveal">
        <div style={{textAlign: 'center', marginBottom: '20px'}}>
           <p style={{fontSize: '12px', fontWeight: 600, color: '#86868b', letterSpacing: '0.1em'}}>
             ĐƯỢC TIN DÙNG BỞI HƠN 1000+ STARTUP
           </p>
        </div>
        <div className="marquee-container">
          <div className="marquee-content">
            {/* Lặp lại 2 lần để tạo hiệu ứng vô tận */}
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