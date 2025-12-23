import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import './ProductDetail.css';
import HeroSection from "../../components/ProductDetail/components/HeroSection";
import TechSpecs from "../../components/ProductDetail/components/TechSpecs";
import Reviews from "../../components/ProductDetail/components/Reviews";
import { useProductDetail } from "../../hook/useProductDetail";

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const productId = id ? parseInt(id, 10) : 0;
    const { product, loading, error } = useProductDetail(productId);

    // Hook Scroll Reveal
    useEffect(() => {
        if (loading || !product) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const hiddenElements = document.querySelectorAll('.reveal');
        hiddenElements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [product, loading]);

    if (loading) {
        return (
            <div className="page-wrapper">
                <Header />
                <main className="product-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                    <p>Đang tải...</p>
                </main>
                <Footer />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="page-wrapper">
                <Header />
                <main className="product-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                    <p>{error ? "Có lỗi xảy ra" : "Sản phẩm không tồn tại"}</p>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="page-wrapper">
            <Header />

            <main className="product-content">
                <HeroSection product={product} />
                <TechSpecs product={product} />
                <Reviews product={product} />
            </main>

            <Footer />
        </div>
    );
};

export default ProductDetail;
