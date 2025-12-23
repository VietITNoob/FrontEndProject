import React from 'react';
import type { Product } from "../../../types";

interface TechSpecsProps {
    product: Product;
}

const TechSpecs: React.FC<TechSpecsProps> = ({ product }) => {

    const specsConfig = [
        { label: 'Công nghệ', value: product.tech },
        { label: 'UI Framework', value: product.UI_Framework },
        { label: 'Backend', value: product.BackEnd },
        { label: 'Database', value: product.database },
    ];

    return (
        <section className="specs-section reveal">
            <div className="container-narrow">
                <h2 className="section-title">Thông số kỹ thuật</h2>
                <div className="specs-table">
                    {specsConfig.map((spec, index) => {
                        // Logic kiểm tra
                        if (!spec.value || (Array.isArray(spec.value) && spec.value.length === 0)) {
                            return null;
                        }

                        return (
                            <div className="spec-row" key={index}>
                                <span className="spec-label">{spec.label}</span>
                                <strong className="spec-value">
                                    {Array.isArray(spec.value) ? spec.value.join(', ') : spec.value}
                                </strong>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TechSpecs;