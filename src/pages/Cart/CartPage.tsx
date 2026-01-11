import { useEffect } from 'react';
import './Cart.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCheckout = () => {
    if (isAuthenticated) {
      // Logic thanh toán thực tế sẽ ở đây
      console.log('Redirecting to checkout...');
      alert('Chức năng thanh toán đang được phát triển!');
    } else {
      alert('Bạn cần đăng nhập để thực hiện thanh toán.');
      navigate('/login');
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
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
        <button className="btn-checkout-hero" onClick={handleCheckout}>Thanh toán</button>
      </section>

      {/* 2. ITEM LIST */}
      <section className="cart-body">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              {/* Ảnh sản phẩm */}
              <img src={item.image} alt={item.title} className="item-image" />

              {/* Thông tin */}
              <div className="item-details">
                <div className="item-header">
                  <h3 className="item-name">{item.title}</h3>
                  <span className="item-price">{formatVND(item.price)}</span>
                </div>
                
                {/* Quantity Selector giả lập */}
                <div style={{display: 'flex', alignItems: 'center', gap: 5}}>
                   <span style={{fontSize: 17, fontWeight: 400}}>SL:</span>
                   <button className="item-quantity-select">
                      {item.quantity} <ChevronDown size={14} style={{marginLeft: 4, marginTop: 2}}/>
                   </button>
                </div>

                <div className="item-actions">
                  <button onClick={() => removeFromCart(item.id)} className="btn-remove">Xóa</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-cart-message">
            <h2>Giỏ hàng của bạn đang trống</h2>
            <p>Hãy khám phá các sản phẩm tuyệt vời của chúng tôi và thêm vào giỏ hàng nhé!</p>
            <Link to="/products" className="btn-primary">Tiếp tục mua sắm</Link>
          </div>
        )}
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
           <button className="btn-checkout-bottom" onClick={handleCheckout}>Thanh Toán</button>
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