import React from 'react';
import type {Product} from "../../../types";

interface TechSpecsProps {
    product: Product;
}

const TechSpecs: React.FC<TechSpecsProps> = ({ product }) => {
    return (
        <section className="specs-section reveal">
            <div className="container-narrow">
                <h2 className="section-title">Thông số kỹ thuật</h2>
                <div className="specs-table">
                    <div className="spec-row">
                        <span className="spec-label">Công nghệ</span>
                        <strong className="spec-value">{product.tech ? product.tech.join(', ') : 'React 18, TypeScript, Vite'}</strong>
                    </div>
                    <div className="spec-row">
                        <span className="spec-label">UI Framework</span>
                        <strong className="spec-value">{product["UI Framework"] ? product["UI Framework"].join(', ') : 'Custom CSS (No Library)'}</strong>
                    </div>
                    <div className="spec-row">
                        <span className="spec-label">Backend</span>
                        <strong className="spec-value">{product.BackEnd || 'Node.js / Go / Java'}</strong>
                    </div>
                    <div className="spec-row">
                        <span className="spec-label">Database</span>
                        <strong className="spec-value">{product.database ? product.database.join(', ') : 'PostgreSQL'}</strong>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TechSpecs;
