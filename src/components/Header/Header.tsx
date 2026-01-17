import { useState, useRef, useEffect } from 'react';
import './Header.css';
import { HEADER_MENU } from './header.data';
import MegaDropdown from './MegaDropdown';
import { useHeaderNavigation } from './hooks/useHeaderNavigation';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext'; // Import Context Auth
import useProductSearch from '../../hook/useSearch';
import { categoryService } from '../../service/categroryService';
import type { Category } from '../../types';
import { User, LogOut, Package, UserCircle } from 'lucide-react'; // Import Icons

const Header = () => {
  // --- HOOKS ---
  const {
    scrolled,
    hoveredNavItem,
    isDropdownOpen,
    onNavItemEnter,
    onNavLeave,
  } = useHeaderNavigation();

  const { itemCount, lastAddedItem, clearLastAddedItem } = useCart();
  const { user, logout, isAuthenticated } = useAuth(); // Lấy thông tin user và hàm logout
  const navigate = useNavigate();

  // --- STATES ---
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [showUserMenu, setShowUserMenu] = useState(false); // State hiển thị menu user
  const [showCartPopover, setShowCartPopover] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const popoverTimerRef = useRef<number | null>(null);

  // LOGIC POPOVER GIỎ HÀNG
  useEffect(() => {
    if (lastAddedItem) {
      setShowCartPopover(true);


        // Xóa bộ đếm thời gian trước đó nếu có.
      if (popoverTimerRef.current) {
        clearTimeout(popoverTimerRef.current);
      }

      // Đặt bộ hẹn giờ mới để ẩn cửa sổ bật lên.
      popoverTimerRef.current = window.setTimeout(() => {
        setShowCartPopover(false);
        clearLastAddedItem();
      }, 2000); // ẩn sau 2 giây
    }

    // Bộ hẹn giờ được dọn dẹp khi gỡ bỏ thành phần
    return () => {
      if (popoverTimerRef.current) {
        clearTimeout(popoverTimerRef.current);
      }
    };
  }, [lastAddedItem, clearLastAddedItem]);

  // --- SEARCH LOGIC ---
  const { products: searchResults, loading: searchLoading } = useProductSearch({
    search: searchTerm,
    category: 'all',
    tech: ''
  });

  // Fetch categories
  useEffect(() => {
    categoryService.getAll().then(setCategories).catch(console.error);
  }, []);

  // Auto focus search input
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  // Handlers
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchTerm('');
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
    setIsSearchOpen(false);
    setSearchTerm('');
  };

  const handleCategoryClick = (categoryId: number | string) => {
    console.log("Navigate to category:", categoryId);
    setIsSearchOpen(false);
  };

  return (
    <>
      <nav
        className={`apple-nav ${scrolled ? 'scrolled' : 'top'} ${isDropdownOpen ? 'dropdown-open' : ''}`}
        onMouseLeave={onNavLeave}
      >
        <div className="nav-container">
          {/* 1. LOGO */}
          <Link to="/" className="nav-logo">
            <span className="logo-text tag-gradient">CodeStore</span>
          </Link>

          {/* 2. MAIN MENU */}
          <ul className="nav-links">
            {HEADER_MENU.map((item) => (
              <li
                key={item.id}
                className={`nav-link-item ${hoveredNavItem === item.id ? 'active' : ''}`}
                onMouseEnter={() => onNavItemEnter(item.id, item.hasDropdown)}
              >
                <Link to={item.path || '#'} className="nav-link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* 3. RIGHT ACTIONS (Search, Cart, User) */}
          <div className="nav-actions">
            {/* Search Button */}
            <button className="icon-btn" onClick={toggleSearch}>
              <img className="search-i" src="/search_button.svg" alt="Search" width="20" height="20" />
            </button>
            
            {/* Cart Button & Popover */}
            <div className="cart-action-wrapper">
              <Link to="/cart" className="icon-btn cart-icon">
                <img src="/cart.svg" alt="Cart" width="20" height="20" />
                {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
              </Link>

              {/* --- CART POPOVER --- */}
              <div className={`cart-popover ${showCartPopover ? 'active' : ''}`}>
                {lastAddedItem && (
                  <>
                    <div className="popover-header">Đã thêm vào giỏ hàng</div>
                    <div className="popover-body">
                      <img src={lastAddedItem.image} alt={lastAddedItem.title} className="popover-item-image" />
                      <span className="popover-item-title">{lastAddedItem.title}</span>
                    </div>
                    <div className="popover-footer">
                      <Link to="/cart" className="btn-view-cart">
                        Xem giỏ hàng ({itemCount})
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* --- USER AUTH SECTION (Thay đổi chính) --- */}
            <div 
              className="auth-action-wrapper"
              onMouseEnter={() => setShowUserMenu(true)}
              onMouseLeave={() => setShowUserMenu(false)}
            >
              {isAuthenticated && user ? (
                // TRƯỜNG HỢP: ĐÃ ĐĂNG NHẬP
                <div className="user-profile-btn">
                   <span className="user-greeting">Hi, {user.lastName}</span>
                   <UserCircle size={24} className="user-avatar-icon" />
                   
                   {/* Dropdown Menu */}
                   <div className={`user-dropdown-menu ${showUserMenu ? 'active' : ''}`}>
                      {/* Header của Dropdown */}
                      <div className="user-info-header">
                        <p className="user-fullname">{user.firstName} {user.lastName}</p>
                        <p className="user-email">{user.email}</p>
                      </div>
                      
                      {/* List Menu */}
                      <ul className="user-menu-list">
                        <li>
                          <Link to="/account/home" className="user-menu-item">
                            <User size={16} /> Thông tin tài khoản
                          </Link>
                        </li>
                        <li>
                          <Link to="/account/home" className="user-menu-item">
                            <Package size={16} /> Đơn hàng của tôi
                          </Link>
                        </li>
                        <li className="divider"></li>
                        <li>
                          <button onClick={logout} className="user-menu-item logout-btn">
                            <LogOut size={16} /> Đăng xuất
                          </button>
                        </li>
                      </ul>
                   </div>
                </div>
              ) : (
                // TRƯỜNG HỢP: CHƯA ĐĂNG NHẬP
                <Link to="/login" className="btn-login">
                  Đăng nhập
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* 4. MEGA DROPDOWN (Menu sản phẩm) */}
        <MegaDropdown visible={isDropdownOpen} />
        
        {/* 5. SEARCH DROPDOWN */}
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
                  // KẾT QUẢ TÌM KIẾM
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
                  // DANH MỤC GỢI Ý (KHI CHƯA NHẬP)
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
      
      {/* BACKDROP */}
      <div 
        className={`search-backdrop ${isSearchOpen ? 'active' : ''}`} 
        onClick={toggleSearch}
      ></div>
    </>
  );
};

export default Header;