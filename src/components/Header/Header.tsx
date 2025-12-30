import { useState, useRef, useEffect } from 'react';
import './Header.css';
import { HEADER_MENU } from './header.data';
import MegaDropdown from './MegaDropdown';
import { useHeaderNavigation } from './hooks/useHeaderNavigation';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import useProductSearch from '../../hook/useSearch';
import { categoryService } from '../../service/categroryService';
import type { Category } from '../../types';

const Header = () => {
  const {
    scrolled,
    hoveredNavItem,
    isDropdownOpen,
    onNavItemEnter,
    onNavLeave,
  } = useHeaderNavigation();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sử dụng hook useProductSearch
  const { products: searchResults, loading: searchLoading } = useProductSearch({
    search: searchTerm,
    category: 'all',
    tech: ''
  });

  // Fetch categories khi component mount
  useEffect(() => {
    categoryService.getAll().then(setCategories).catch(console.error);
  }, []);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchTerm(''); // Reset search term khi mở lại
    }
  };

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
    setIsSearchOpen(false);
    setSearchTerm('');
  };

  const handleCategoryClick = (categoryId: number | string) => {
    // Điều hướng đến trang danh sách sản phẩm với filter category (giả sử route là /products?category=...)
    // Hoặc xử lý theo logic của bạn
    console.log("Navigate to category:", categoryId);
    // Ví dụ: navigate(`/products?category=${categoryId}`);
    setIsSearchOpen(false);
  };

  return (
    <>
      <nav
        className={`apple-nav ${scrolled ? 'scrolled' : 'top'} ${isDropdownOpen ? 'dropdown-open' : ''}`}
        onMouseLeave={onNavLeave}
      >
        <div className="nav-container">
          {/* LOGO */}
          <a href="/" className="nav-logo">
            <span className="logo-text tag-gradient">CodeStore</span>
          </a>

          {/* MENU */}
          <ul className="nav-links">
            {HEADER_MENU.map((item) => (
              <li
                key={item.id}
                className={`nav-link-item ${hoveredNavItem === item.id ? 'active' : ''}`}
                onMouseEnter={() => onNavItemEnter(item.id, item.hasDropdown)}
              >
                <a href={`#${item.id}`} className="nav-link">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* ACTIONS */}
          <div className="nav-actions">
            <button className="icon-btn" onClick={toggleSearch}>
              <img className="search-i" src="/search_button.svg" alt="Search" width="20" height="20" />
            </button>
            <Link to="/cart" className="icon-btn cart-icon">
              <img src="/cart.svg" alt="Cart" width="20" height="20" />
              {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
            </Link>
            <div className="nav-actions">
              <Link to="/login" className="btn-login">
                Đăng nhập
              </Link>
            </div>
          </div>
        </div>

        {/* MEGA DROPDOWN */}
        <MegaDropdown visible={isDropdownOpen} />
        
        {/* SEARCH DROPDOWN */}
        <div className={`mega-dropdown search-dropdown ${isSearchOpen ? 'visible' : ''}`}>
          <div className="search-container-dropdown">
             <div className="search-input-wrapper">
                 <img className="search-icon-input" src="/search_button.svg" alt="Search" width="20" height="20" />
                <input 
                  ref={searchInputRef}
                  type="text" 
                  className="search-input-large" 
                  placeholder="Tìm kiếm trên CodeStore" 
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
             </div>
             
             <div className="search-results-container">
                {searchLoading ? (
                  <div className="search-loading">Đang tìm kiếm...</div>
                ) : searchTerm ? (
                  // KHI CÓ TỪ KHÓA TÌM KIẾM: HIỂN THỊ KẾT QUẢ SẢN PHẨM
                  searchResults.length > 0 ? (
                    <div className="search-results-list">
                      <h4>Gợi ý sản phẩm</h4>
                      <ul>
                        {searchResults.filter(product => product.price && !isNaN(Number(product.price)))
                            .map((product) => (
                          <li key={product.id}>
                            <a 
                              href="#" 
                              onClick={(e) => {
                                e.preventDefault();
                                handleProductClick(product.id);
                              }}
                              className="search-result-item"
                            >
                              {product.title}
                              <span className="search-result-price">
                                {product.price && !isNaN(Number(product.price))
                                    ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(product.price))
                                    : 'Liên hệ'
                                }
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                     <div className="search-no-results">Không tìm thấy sản phẩm nào</div>
                  )
                ) : (
                  // KHI CHƯA NHẬP GÌ: HIỂN THỊ DANH MỤC (LIÊN KẾT NHANH)
                  <div className="quick-links">
                    <h4>Danh mục nổi bật</h4>
                    <ul>
                        {categories.slice(0, 5).map((cat) => (
                            <li key={cat.id}>
                                <a href="#" onClick={(e) => {
                                    e.preventDefault();
                                    handleCategoryClick(cat.id);
                                }}>
                                    {cat.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                  </div>
                )}
             </div>
          </div>
        </div>
      </nav>
      
      {/* BACKDROP KHI SEARCH ACTIVE */}
      <div 
        className={`search-backdrop ${isSearchOpen ? 'active' : ''}`} 
        onClick={toggleSearch}
      ></div>
    </>
  );
};

export default Header;
