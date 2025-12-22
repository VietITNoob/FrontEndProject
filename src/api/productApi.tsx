import type {Product} from '../types'
import axiosClient from "./axiosClient.tsx";

export const productApi = {
    getAll: (): Promise<Product[]> => {
        return axiosClient.get('/products');
    },
    getById: (id: number | string): Promise<Product> => {
        return axiosClient.get(`/products/${id}`);
    }
};
