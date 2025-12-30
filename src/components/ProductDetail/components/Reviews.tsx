import React from "react";
import { useReviews } from "../../../hook/useReviews";

interface ReviewsProps {
    productId: number;
}

const Reviews: React.FC<ReviewsProps> = ({ productId }) => {
    const { reviews, loading } = useReviews(productId);

    const renderStars = (rating: number) =>
        [...Array(5)].map((_, i) => (
            <svg
                key={i}
                className={`star-icon ${i < rating ? "filled" : ""}`}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
        ));

    const averageRating =
        reviews.length > 0
            ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
            : 0;

    return (
        <section className="reviews-section reveal">
            <div className="container">
                <h2 className="section-title">Đánh giá & Nhận xét</h2>

                {loading ? (
                    <p>Đang tải đánh giá...</p>
                ) : reviews.length === 0 ? (
                    <p>Chưa có đánh giá nào</p>
                ) : (
                    <div className="reviews-layout">
                        <div className="rating-summary">
                            <div className="average-score">
                                <span className="score-number">
                                    {averageRating.toFixed(1)}
                                </span>
                                <div className="score-stars">
                                    {renderStars(Math.round(averageRating))}
                                </div>
                                <p className="total-reviews">
                                    dựa trên {reviews.length} đánh giá
                                </p>
                            </div>
                        </div>

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
                                        <strong>{review.user?.name || "Người dùng ẩn danh"}</strong>
                                        <span className="user-role">{review.user?.job || "Khách hàng"}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Reviews;
