import { useEffect, useState } from 'react';
import './Cart.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { ChevronDown, Loader2, CheckCircle, XCircle } from 'lucide-react'; // Import Icon
import { useCart } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // --- POPUP STATES ---
  const [showPopup, setShowPopup] = useState(false);
  const [popupStatus, setPopupStatus] = useState<'success' | 'error'>('success');
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const formatVND = (price: number) => price.toLocaleString('vi-VN') + 'đ';

  const handleCheckout = async () => {
    if (!isAuthenticated || !user) {
      setPopupStatus('error');
      setPopupMessage("Vui lòng đăng nhập để tiến hành thanh toán!");
      setShowPopup(true);
      setTimeout(() => {
          setShowPopup(false);
          navigate('/login');
      }, 2000);
      return;
    }

    if (cartItems.length === 0) return;

    setIsProcessing(true);

    const newOrder = {
      userId: user.id,
      date: new Date().toLocaleDateString('vi-VN'),
      status: "Completed",
      paymentMethod: "Visa (...4242)",
      totalPrice: totalPrice,
      customerName: `${user.firstName} ${user.lastName}`,
      email: user.email,
      items: cartItems.map(item => ({
        id: item.id,
        productName: item.title,
        image: item.image,
        category: "Source Code",
        price: item.price,
        quantity: item.quantity
      }))
    };

    try {
      const response = await fetch('http://localhost:3001/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
      });

      if (!response.ok) throw new Error('Đặt hàng thất bại');

      clearCart();
      
      // Show Success Popup
      setPopupStatus('success');
      setPopupMessage("Thanh toán thành công! Cảm ơn bạn đã mua hàng.");
      setShowPopup(true);

      // Auto redirect after 2 seconds
      setTimeout(() => {
        setShowPopup(false);
        navigate('/account/home');
      }, 2000);

    } catch (error) {
      console.error("Checkout Error:", error);
      setPopupStatus('error');
      setPopupMessage("Có lỗi xảy ra khi thanh toán. Vui lòng thử lại.");
      setShowPopup(true);
      
      // Auto close error popup
      setTimeout(() => setShowPopup(false), 3000);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="cart-container">
      <Header />

      {/* --- CUSTOM POPUP --- */}
      {showPopup && (
        <div className="checkout-popup-overlay">
          <div className={`checkout-popup ${popupStatus}`}>
            <div className="popup-icon">
              {popupStatus === 'success' ? (
                <CheckCircle size={48} color="#34c759" />
              ) : (
                <XCircle size={48} color="#ff3b30" />
              )}
            </div>
            <h3 className="popup-title">
              {popupStatus === 'success' ? 'Thành Công!' : 'Thông Báo'}
            </h3>
            <p className="popup-desc">{popupMessage}</p>
          </div>
        </div>
      )}

      <section className="cart-header">
        <h1 className="cart-total-title">
          Tổng giá trị giỏ hàng của bạn là <span className="cart-total-price">{formatVND(totalPrice)}.</span>
        </h1>
        <p className="cart-message">Vận chuyển miễn phí (Gửi qua Email ngay lập tức).</p>
        <button className="btn-checkout-hero" onClick={handleCheckout} disabled={isProcessing || cartItems.length === 0}>
          {isProcessing ? 'Đang xử lý...' : 'Thanh toán'}
        </button>
      </section>

      <section className="cart-body">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="item-image" />

              <div className="item-details">
                <div className="item-header">
                  <h3 className="item-name">{item.title}</h3>
                  <span className="item-price">{formatVND(item.price)}</span>
                </div>
                
                <div style={{display: 'flex', alignItems: 'center', gap: 5}}>
                   <span style={{fontSize: 17, fontWeight: 400}}>SL:</span>
                   <div className="quantity-selector">
                      <button 
                        className="quantity-btn decrease"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button 
                        className="quantity-btn increase"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                   </div>
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
            <Link to="/" className="btn-primary" style={{marginTop: 20, display: 'inline-block'}}>
              Tiếp tục mua sắm
            </Link>
          </div>
        )}
      </section>

      {cartItems.length > 0 && (
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
          
          <div className="installment-note">
             hoặc 
             <div style={{fontSize: 17, fontWeight: 600, marginTop: 4, color: '#1d1d1f'}}>
                Thanh toán Hàng Tháng {formatVND(Math.round(totalPrice / 12))}/tháng*
             </div>
             <div style={{marginTop: 5, fontSize: 12}}>Lãi suất 0% trong 12 tháng. <a href="#" style={{color: '#0066cc'}}>Tìm hiểu thêm</a></div>
          </div>

        <div className="checkout-area">
           <button 
                className="btn-checkout-bottom"
                onClick={handleCheckout}
                disabled={isProcessing}
           >
                {isProcessing ? (
                  <span style={{display: 'flex', alignItems: 'center', gap: 8}}>
                    <Loader2 className="animate-spin" size={20} /> Đang xử lý...
                  </span>
                ) : (
                  "Thanh Toán"
                )}
             </button>
          </div>
        </section>
      )}

      <section className="rec-section">
        <h2 className="rec-title">Có thể bạn cũng sẽ thích</h2>
        <div className="rec-grid">
           <div className="rec-card">
              <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&q=80" className="rec-img" alt="UI Kit"/>
              <div className="rec-name">Glassmorphism UI Kit</div>
              <div className="rec-price">699.000đ</div>
           </div>
           <div className="rec-card">
              <img src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&q=80" className="rec-img" alt="Icons"/>
              <div className="rec-name">3D Abstract Icons</div>
              <div className="rec-price">299.000đ</div>
           </div>
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