import { useState, useEffect } from "react";
import type { Review } from "../types";
import { ReviewService } from "../service/ReviewService.tsx";
import { userService } from "../service/userService.tsx";

export const useReviews = (productId: number) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!productId) {
            setReviews([]);
            setLoading(false);
            return;
        }
        setLoading(true);

        const fetchReviewsAndUsers = async () => {
            try {
                const reviewsData = await ReviewService.getByProductId(productId);
                const reviewsWithUsers = await Promise.all(
                    reviewsData.map(async (review) => {
                        if (review.user) return review;
                        if (review.userId) {
                            try {
                                const user = await userService.getById(review.userId);
                                return { ...review, user };
                            } catch (error) {
                                console.error(`Failed to fetch user ${review.userId}`, error);
                                return review;
                            }
                        }
                        return review;
                    })
                );
                
                setReviews(reviewsWithUsers);
            } catch (error) {
                console.error("Failed to fetch reviews", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviewsAndUsers();
    }, [productId]);

    return { reviews, loading };
};
