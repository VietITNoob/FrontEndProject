import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';
import { ChevronRight, Code, Layers, Loader2 } from 'lucide-react'; // Thêm Loader2
import Header from '../../components/Header/Header'; // Sửa lại đường dẫn import Header của bạn cho đúng
import Footer from '../../components/Footer/Footer'; // Sửa lại đường dẫn import Footer của bạn cho đúng
import { useAuth } from '../../context/AuthContext';

// --- TYPES ---
interface OrderItem {
  id: number;
  productName: string;
  image: string;
  category: string;
  price: number;
}

interface Order {
  id: string; 
  date: string;
  status: 'Completed' | 'Processing' | 'Cancelled';
  totalPrice: number;
  items: OrderItem[]; 
}

// --- MOCK DATA (Source Code style) ---
const MOCK_SOURCE_CODE_ORDERS: Order[] = [
  {
    id: "ORD-882910",
    date: "12/05/2024",
    status: "Completed",
    totalPrice: 1590000,
    items: [
      {
        id: 1,
        productName: "E-commerce UI Kit Pro",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426",
        category: "UI Kit",
        price: 890000
      },
      {
        id: 2,
        productName: "React Admin Dashboard",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2370",
        category: "Template",
        price: 700000
      }
    ]
  },
  {
    id: "ORD-882911",
    date: "25/04/2024",
    status: "Completed",
    totalPrice: 450000,
    items: [
      {
        id: 3,
        productName: "Flutter Food Delivery App",
        image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=2555",
        category: "Mobile App",
        price: 450000
      }
    ]
  },
  {
    id: "ORD-882912",
    date: "02/01/2025",
    status: "Processing",
    totalPrice: 2200000,
    items: [
      {
        id: 4,
        productName: "Banking System Backend (Java)",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2532",
        category: "Backend",
        price: 1200000
      },
      {
        id: 5,
        productName: "Figma iOS 17 Design System",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=2574",
        category: "Design",
        price: 500000
      },
      {
        id: 6,
        productName: "Portfolio Template Next.js",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=2555",
        category: "Web",
        price: 500000
      }
    ]
  }
];

const UserProfilePage = () => {
  // 1. Lấy thêm isLoading từ Context để xử lý
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // 2. Logic Redirect an toàn
  useEffect(() => {
    // Chỉ redirect khi ĐÃ load xong (isLoading = false) VÀ chưa đăng nhập
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, navigate]);

  const formatCurrency = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // 3. Màn hình Loading (Hiển thị khi đang check localStorage)
  if (isLoading) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#f5f5f7'
      }}>
        <Loader2 className="animate-spin" size={40} color="#86868b" />
      </div>
    );
  }

  // 4. Nếu load xong mà vẫn không có user (thường useEffect đã đẩy đi rồi, nhưng check cho an toàn TypeScript)
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

        <div className="orders-grid">
          {MOCK_SOURCE_CODE_ORDERS.map((order) => (
            <div key={order.id} className="order-card">
              
              {/* Card Header: Order Info */}
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
                {order.items.slice(0, 3).map((item) => (
                  <div key={item.id} className="item-thumbnail-wrapper" title={item.productName}>
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
                
                {/* Chỉ hiện phone nếu có */}
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