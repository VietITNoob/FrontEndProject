import React from 'react';
import type {Product} from "../../../types";

interface ReviewsProps {
    product: Product;
}

const Reviews: React.FC<ReviewsProps> = ({ product }) => {
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
        <section className="reviews-section reveal">
            <div className="container">
                <h2 className="section-title">Đánh giá & Nhận xét</h2>

                <div className="reviews-layout">
                    {/* Cột trái: Tổng quan điểm số */}
                    <div className="rating-summary">
                        <div className="average-score">
                            <span className="score-number">{product.rating || 4.9}</span>
                            <div className="score-stars">
                                {renderStars(Math.round(product.rating || 5))}
                            </div>
                            <p className="total-reviews">dựa trên {product.review ? product.review.length : 128} đánh giá</p>
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
    );
};

export default Reviews;
