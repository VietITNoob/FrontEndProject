import React from 'react';
import './Footer.css';

const Footer = () => {
  // Dữ liệu cấu trúc cột
  const columns = [
    {
      sections: [
        {
          title: "Khám phá & Mua sắm",
          links: ["Source Code Web", "Mobile Apps", "UI Kits", "Plugins", "Hàng mới về", "Flash Sale"]
        }
      ]
    },
    {
      sections: [
        {
          title: "Tài khoản",
          links: ["Quản lý đơn hàng", "Tải xuống", "Yêu thích", "Cài đặt tài khoản"]
        },
        {
          title: "Dành cho Partner",
          links: ["Đăng bán Source Code", "Chính sách hoa hồng", "Cổng thông tin"]
        }
      ]
    },
    {
      sections: [
        {
          title: "CodeStore Wallet",
          links: ["Ví điện tử", "Nạp tiền", "Lịch sử giao dịch"]
        },
        {
          title: "Hỗ trợ Kỹ thuật",
          links: ["Hướng dẫn cài đặt", "Community Forum", "Ticket Support"]
        }
      ]
    },
    {
      sections: [
        {
          title: "Về CodeStore",
          links: ["Câu chuyện thương hiệu", "Tuyển dụng", "Tin tức", "Liên hệ"]
        },
        {
          title: "Khách hàng Doanh nghiệp",
          links: ["CodeStore for Business", "Mua giấy phép sỉ"]
        }
      ]
    }
  ];

  return (
    <footer className="apple-footer">
      <div className="footer-content">
        
        {/* PHẦN 1: GHI CHÚ TRÊN CÙNG */}
        <div className="footer-notes">
          <p>
            1. Giá trị Source Code chưa bao gồm VAT (nếu có). Vui lòng tham khảo chính sách thuế.
          </p>
          <p>
            2. Cam kết hoàn tiền trong 7 ngày nếu mã nguồn lỗi kỹ thuật không thể khắc phục. 
            <a href="#"> Xem chính sách hoàn tiền.</a>
          </p>
          <p>
            * Một số hình ảnh demo sử dụng tài nguyên miễn phí từ Unsplash.
          </p>
        </div>

        {/* PHẦN 2: CÁC CỘT LIÊN KẾT */}
        <div className="footer-links">
          {columns.map((col, colIndex) => (
            <div key={colIndex} className="footer-column">
              {col.sections.map((section, secIndex) => (
                <div key={secIndex} className="column-section">
                  <span className="column-title">{section.title}</span>
                  <ul className="column-list">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex} className="column-item">
                        <a href="#" className="column-link">{link}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* PHẦN 3: DƯỚI CÙNG (LEGAL & LOCALE) */}
        <div className="footer-bottom">
          <div className="footer-legal">
            <div className="copyright">
              Bản quyền © 2024 CodeStore Inc. Bảo lưu mọi quyền.
            </div>
            <ul className="legal-links">
              <li><a href="#" className="legal-link">Chính sách quyền riêng tư</a></li>
              <li><a href="#" className="legal-link">Điều khoản sử dụng</a></li>
              <li><a href="#" className="legal-link">Bán hàng và Hoàn tiền</a></li>
              <li><a href="#" className="legal-link">Pháp lý</a></li>
              <li><a href="#" className="legal-link">Sơ đồ trang</a></li>
            </ul>
          </div>
          
          <div className="footer-locale">
            <span>Việt Nam</span>
             {/* Đường kẻ dọc ngăn cách */}
             <span style={{margin: '0 5px', color: '#d2d2d7'}}>|</span> 
            <span>Tiếng Việt</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;