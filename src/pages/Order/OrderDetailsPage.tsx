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

interface OrderItem {
  id: number;
  productName: string;
  image: string;
  price: number;
  quantity: number;
  downloadUrl?: string; // Link tải thật (nếu có)
}

interface OrderDetail {
  id: string | number;
  date: string;
  status: string;
  paymentMethod: string;
  totalPrice: number;
  customerName: string;
  email: string;
  items: OrderItem[];
}

const OrderDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // State để theo dõi xem sản phẩm nào đang được tải (để hiện loading xoay vòng)
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3001/orders/${id}`);
        if (!response.ok) throw new Error('Không tìm thấy đơn hàng.');
        const data = await response.json();
        setOrder(data);
      } catch (err) {
        console.error(err);
        setError('Không thể tải thông tin đơn hàng.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const formatCurrency = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // --- HÀM XỬ LÝ DOWNLOAD ---
  const handleDownload = (item: OrderItem) => {
    // 1. Bật trạng thái loading cho item này
    setDownloadingId(item.id);

    // Giả lập độ trễ mạng (1.5s) cho giống thật
    setTimeout(() => {
      if (item.downloadUrl) {
        // A. NẾU CÓ LINK THẬT: Mở link tải
        const link = document.createElement('a');
        link.href = item.downloadUrl;
        link.download = `${item.productName}.zip`; // Gợi ý tên file
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // B. NẾU KHÔNG CÓ LINK (DEMO): Tạo file giả bằng Blob
        // Tạo nội dung file text giả lập source code
        const fileContent = `
          DỰ ÁN: ${item.productName}
          PHIÊN BẢN: v1.0.0
          LICENSE: Personal Use
          
          Cảm ơn bạn đã mua hàng tại CodeStore!
          Đây là file demo. Trong dự án thực tế, đây sẽ là file .zip chứa source code.
        `;

        // Tạo file ảo
        const blob = new Blob([fileContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);

        // Kích hoạt tải xuống
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${item.productName.replace(/\s+/g, '_')}_Source.txt`); // Tên file tải về
        document.body.appendChild(link);
        link.click();

        // Dọn dẹp
        link.parentNode?.removeChild(link);
        window.URL.revokeObjectURL(url);
      }

      // Tắt trạng thái loading
      setDownloadingId(null);
    }, 1500);
  };

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f5f7' }}>
        <Loader2 className="animate-spin" size={40} color="#86868b" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f5f7' }}>
        <div style={{ textAlign: 'center' }}>
          <AlertCircle size={50} color="#ff3b30" style={{ marginBottom: 20, margin: '0 auto', display: 'block' }} />
          <h2 style={{ marginBottom: 10 }}>Đã có lỗi xảy ra</h2>
          <button onClick={() => navigate('/profile')} style={{ padding: '10px 20px', borderRadius: 8, border: 'none', background: '#0071e3', color: 'white', cursor: 'pointer' }}>
            Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="order-details-page">
      {/* --- PHẦN NÀY CHỈ HIỆN KHI IN (Logo Shop & Thông tin) --- */}
      <div className="invoice-print-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 'bold', margin: 0 }}>CODE STORE.</h1>
            <p style={{ fontSize: 12, color: '#666' }}>Giải pháp Source Code chất lượng cao</p>
          </div>
          <div style={{ textAlign: 'right', fontSize: 12, color: '#666' }}>
            <p>Hotline: 0909.565.204</p>
            <p>Email: support@codestore.com</p>
            <p>Website: www.codestore.vn</p>
          </div>
        </div>
        <hr style={{ border: 'none', borderTop: '1px solid #ddd', marginBottom: 30 }} />
      </div>
      {/* -------------------------------------------------------- */}
      <Header />

      <div className="order-container animate-enter">
        <div className="back-nav">
          <div className="back-link" onClick={() => navigate('/profile')}>
            <ChevronLeft size={16} /> Quay lại danh sách đơn hàng
          </div>
        </div>

        <div className="order-header-block">
          <div className="order-title">
            <h1>Order #{order.id}</h1>
            <div className="order-subtitle">Đặt ngày {order.date}</div>
          </div>
          <div className="order-actions-top">
            <button className="btn-secondary" onClick={() => window.print()}>
              <Printer size={16} /> In hóa đơn
            </button>
          </div>
        </div>

        <div className="status-bar">
          <div className="status-dot"></div>
          <div style={{ flex: 1 }}>
            <span className="status-text">{order.status}</span>
            <span style={{ margin: '0 8px', color: '#ccc' }}>|</span>
            <span style={{ color: '#86868b', fontSize: 14 }}>Đã gửi tới {order.email}</span>
          </div>
          <CheckCircle2 size={20} color="#008800" />
        </div>

        <div className="order-content-layout">
          <div className="left-column">
            <div className="apple-card">
              <div className="card-title">Sản phẩm đã mua</div>

              {order.items.map((item, index) => (
                <div key={index} className="product-item-row">
                  <img src={item.image} alt={item.productName} className="product-thumb" />

                  <div className="product-info">
                    <div className="product-name">{item.productName}</div>
                    <div className="product-meta">
                      <span className="license-badge">STANDARD</span> v1.0.0
                    </div>

                    <div className="download-action">
                      {/* NÚT DOWNLOAD ĐƯỢC CẬP NHẬT */}
                      <a
                        href="#"
                        className="link-action"
                        onClick={(e) => {
                          e.preventDefault();
                          if (downloadingId !== item.id) handleDownload(item);
                        }}
                        style={{
                          opacity: downloadingId === item.id ? 0.7 : 1,
                          cursor: downloadingId === item.id ? 'wait' : 'pointer'
                        }}
                      >
                        {downloadingId === item.id ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Download size={14} />
                        )}
                        {downloadingId === item.id ? ' Đang tải...' : ' Tải Source Code'}
                      </a>

                      <span className="link-action" onClick={() => alert(`License Key: XXXX-${item.id}-KEY`)}>
                        <Key size={14} /> License Key
                      </span>
                    </div>
                  </div>

                  <div className="product-price">
                    {formatCurrency(item.price)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="right-column">
            <div className="apple-card">
              <div className="card-title">Tóm tắt</div>
              <div className="summary-total">
                <span className="total-label">Tổng cộng</span>
                <span className="total-amount">{formatCurrency(order.totalPrice)}</span>
              </div>
              <div style={{ marginTop: 20 }}>
                <h4>Thanh toán</h4>
                <p style={{ color: '#666' }}>{order.paymentMethod}</p>
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