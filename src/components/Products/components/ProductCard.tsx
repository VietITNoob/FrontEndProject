import React from 'react';
import { Plus } from 'lucide-react';
import { useCart } from '../../../context/CartContext';
import { useNavigate } from 'react-router-dom';

interface ProductProps {
  data: {
    id: number;
    tag?: string;
    title: string;
    price: string;
    image: string;
    isDark?: boolean;
  };
}

const ProductCard: React.FC<ProductProps> = ({ data }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await addToCart(data as any);
    navigate('/cart');
  };

  const handleCardClick = () => {
    navigate(`/product/${data.id}`);
  };

  // Logic hiển thị tag
  const tag = data.tag || '';
  const isAI = tag.toLowerCase().includes('ai') || tag.toLowerCase().includes('intelligence') || tag.includes('Best Seller');
  const isNew = tag.toLowerCase().includes('new') || tag.toLowerCase().includes('free');

  return (
    <div className="store-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className="card-content">
        {/* Render Tag nếu có tồn tại */}
        {tag && (
          <div 
            className={`card-tag ${isAI ? 'tag-gradient' : ''} ${isNew && !isAI ? 'tag-orange' : ''}`}
            style={{ color: !isAI && !isNew ? '#6e6e73' : '' }} // Màu xám mặc định
          >
            {tag}
          </div>
        )}
        
        <h3 className="card-title">{data.title}</h3>
        <p className="card-price">{data.price}</p>
      </div>

      <div className="card-image-wrapper">
        <img src={data.image} alt={data.title} className="card-img" />
      </div>

      {/* Nút cộng tròn */}
      <button onClick={handleAddToCart} className="card-link-overlay" aria-label="Add to cart">
        <Plus size={20} color="#1d1d1f" />
      </button>
    </div>
  );
};

export default ProductCard;