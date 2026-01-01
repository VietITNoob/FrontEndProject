import React from 'react';
import type {Product} from "../../../types";

interface HeroSectionProps {
    product: Product;
}

const HeroSection: React.FC<HeroSectionProps> = ({ product }) => {
    const hasDiscount = product.discount > 0;
    const discountedPrice = hasDiscount 
        ? product.price * (1 - product.discount / 100) 
        : product.price;

    return (
        <section className="hero-section reveal">
            <div className="container">
                <div style={{display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '1rem'}}>
                    {/*<span className="badge">Mới ra mắt</span>*/}
                </div>
                <h1 className="hero-title">
                    {product.title} <br />
                    <span className="gray-text">Hiệu năng đột phá.</span>
                </h1>
                <p className="hero-desc">
                    {product.description}
                </p>
                <div className="cta-group">
                    <button className="btn-primary shadow-blue">Thêm vào giỏ</button>
                    <button className="btn-secondary" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <span>Mua ngay — {discountedPrice.toLocaleString()}đ</span>
                        {hasDiscount && (
                            <span style={{textDecoration: 'line-through', opacity: 0.7, fontSize: '0.9em'}}>
                                {product.price.toLocaleString()}đ
                            </span>
                        )}
                    </button>
                </div>
                <div className="hero-mockup">
                    <img src={product.image} alt={product.title} />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
