import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';
import { ChevronRight, Code, Layers, Loader2, ShoppingBag } from 'lucide-react'; 
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useAuth } from '../../context/AuthContext';

// --- TYPES (Khớp với dữ liệu lưu từ CartPage) ---
interface OrderItem {
  id: number;
  productName: string;
  image: string;
  category: string;
  price: number;
}

interface Order {
  id: string | number; // Json-server có thể sinh ID số hoặc chuỗi
  date: string;
  status: 'Completed' | 'Processing' | 'Cancelled';
  totalPrice: number;
  items: OrderItem[]; 
}

const UserProfilePage = () => {
  // 1. Lấy context
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // 2. State lưu trữ đơn hàng thật
  const [orders, setOrders] = useState<Order[]>([]);
  const [isOrdersLoading, setIsOrdersLoading] = useState(true);

  // 3. Logic Redirect bảo mật
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, navigate]);

  // 4. FETCH API: Lấy đơn hàng thật của User
  useEffect(() => {
    if (user?.id) {
      // Gọi API json-server: Lọc theo userId
      fetch(`http://localhost:3001/orders?userId=${user.id}`)
        .then(res => res.json())
        .then((data) => {
          // Sắp xếp đơn hàng mới nhất lên đầu (nếu json-server không tự làm)
          // Giả sử id tăng dần theo thời gian hoặc bạn có thể sort theo date
          const sortedOrders = data.reverse(); 
          setOrders(sortedOrders);
        })
        .catch(err => console.error("Lỗi tải đơn hàng:", err))
        .finally(() => setIsOrdersLoading(false));
    }
  }, [user]);

  const formatCurrency = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // 5. Màn hình Loading khi chờ Auth
  if (isLoading) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f7' }}>
        <Loader2 className="animate-spin" size={40} color="#86868b" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="profile-page">
      <Header />

      <div className="profile-container animate-enter">
        {/* --- HEADER GREETING --- */}
        <div className="profile-header">
          <div>
            <h1 className="greeting-title">Hi, {user.firstName || "Developer"}.</h1>
            <p className="greeting-subtitle">{user.email}</p>
          </div>
          <button onClick={logout} className="sign-out-link">Sign out &rsaquo;</button>
        </div>

        {/* --- SECTION: ORDERS --- */}
        <div className="section-title">Your Orders</div>
        <div className="section-subtitle">
          Manage your purchased source codes, invoices, and download links.
        </div>

        {/* --- RENDER LOGIC: LOADING / EMPTY / LIST --- */}
        {isOrdersLoading ? (
           <div style={{padding: 40, textAlign: 'center', color: '#86868b'}}>
              Loading your orders...
           </div>
        ) : orders.length > 0 ? (
          <div className="orders-grid">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                
                {/* Card Header */}
                <div className="order-card-header">
                  <div className="order-meta">
                    <span className="order-date">{order.date}</span>
                    <span className="order-id">#{order.id}</span>
                  </div>
                  <span className={`order-status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>

                {/* Card Body: Items Preview */}
                <div className="order-items-preview">
                  {order.items.slice(0, 3).map((item, index) => (
                    <div key={index} className="item-thumbnail-wrapper" title={item.productName}>
                       <img src={item.image} alt={item.productName} className="item-thumbnail" />
                    </div>
                  ))}
                  {/* Badge số lượng nếu > 3 sản phẩm */}
                  {order.items.length > 3 && (
                    <div className="item-more-badge">
                      +{order.items.length - 3}
                    </div>
                  )}
                </div>

                {/* Card Content: Summary */}
                <div className="order-summary">
                   <div className="order-summary-text">
                      <span className="item-count">
                          {order.items.length} product{order.items.length > 1 ? 's' : ''}
                      </span>
                      <span className="total-price">
                          {formatCurrency(order.totalPrice)}
                      </span>
                   </div>
                   <div className="order-names-list">
                      {order.items.map(i => i.productName).join(', ')}
                   </div>
                </div>

                <div className="order-card-footer">
                  <a href={`/orders/${order.id}`} className="card-link">
                    View Order Details <ChevronRight size={12} style={{display:'inline'}}/>
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // EMPTY STATE (Nếu chưa có đơn hàng)
          <div className="empty-orders-state" style={{
              background: '#fff', borderRadius: 18, padding: 60, 
              textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}>
              <ShoppingBag size={48} color="#d2d2d7" style={{marginBottom: 20}} />
              <h3 style={{fontSize: 20, fontWeight: 600, marginBottom: 10}}>No orders yet</h3>
              <p style={{color: '#86868b', marginBottom: 20}}>
                You haven't purchased any source code yet. Start exploring now!
              </p>
              <a href="/" className="card-link" style={{fontSize: 16}}>
                 Browse Store <ChevronRight size={16} />
              </a>
          </div>
        )}

        <div className="divider-line"></div>

        {/* --- SECTION: INFO & WISHLIST --- */}
        <div className="info-row">
          
          {/* Account Settings */}
          <div className="info-card">
            <div className="info-card-icon">
                <Layers size={24} color="#1d1d1f" />
            </div>
            <h3>Account Settings</h3>
            <p>Manage your developer profile, billing address, and security.</p>
            
            <div style={{marginTop: 'auto'}}>
                <div className="user-detail-row">
                    <span className="user-detail-label">Name</span>
                    <span className="user-detail-value">{user.firstName} {user.lastName}</span>
                </div>
                <div className="user-detail-row">
                    <span className="user-detail-label">Email</span>
                    <span className="user-detail-value">{user.email}</span>
                </div>
                {user.phone && (
                    <div className="user-detail-row" style={{border: 'none'}}>
                        <span className="user-detail-label">Phone</span>
                        <span className="user-detail-value">{user.phone}</span>
                    </div>
                )}
                <a href="/profile/edit" className="card-link" style={{fontSize: 15, marginTop: 15}}>
                  Edit Profile <ChevronRight size={14} style={{display:'inline', verticalAlign: 'middle'}}/>
                </a>
            </div>
          </div>

          {/* Saved Items */}
          <div className="info-card">
            <div className="info-card-icon">
                <Code size={24} color="#1d1d1f" />
            </div>
            <h3>Your Snippets & Saves</h3>
            <p>
                Access your saved libraries, UI kits, and snippets for later purchase.
            </p>
            <div style={{marginTop: 'auto'}}>
                 <a href="/wishlist" className="card-link" style={{fontSize: 15, marginTop:0}}>
                    Go to Wishlist <ChevronRight size={14} style={{display:'inline', verticalAlign: 'middle'}}/>
                 </a>
            </div>
          </div>

        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default UserProfilePage;