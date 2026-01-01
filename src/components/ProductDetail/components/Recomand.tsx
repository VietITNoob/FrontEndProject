import React, { useEffect } from "react";
import { useProductList } from "../../../hook/useProductList";
import ProductCarousel from "../../Products/components/ProductCarousel";

interface RecomandProps {
    categoryId: string;
    currentProductId: number;
}

const Recomand: React.FC<RecomandProps> = ({ categoryId, currentProductId }) => {
    const { byCategory, fetchByCategory, loading } = useProductList();

    useEffect(() => {
        if (categoryId) {
            fetchByCategory(categoryId);
        }
    }, [categoryId]);

    // Lọc bỏ sản phẩm hiện tại khỏi danh sách gợi ý
    const recommendedProducts = byCategory.filter(product => product.id !== currentProductId);

    if (loading) {
        return <div className="container" style={{ padding: '40px 0', textAlign: 'center' }}>Đang tải gợi ý...</div>;
    }

    if (recommendedProducts.length === 0) {
        return null;
    }

    return (
        <div className="reveal" style={{ marginTop: '40px' }}>
            <ProductCarousel 
                titleStart="Có thể bạn cũng thích."
                titleHighlight="Sản phẩm tương tự."
                products={recommendedProducts} 
            />
        </div>
    );
};

export default Recomand;
