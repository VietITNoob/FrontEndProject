import type {Category} from '../types'
import axiosClient from "./axiosClient.tsx";

export const categoryApi = {
    getAll: (): Promise<Category[]> => {
        return axiosClient.get('/categories');
    }
};

