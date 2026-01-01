import { useEffect, useState } from "react";
import type {Product} from "../types";
import {productService} from "../service/productService.tsx";


export const useProductDetail = (productId: number) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        const fetchData = async () =>{
            setLoading(true);
            try{
                const productRes = await productService.getById(productId);
                setProduct(productRes);
            }catch (err){
                setError(err);
            }finally {
                setLoading(false);
            }
        }
        if (productId) {
            fetchData();
        }
    }, [productId]);
    return {product, loading, error};
}