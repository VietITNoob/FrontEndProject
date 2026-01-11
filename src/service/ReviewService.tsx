import type { Review } from '../types';
import axiosClient from "../api/axiosClient.tsx";

export const ReviewService = {
    getByProductId: async (productId: number): Promise<Review[]> => {
        return axiosClient.get(`/reviews?productId=${productId}`);
    },
    addReview: async (review: Omit<Review, 'id'>): Promise<Review> => {
        return axiosClient.post('/reviews', review);
    }
}
