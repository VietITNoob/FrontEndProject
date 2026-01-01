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
    },
    getBycategory: (categoryId: string):Promise<Product[]> => {
        return axiosClient.get(`/products?categoryId=${categoryId}`);
    },
    getBestsale: (): Promise<Product[]> => {
        return axiosClient.get('/products?_sort=sold&_order=desc&_limit=8');
    },
    getNewProduct:(): Promise<Product[]> =>{
        return axiosClient.get('/products?_sort=createdAt&_order=desc&_limit=8');
    },
    getRatingProduct:(): Promise<Product[]> => {
        return axiosClient.get('/products?_sort=rating&_order=desc&_limit=8');
    }
};
