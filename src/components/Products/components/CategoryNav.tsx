import React from 'react';
import { CATEGORIES } from '../data/products.data';

const CategoryNav = () => {
  return (
    <div className="category-nav">
      {CATEGORIES.map((cat) => (
        <div key={cat.id} className="cat-item">
          <div className="cat-icon-box">
            <img src={cat.image} alt={cat.name} className="cat-icon" />
          </div>
          <span className="cat-name">{cat.name}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryNav;