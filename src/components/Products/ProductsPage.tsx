import { useEffect, useState } from 'react';
import './Products.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CategoryNav from './components/CategoryNav';
import ProductCarousel from './components/ProductCarousel';
import { useProductList } from '../../hook/useProductList';

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  
  // Sử dụng custom hook để lấy dữ liệu
  const { all, byCategory, bestSellers, newProducts, topRatedProducts, fetchByCategory } = useProductList();

  useEffect(() => {
    // Cuộn lên đầu trang
    window.scrollTo(0, 0);
  }, []);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId) {
      fetchByCategory(categoryId);
    }
  };

  // Xác định danh sách sản phẩm hiển thị: nếu có category thì dùng byCategory, ngược lại dùng all
  const displayedProducts = selectedCategory ? byCategory : all;

  return (
    <div className="store-container">
      {/* 1. Reuse Global Header */}
      <Header />

      {/* 2. Top Banner / Title */}
      <div style={{ padding: '80px 0 40px', maxWidth: '1400px', margin: '0 auto', paddingLeft: '40px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 700, color: '#1d1d1f' }}>
          Store. <span style={{ color: '#6e6e73' }}>Món quà tuyệt vời nhất.</span>
        </h1>
      </div>

      {/* 3. Category Icons */}
      <CategoryNav onSelectCategory={handleCategorySelect} />

      {/* 4. Section: All Products or Selected Category */}
      <ProductCarousel 
        titleStart={selectedCategory ? "Selected Category." : "All Products."}
        titleHighlight={selectedCategory ? "Explore our selection." : "Discover our entire collection."}
        products={displayedProducts} 
      />

      {!selectedCategory && (
        <>
          <ProductCarousel 
            titleStart="Bán chạy nhất."
            titleHighlight="Sản phẩm được yêu thích."
            products={bestSellers} 
          />

          <ProductCarousel 
            titleStart="Mới nhất."
            titleHighlight="Công nghệ tiên tiến."
            products={newProducts} 
          />

          <ProductCarousel 
            titleStart="Đánh giá cao."
            titleHighlight="Chất lượng khẳng định."
            products={topRatedProducts} 
          />
        </>
      )}

      {/* 8. Footer */}
      <Footer />
    </div>
  );
};

export default ProductsPage;
