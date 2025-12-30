import React from 'react';
import type {Product} from "../../../types";

interface HeroSectionProps {
    product: Product;
}

const HeroSection: React.FC<HeroSectionProps> = ({ product }) => {
    return (
        <section className="hero-section reveal">
            <div className="container">
                <span className="badge">Mới ra mắt</span>
                <h1 className="hero-title">
                    {product.title} <br />
                    <span className="gray-text">Hiệu năng đột phá.</span>
                </h1>
                <p className="hero-desc">
                    {product.description}
                </p>
                <div className="cta-group">
                    <button className="btn-primary shadow-blue">Thêm vào giỏ</button>
                    <button className="btn-secondary">Mua ngay — {product.price.toLocaleString()}đ</button>
                </div>
                <div className="hero-mockup">
                    <img src={product.image} alt={product.title} />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
