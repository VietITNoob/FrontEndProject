import type {Product} from '../types'
import axiosClient from "../api/axiosClient.tsx";

export const productService = {
    getAll: (): Promise<Product[]> => {
        return axiosClient.get('/products');
    },
    getById: (id: number | string): Promise<Product> => {
        return axiosClient.get(`/products/${id}`);
    }
};
