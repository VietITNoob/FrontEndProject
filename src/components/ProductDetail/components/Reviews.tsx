import React, { useState } from "react";
import { useReviews } from "../../../hook/useReviews";
import { useAuth } from "../../../context/AuthContext";
import { Star, Send } from "lucide-react";

interface ReviewsProps {
    productId: number;
}

const Reviews: React.FC<ReviewsProps> = ({ productId }) => {
    const { reviews, loading, addReview } = useReviews(productId);
    const { user, isAuthenticated } = useAuth();
    
    const [newReviewContent, setNewReviewContent] = useState("");
    const [newReviewRating, setNewReviewRating] = useState(5);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isAuthenticated || !user) {
            alert("Vui lòng đăng nhập để đánh giá sản phẩm.");
            return;
        }
        if (!newReviewContent.trim()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
            await addReview({
                userId: user.id,
                productId: productId,
                rating: newReviewRating,
                date: today,
                content: newReviewContent
            });
            setNewReviewContent("");
            setNewReviewRating(5);
        } catch (err) {
            setSubmitError("Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại.");
        } finally {
            setIsSubmitting(false);
        }
    };

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
                                    {/* <h4 className="review-title">Tuyệt vời</h4>  Tạm ẩn title cứng */}
                                    <p className="review-content">{review.content}</p>
                                    <div className="review-footer">
                                        <strong>
                                            {review.user
                                                ? `${review.user.firstName ?? ""} ${review.user.lastName ?? ""}`.trim()
                                                : "Người dùng ẩn danh"}
                                        </strong>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- FORM NHẬP REVIEW (ĐÃ CHUYỂN XUỐNG DƯỚI) --- */}
                <div className="review-input-container" style={{ marginTop: '60px', padding: '24px', background: '#fff', borderRadius: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                    {isAuthenticated ? (
                        <form onSubmit={handleSubmitReview}>
                            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Viết đánh giá của bạn</h3>
                            
                            {/* Rating Input */}
                            <div className="rating-input" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                                <span style={{ fontSize: '14px', color: '#86868b' }}>Chọn số sao:</span>
                                <div style={{ display: 'flex', gap: '4px', cursor: 'pointer' }}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star 
                                            key={star} 
                                            size={24} 
                                            fill={star <= newReviewRating ? "#f5a623" : "none"} 
                                            color={star <= newReviewRating ? "#f5a623" : "#d2d2d7"}
                                            onClick={() => setNewReviewRating(star)}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Text Input */}
                            <div className="input-group" style={{ position: 'relative' }}>
                                <textarea
                                    value={newReviewContent}
                                    onChange={(e) => setNewReviewContent(e.target.value)}
                                    placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..."
                                    style={{
                                        width: '100%',
                                        minHeight: '100px',
                                        padding: '12px 16px',
                                        borderRadius: '12px',
                                        border: '1px solid #d2d2d7',
                                        fontSize: '15px',
                                        resize: 'vertical',
                                        fontFamily: 'inherit'
                                    }}
                                    required
                                />
                            </div>

                            {submitError && <p style={{ color: 'red', fontSize: '13px', marginTop: '8px' }}>{submitError}</p>}

                            <div style={{ marginTop: '16px', textAlign: 'right' }}>
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="btn-primary"
                                    style={{ 
                                        display: 'inline-flex', 
                                        alignItems: 'center', 
                                        gap: '8px',
                                        opacity: isSubmitting ? 0.7 : 1 
                                    }}
                                >
                                    {isSubmitting ? 'Đang gửi...' : <>Gửi đánh giá <Send size={16} /></>}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '20px' }}>
                            <p style={{ color: '#86868b', marginBottom: '12px' }}>Vui lòng đăng nhập để viết đánh giá.</p>
                            <a href="/login" className="btn-secondary" style={{ textDecoration: 'none', display: 'inline-block' }}>Đăng nhập ngay</a>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
