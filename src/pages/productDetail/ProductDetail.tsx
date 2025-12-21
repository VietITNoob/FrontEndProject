import { useEffect } from "react";
import Header from "../../components/Header/Header"; // Đã bỏ đuôi .tsx (thường không cần thiết khi import)
import Footer from "../../components/Footer/Footer";
import './ProductDetail.css';

const ProductDetail = () => {
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
        <div className="page-wrapper">
            <Header />

            {/* Main Content: Phần nội dung chính nằm giữa */}
            <main className="product-content">

                {/* 1. HERO SECTION */}
                <section className="hero-section reveal">
                    <div className="container">
                        <span className="badge">Mới ra mắt 2.0</span>
                        <h1 className="hero-title">
                            E-Commerce Super. <br />
                            <span className="gray-text">Hiệu năng đột phá.</span>
                        </h1>
                        <p className="hero-desc">
                            Giao diện người dùng chuẩn Apple. Tối ưu hóa SEO và tốc độ tải trang.
                            Sẵn sàng để deploy ngay hôm nay.
                        </p>
                        <div className="cta-group">
                            <button className="btn-primary shadow-blue">Xem Demo</button>
                            <button className="btn-secondary">Mua ngay — 1.200k</button>
                        </div>
                        <div className="hero-mockup">
                            {/* Ảnh Demo Dashboard - thay link ảnh của bạn vào đây */}
                            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop" alt="Dashboard UI" />
                        </div>
                    </div>
                </section>

                {/* 2. BENTO GRID FEATURES */}
                <section className="bento-section">
                    <div className="container grid-layout">
                        {/* Card Lớn (Trái) */}
                        <div className="bento-card large reveal">
                            <div className="card-content">
                                <h3>Analytics Pro</h3>
                                <p>Theo dõi hành vi người dùng thời gian thực với biểu đồ trực quan.</p>
                            </div>
                            <div className="card-visual chart-bg">
                                {/* CSS sẽ vẽ giả lập biểu đồ ở đây */}
                            </div>
                        </div>

                        {/* Card Nhỏ 1 (Phải trên) */}
                        <div className="bento-card small dark reveal">
                            <div className="icon-box blue">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            </div>
                            <div className="small-card-text">
                                <h3>Bảo mật</h3>
                                <p>Mã hóa đầu cuối</p>
                            </div>
                        </div>

                        {/* Card Nhỏ 2 (Phải dưới) */}
                        <div className="bento-card small reveal">
                            <div className="icon-box orange">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                            </div>
                            <div className="small-card-text">
                                <h3>Siêu tốc</h3>
                                <p>Load dưới 0.5s</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. TECH SPECS TABLE */}
                <section className="specs-section reveal">
                    <div className="container-narrow">
                        <h2 className="section-title">Thông số kỹ thuật</h2>
                        <div className="specs-table">
                            <div className="spec-row">
                                <span className="spec-label">Công nghệ</span>
                                <strong className="spec-value">React 18, TypeScript, Vite</strong>
                            </div>
                            <div className="spec-row">
                                <span className="spec-label">UI Framework</span>
                                <strong className="spec-value">Custom CSS (No Library)</strong>
                            </div>
                            <div className="spec-row">
                                <span className="spec-label">Backend</span>
                                <strong className="spec-value">Node.js / Go / Java</strong>
                            </div>
                            <div className="spec-row">
                                <span className="spec-label">Database</span>
                                <strong className="spec-value">PostgreSQL</strong>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
};

export default ProductDetail;