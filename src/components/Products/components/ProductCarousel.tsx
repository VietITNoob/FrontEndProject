import React, { useRef } from 'react';
import ProductCard from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  titleStart: string;
  titleHighlight: string;
  products: any[];
}

const ProductCarousel: React.FC<CarouselProps> = ({ titleStart, titleHighlight, products }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Hàm xử lý cuộn
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 420; // Cuộn bằng khoảng chiều rộng card + gap
      scrollRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="store-section">
      {/* Header + Nút điều hướng */}
      <div className="section-header-wrapper">
        <div className="section-header tag-gradient">
          <span className="heading-highlight">{titleStart} </span>
          <span className="heading-normal tag-gradient" >{titleHighlight}</span>
        </div>
        
        {/* Nút điều hướng góc trên phải (Style Apple) */}
        <div className="carousel-nav-buttons">
          <button onClick={() => scroll('left')} className="nav-btn" aria-label="Previous">
            <ChevronLeft size={20} />
          </button>
          <button onClick={() => scroll('right')} className="nav-btn" aria-label="Next">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      {/* Container chứa Card */}
      <div className="carousel-container" ref={scrollRef}>
        {products.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
        
        {/* Spacer cuối cùng để không bị cấn lề phải */}
        <div style={{minWidth: '20px'}}></div> 
      </div>
    </section>
  );
};

export default ProductCarousel;