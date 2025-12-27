import type {Product, ProductParams} from '../types'
import axiosClient from "../api/axiosClient.tsx";

export const productService = {
    getAll: (params?: ProductParams): Promise<Product[]> => {
        return axiosClient.get('/products',{
            params: params
        });
    },
    getById: (id: number | string): Promise<Product> => {
        return axiosClient.get(`/products/${id}`);
    }
};
