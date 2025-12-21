import React, { useEffect } from 'react';
import './Cart.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { ChevronDown, ShieldCheck } from 'lucide-react'; // Icon cho AppleCare

const CartPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Dữ liệu giả lập
  const cartItems = [
    {
      id: 1,
      name: 'E-Commerce Ultimate',
      license: 'Giấy phép Doanh nghiệp (Enterprise License)',
      specs: ['ReactJS + Node.js', 'Full Database', 'Life-time updates'],
      price: 14726000,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80',
      quantity: 1,
      hasAddon: true, // Có thể thêm support
    },
    {
      id: 2,
      name: 'SaaS Dashboard Pro',
      license: 'Giấy phép Cá nhân (Personal License)',
      specs: ['Vue 3 + Laravel', 'Admin Panel', '6 Months updates'],
      price: 5200000,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80',
      quantity: 1,
      hasAddon: false,
    }
  ];

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
  const formatVND = (price: number) => price.toLocaleString('vi-VN') + 'đ';

  return (
    <div className="cart-container">
      <Header />

      {/* 1. HERO TOTAL SECTION (Phần xám trên cùng) */}
      <section className="cart-header">
        <h1 className="cart-total-title">
          Tổng giá trị giỏ hàng của bạn là <span className="cart-total-price">{formatVND(totalPrice)}.</span>
        </h1>
        <p className="cart-message">Vận chuyển miễn phí (Gửi qua Email ngay lập tức).</p>
        <button className="btn-checkout-hero">Thanh toán</button>
      </section>

      {/* 2. ITEM LIST */}
      <section className="cart-body">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            {/* Ảnh sản phẩm */}
            <img src={item.image} alt={item.name} className="item-image" />

            {/* Thông tin */}
            <div className="item-details">
              <div className="item-header">
                <h3 className="item-name">{item.name}</h3>
                <span className="item-price">{formatVND(item.price)}</span>
              </div>
              
              {/* Quantity Selector giả lập */}
              <div style={{display: 'flex', alignItems: 'center', gap: 5}}>
                 <span style={{fontSize: 17, fontWeight: 400}}>SL:</span>
                 <button className="item-quantity-select">
                    {item.quantity} <ChevronDown size={14} style={{marginLeft: 4, marginTop: 2}}/>
                 </button>
              </div>

              {/* Meta Info */}
              <div className="item-meta">
                <p style={{fontWeight: 600, marginBottom: 4}}>{item.license}</p>
                {item.specs.map((spec, idx) => (
                  <span key={idx} style={{display:'block'}}>{spec}</span>
                ))}
              </div>

              {/* Addon (Giống AppleCare+) */}
              {item.hasAddon && (
                <div className="addon-row">
                   <ShieldCheck size={20} className="addon-icon" />
                   <div>
                      <span className="addon-text">Thêm Premium Support (24/7) với giá 2.990.000đ</span>
                      <span className="addon-desc">
                        Được hỗ trợ kỹ thuật trực tiếp từ đội ngũ Senior Dev. Fix lỗi trong 24h.
                        <a href="#" className="addon-link">Tìm hiểu thêm &rsaquo;</a>
                      </span>
                   </div>
                   <a href="#" className="addon-link" style={{whiteSpace:'nowrap'}}>Thêm</a>
                </div>
              )}
              
              <div className="item-actions">
                <button className="btn-remove">Xóa</button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 3. SUMMARY FOOTER (Phần tổng kết dưới) */}
      <section className="cart-summary">
        <div className="summary-row">
          <span className="summary-label">Tổng phụ</span>
          <span className="summary-value">{formatVND(totalPrice)}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Vận chuyển (Email)</span>
          <span className="summary-value">MIỄN PHÍ</span>
        </div>
        
        <div className="summary-divider"></div>
        
        <div className="total-row">
          <span className="total-label">Thanh toán toàn bộ</span>
          <span className="total-value">{formatVND(totalPrice)}</span>
        </div>
        
        {/* Phần trả góp giả lập */}
        <div className="installment-note">
           hoặc 
           <div style={{fontSize: 17, fontWeight: 600, marginTop: 4, color: '#1d1d1f'}}>
              Thanh toán Hàng Tháng {formatVND(Math.round(totalPrice / 12))}/tháng*
           </div>
           <div style={{marginTop: 5, fontSize: 12}}>Lãi suất 0% trong 12 tháng. <a href="#" style={{color: '#0066cc'}}>Tìm hiểu thêm</a></div>
        </div>

        <div className="checkout-area">
           <button className="btn-checkout-bottom">Thanh Toán</button>
        </div>
      </section>

      {/* 4. RECOMMENDATIONS (Có thể bạn cũng thích) */}
      <section className="rec-section">
        <h2 className="rec-title">Có thể bạn cũng sẽ thích</h2>
        <div className="rec-grid">
           {/* Rec 1 */}
           <div className="rec-card">
              <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&q=80" className="rec-img" alt="UI Kit"/>
              <div className="rec-name">Glassmorphism UI Kit</div>
              <div className="rec-price">699.000đ</div>
           </div>
           {/* Rec 2 */}
           <div className="rec-card">
              <img src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&q=80" className="rec-img" alt="Icons"/>
              <div className="rec-name">3D Abstract Icons</div>
              <div className="rec-price">299.000đ</div>
           </div>
           {/* Rec 3 */}
           <div className="rec-card">
              <img src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=200&q=80" className="rec-img" alt="Theme"/>
              <div className="rec-name">VS Code Pro Theme</div>
              <div className="rec-price">199.000đ</div>
           </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CartPage;