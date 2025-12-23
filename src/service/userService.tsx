import type { User } from '../types';
import axiosClient from "../api/axiosClient.tsx";

export const userService = {
    getAll: (): Promise<User[]> => {
        return axiosClient.get('/users');
    },
    getById: (id: number): Promise<User> => {
        return axiosClient.get(`/users/${id}`);
    }
}
