import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './OrderDetails.css'; 
import { 
  ChevronLeft, 
  Download, 
  FileText, 
  Printer, 
  HelpCircle, 
  Key,
  CheckCircle2,
  Loader2,
  AlertCircle
} from 'lucide-react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

// 1. Cập nhật Interface khớp với dữ liệu trong db.json
interface OrderItem {
  id: number;
  productName: string; // Trong db.json lưu là productName
  image: string;
  price: number;
  quantity: number;
  // Các trường dưới này DB đơn giản chưa có, ta sẽ tự generate khi render
  licenseType?: string; 
  version?: string;
  downloadUrl?: string;
  licenseKey?: string;
}

interface OrderDetail {
  id: string | number;
  date: string;
  status: string;
  paymentMethod: string;
  totalPrice: number; // DB lưu totalPrice
  customerName: string;
  email: string;
  items: OrderItem[];
}

const OrderDetailsPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  // State
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 2. Fetch API lấy chi tiết đơn hàng
  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3001/orders/${id}`);
        
        if (!response.ok) {
          throw new Error('Không tìm thấy đơn hàng.');
        }

        const data = await response.json();
        setOrder(data);
      } catch (err) {
        console.error(err);
        setError('Không thể tải thông tin đơn hàng hoặc đơn hàng không tồn tại.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const formatCurrency = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // --- TRƯỜNG HỢP LOADING ---
  if (loading) {
    return (
      <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f5f7'}}>
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap: 10}}>
          <Loader2 className="animate-spin" size={40} color="#86868b"/>
          <span style={{color: '#86868b'}}>Đang tải chi tiết đơn hàng...</span>
        </div>
      </div>
    );
  }

  // --- TRƯỜNG HỢP LỖI ---
  if (error || !order) {
    return (
      <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f5f7'}}>
        <div style={{textAlign: 'center'}}>
           <AlertCircle size={50} color="#ff3b30" style={{marginBottom: 20, margin:'0 auto', display:'block'}}/>
           <h2 style={{marginBottom: 10}}>Đã có lỗi xảy ra</h2>
           <p style={{color: '#86868b', marginBottom: 20}}>{error}</p>
           <button onClick={() => navigate('/profile')} style={{padding: '10px 20px', borderRadius: 8, border: 'none', background: '#0071e3', color: 'white', cursor: 'pointer'}}>
             Quay lại danh sách
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-details-page">
      <Header />

      <div className="order-container animate-enter">
        {/* --- NAVIGATION --- */}
        <div className="back-nav">
          <div className="back-link" onClick={() => navigate('/profile')}>
            <ChevronLeft size={16} />
            Quay lại danh sách đơn hàng
          </div>
        </div>

        {/* --- HEADER --- */}
        <div className="order-header-block">
          <div className="order-title">
            <h1>Order #{order.id}</h1>
            <div className="order-subtitle">Đặt ngày {order.date}</div>
          </div>
          <div className="order-actions-top">
             <button className="btn-secondary" onClick={() => window.print()}>
                <Printer size={16} /> In hóa đơn
             </button>
             <button className="btn-secondary">
                <HelpCircle size={16} /> Hỗ trợ
             </button>
          </div>
        </div>

        {/* --- STATUS BAR --- */}
        <div className="status-bar">
           <div className="status-dot"></div>
           <div style={{flex: 1}}>
              <span className="status-text">{order.status}</span>
              <span style={{margin: '0 8px', color: '#ccc'}}>|</span>
              <span style={{color: '#86868b', fontSize: 14}}>Xác nhận đã gửi tới {order.email}</span>
           </div>
           <CheckCircle2 size={20} color="#008800" />
        </div>

        {/* --- MAIN CONTENT (2 Columns) --- */}
        <div className="order-content-layout">
          
          {/* COLUMN LEFT: PRODUCTS LIST */}
          <div className="left-column">
             <div className="apple-card">
                <div className="card-title">Sản phẩm đã mua</div>
                
                {order.items.map((item, index) => (
                   <div key={index} className="product-item-row">
                      <img src={item.image} alt={item.productName} className="product-thumb" />
                      
                      <div className="product-info">
                         <div className="product-name">{item.productName}</div>
                         <div className="product-meta">
                            {/* Vì DB chưa có LicenseType, ta giả lập hiển thị */}
                            <span className="license-badge">STANDARD</span>
                            Personal License • v1.0.0
                         </div>
                         
                         {/* Action Buttons specific for Code Store */}
                         <div className="download-action">
                            <a href="#" className="link-action" onClick={(e) => e.preventDefault()}>
                               <Download size={14} /> Tải Source Code
                            </a>
                            <span className="link-action" onClick={() => alert(`License Key Giả Lập: XXXX-${item.id}-AAAA-BBBB`)}>
                                <Key size={14} /> Xem License Key
                            </span>
                            <a href="#" className="link-action">
                               <FileText size={14} /> Tài liệu
                            </a>
                         </div>
                      </div>

                      <div className="product-price">
                         {formatCurrency(item.price)}
                      </div>
                   </div>
                ))}
             </div>
          </div>

          {/* COLUMN RIGHT: SUMMARY & BILLING */}
          <div className="right-column">
             <div className="apple-card">
                <div className="card-title">Tóm tắt thanh toán</div>
                
                <div className="summary-row">
                   <span className="summary-label">Tạm tính</span>
                   {/* Giả sử không có discount, subtotal = total */}
                   <span className="summary-value">{formatCurrency(order.totalPrice)}</span>
                </div>
                <div className="summary-row">
                   <span className="summary-label">Giảm giá</span>
                   <span className="summary-value" style={{color: '#008800'}}>-{formatCurrency(0)}</span>
                </div>
                
                <div className="summary-total">
                   <span className="total-label">Tổng cộng</span>
                   <span className="total-amount">{formatCurrency(order.totalPrice)}</span>
                </div>

                <div style={{marginTop: 20, paddingTop: 20, borderTop: '1px solid #f0f0f0'}}>
                    <div className="info-block">
                        <h4>Phương thức thanh toán</h4>
                        <p>{order.paymentMethod}</p>
                    </div>
                </div>
             </div>

             <div className="apple-card" style={{marginTop: 20}}>
                <div className="card-title">Thông tin khách hàng</div>
                <div className="info-block">
                    <h4>Người nhận</h4>
                    <p>{order.customerName}</p>
                    <p style={{color: '#86868b', fontSize: 13, marginTop: 4}}>{order.email}</p>
                </div>
             </div>
          </div>

        </div>

      </div>
      
      <Footer />
    </div>
  );
};

export default OrderDetailsPage;