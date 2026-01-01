import React, { useEffect, useRef } from "react";
import { useProductList } from "../../../hook/useProductList";
import ProductCarousel from "../../Products/components/ProductCarousel";

interface RecomandProps {
    categoryId: string;
    currentProductId: number;
}

const Recomand: React.FC<RecomandProps> = ({ categoryId, currentProductId }) => {
    const { byCategory, fetchByCategory, loading } = useProductList(false);
    const revealRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (categoryId) {
            fetchByCategory(categoryId);
        }
    }, [categoryId]);
    // Handle scroll reveal animation locally since this component loads data asynchronously
    useEffect(() => {
        if (loading || !revealRef.current) return;

         const observer = new IntersectionObserver(
             (entries) => {
                 entries.forEach((entry) => {
                     if (entry.isIntersecting) {
                         entry.target.classList.add('active');
                         observer.unobserve(entry.target);
                     }
                 });
             },
             { threshold: 0.1 }
         );
         observer.observe(revealRef.current);
         return () => observer.disconnect();
    }, [loading, byCategory]);
    // Lọc bỏ sản phẩm hiện tại khỏi danh sách gợi ý
    const recommendedProducts = byCategory.filter(product => String(product.id) !== String(currentProductId));

    if (loading) {
        return <div className="container" style={{ padding: '40px 0', textAlign: 'center' }}>Đang tải gợi ý...</div>;
    }

    if (recommendedProducts.length === 0) {
        return null;
    }

    return (
        <div ref={revealRef} className="reveal" style={{ marginTop: '40px' }}>
            <ProductCarousel 
                titleStart="Có thể bạn cũng thích."
                titleHighlight="Sản phẩm tương tự."
                products={recommendedProducts} 
            />
        </div>
    );
};

export default Recomand;
