import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import './ProductDetail.css';
import { productApi } from "../../api/productApi";
import type { Product } from "../../types";
import HeroSection from "../../components/ProductDetail/components/HeroSection";
import TechSpecs from "../../components/ProductDetail/components/TechSpecs";
import Reviews from "../../components/ProductDetail/components/Reviews";

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch product data
    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const data = await productApi.getById(id);
                setProduct(data);
            } catch (err) {
                console.error("Failed to fetch product:", err);
                setError("Không thể tải thông tin sản phẩm.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    // Hook Scroll Reveal
    useEffect(() => {
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
    }, [product]); // Re-run observer when product loads

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
                    <p>{error || "Sản phẩm không tồn tại"}</p>
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
