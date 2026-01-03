import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './OrderDetails.css'; // Import CSS
import { 
  ChevronLeft, 
  Download, 
  FileText, 
  Printer, 
  HelpCircle, 
  Key,
  CheckCircle2
} from 'lucide-react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';


// Interface cho chi tiết đơn hàng
interface ProductDetail {
  id: number;
  name: string;
  image: string;
  price: number;
  licenseType: string; // 'Personal' | 'Commercial'
  version: string;
  downloadUrl: string;
  licenseKey?: string;
}

interface OrderDetail {
  id: string;
  date: string;
  status: string;
  paymentMethod: string;
  subtotal: number;
  discount: number;
  total: number;
  customerName: string;
  email: string;
  items: ProductDetail[];
}

// MOCK DATA: Chi tiết đơn hàng Source Code
const MOCK_ORDER_DETAIL: OrderDetail = {
  id: "ORD-882910",
  date: "May 12, 2024",
  status: "Completed",
  paymentMethod: "Apple Pay (Visa ...4242)",
  subtotal: 1690000,
  discount: 100000,
  total: 1590000,
  customerName: "Vũ Nguyễn",
  email: "vufit2004@icloud.com",
  items: [
    {
      id: 1,
      name: "E-commerce UI Kit Pro",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426",
      price: 890000,
      licenseType: "Commercial License",
      version: "v2.4.0",
      downloadUrl: "#",
      licenseKey: "XXXX-YYYY-ZZZZ-AAAA"
    },
    {
      id: 2,
      name: "React Admin Dashboard Template",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2370",
      price: 800000,
      licenseType: "Personal License",
      version: "v1.1.5",
      downloadUrl: "#"
    }
  ]
};

const OrderDetailsPage = () => {
  const { id } = useParams(); // Lấy ID từ URL (nếu có routing thật)
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderDetail | null>(null);

  // Giả lập fetch data
  useEffect(() => {
    // Trong thực tế: call API `/orders/${id}`
    setTimeout(() => {
      setOrder(MOCK_ORDER_DETAIL);
    }, 500); 
  }, [id]);

  const formatCurrency = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  if (!order) return <div style={{padding: 50, textAlign: 'center'}}>Loading Order Details...</div>;

  return (
    <div className="order-details-page">
      <Header />

      <div className="order-container animate-enter">
        {/* --- NAVIGATION --- */}
        <div className="back-nav">
          <div className="back-link" onClick={() => navigate('/profile')}>
            <ChevronLeft size={16} />
            Back to Orders
          </div>
        </div>

        {/* --- HEADER --- */}
        <div className="order-header-block">
          <div className="order-title">
            <h1>Order #{order.id}</h1>
            <div className="order-subtitle">Placed on {order.date}</div>
          </div>
          <div className="order-actions-top">
             <button className="btn-secondary">
                <Printer size={16} /> Print Invoice
             </button>
             <button className="btn-secondary">
                <HelpCircle size={16} /> Get Support
             </button>
          </div>
        </div>

        {/* --- STATUS BAR --- */}
        <div className="status-bar">
           <div className="status-dot"></div>
           <div style={{flex: 1}}>
              <span className="status-text">{order.status}</span>
              <span style={{margin: '0 8px', color: '#ccc'}}>|</span>
              <span style={{color: '#86868b', fontSize: 14}}>Email confirmation sent to {order.email}</span>
           </div>
           <CheckCircle2 size={20} color="#008800" />
        </div>

        {/* --- MAIN CONTENT (2 Columns) --- */}
        <div className="order-content-layout">
          
          {/* COLUMN LEFT: PRODUCTS LIST */}
          <div className="left-column">
             <div className="apple-card">
                <div className="card-title">Items Ordered</div>
                
                {order.items.map((item) => (
                   <div key={item.id} className="product-item-row">
                      <img src={item.image} alt={item.name} className="product-thumb" />
                      
                      <div className="product-info">
                         <div className="product-name">{item.name}</div>
                         <div className="product-meta">
                            <span className="license-badge">{item.licenseType === 'Commercial License' ? 'PRO' : 'STD'}</span>
                            {item.licenseType} • {item.version}
                         </div>
                         
                         {/* Action Buttons specific for Code Store */}
                         <div className="download-action">
                            <a href={item.downloadUrl} className="link-action">
                               <Download size={14} /> Download Source
                            </a>
                            {item.licenseKey && (
                                <span className="link-action" onClick={() => alert(`Your Key: ${item.licenseKey}`)}>
                                   <Key size={14} /> View License Key
                                </span>
                            )}
                            <a href="#" className="link-action">
                               <FileText size={14} /> Documentation
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
                <div className="card-title">Payment Summary</div>
                
                <div className="summary-row">
                   <span className="summary-label">Subtotal</span>
                   <span className="summary-value">{formatCurrency(order.subtotal)}</span>
                </div>
                <div className="summary-row">
                   <span className="summary-label">Discount</span>
                   <span className="summary-value" style={{color: '#008800'}}>-{formatCurrency(order.discount)}</span>
                </div>
                
                <div className="summary-total">
                   <span className="total-label">Total</span>
                   <span className="total-amount">{formatCurrency(order.total)}</span>
                </div>

                <div style={{marginTop: 20, paddingTop: 20, borderTop: '1px solid #f0f0f0'}}>
                    <div className="info-block">
                        <h4>Payment Method</h4>
                        <p>{order.paymentMethod}</p>
                    </div>
                </div>
             </div>

             <div className="apple-card" style={{marginTop: 20}}>
                <div className="card-title">Billing Information</div>
                <div className="info-block">
                    <h4>Billed To</h4>
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