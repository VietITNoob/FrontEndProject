import type { Review, User } from '../types';
import axiosClient from "../api/axiosClient.tsx";

export const ReviewService = {
    getByProductId: async (productId: number): Promise<Review[]> => {
        // 1. Lấy danh sách reviews theo productId
        // axiosClient đã intercept response để trả về data trực tiếp
        const reviews = await axiosClient.get<Review[]>(`/reviews?productId=${productId}`) as unknown as Review[];
        
        // 2. Lấy danh sách users để map thông tin
        const reviewsWithUser = await Promise.all(reviews.map(async (review) => {
            try {
                const user = await axiosClient.get<User>(`/users/${review.userId}`) as unknown as User;
                return { ...review, user: user };
            } catch (error) {
                console.error(`Failed to fetch user for review ${review.id}`, error);
                return { ...review, user: { id: 0, name: 'Unknown User', role: 'Member' } as User };
            }
        }));

        return reviewsWithUser;
    }
}
