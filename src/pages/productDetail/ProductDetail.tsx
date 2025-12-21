import { useEffect } from "react";
import Header from "../../components/Header/Header";
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

    // --- HELPER: Render Ngôi sao ---
    const renderStars = (rating: number) => {
        return [...Array(5)].map((_, i) => (
            <svg
                key={i}
                className={`star-icon ${i < rating ? 'filled' : ''}`}
                width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
        ));
    };

    // --- MOCK DATA: Reviews ---
    const reviews = [
        { id: 1, user: "Minh Tuấn", role: "Developer", rating: 5, date: "2 ngày trước", content: "Code structure cực kỳ sạch (clean architecture). Rất đáng tiền để học hỏi pattern." },
        { id: 2, user: "Sarah Nguyen", role: "Designer", rating: 5, date: "1 tuần trước", content: "Giao diện đúng chuẩn Apple, animation mượt mà không bị giật lag." },
        { id: 3, user: "Hoàng K.", role: "Founder", rating: 4, date: "2 tuần trước", content: "Sản phẩm tốt, nhưng document cần chi tiết hơn ở phần deploy server." },
        { id: 4, user: "David Tran", role: "Freelancer", rating: 5, date: "1 tháng trước", content: "Mua source này về customize lại cho khách cực nhanh. Tuyệt vời!" },
    ];

    return (
        <div className="page-wrapper">
            <Header />

            <main className="product-content">

                {/* 1. HERO SECTION (Giữ nguyên) */}
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
                            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop" alt="Dashboard UI" />
                        </div>
                    </div>
                </section>

                {/* 2. BENTO GRID (Giữ nguyên) */}
                <section className="bento-section">
                    <div className="container grid-layout">
                        <div className="bento-card large reveal">
                            <div className="card-content">
                                <h3>Analytics Pro</h3>
                                <p>Theo dõi hành vi người dùng thời gian thực với biểu đồ trực quan.</p>
                            </div>
                            <div className="card-visual chart-bg"></div>
                        </div>
                        <div className="bento-card small dark reveal">
                            <div className="icon-box blue">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            </div>
                            <div className="small-card-text">
                                <h3>Bảo mật</h3>
                                <p>Mã hóa đầu cuối</p>
                            </div>
                        </div>
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

                {/* 3. TECH SPECS (Giữ nguyên) */}
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

                {/* 4. REVIEWS SECTION (MỚI THÊM) */}
                <section className="reviews-section reveal">
                    <div className="container">
                        <h2 className="section-title">Đánh giá & Nhận xét</h2>

                        <div className="reviews-layout">
                            {/* Cột trái: Tổng quan điểm số */}
                            <div className="rating-summary">
                                <div className="average-score">
                                    <span className="score-number">4.9</span>
                                    <div className="score-stars">
                                        {renderStars(5)}
                                    </div>
                                    <p className="total-reviews">dựa trên 128 đánh giá</p>
                                </div>

                                <div className="rating-bars">
                                    {/* Giả lập các thanh progress */}
                                    {[5, 4, 3, 2, 1].map((star, index) => (
                                        <div className="bar-row" key={star}>
                                            <span className="star-label">{star} sao</span>
                                            <div className="progress-track">
                                                <div
                                                    className="progress-fill"
                                                    style={{width: index === 0 ? '90%' : index === 1 ? '8%' : '2%'}}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Cột phải: Danh sách review */}
                            <div className="reviews-grid">
                                {reviews.map((review) => (
                                    <div key={review.id} className="review-card">
                                        <div className="review-header">
                                            <div className="review-stars">
                                                {renderStars(review.rating)}
                                            </div>
                                            <span className="review-date">{review.date}</span>
                                        </div>
                                        <h4 className="review-title">Tuyệt vời</h4>
                                        <p className="review-content">{review.content}</p>
                                        <div className="review-footer">
                                            <strong>{review.user}</strong>
                                            <span className="user-role">{review.role}</span>
                                        </div>
                                    </div>
                                ))}
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