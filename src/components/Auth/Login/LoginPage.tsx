import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Auth.css'; // File CSS mới
import { ArrowRight } from 'lucide-react';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import '../../../app/App.css'

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorShake, setErrorShake] = useState(false); // State để kích hoạt rung

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    // Nếu rỗng, kích hoạt hiệu ứng rung
    if (!email) {
      setErrorShake(true);
      setTimeout(() => setErrorShake(false), 400); // Tắt rung sau 0.4s
      return;
    }

    setLoading(true);
    // Giả lập chuyển trang sau 1s
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 1200);
  };

  const isActive = isFocused || email.length > 0;
  const isValid = email.length > 0;

  return (
    <div className="auth-container">
      
      {/* Header Component */}
      <Header />

      {/* Nội dung chính */}
      <div className="auth-content">
        
        {/* Tiêu đề: Staggered Animation 1 */}
        <div className="animate-enter delay-1">
          <h1 className="auth-title tag-gradient" >Đăng nhập CodeStore.</h1>
          <h2 className="auth-subtitle">Trải nghiệm mua sắm source code nhanh chóng.</h2>
        </div>

        <form onSubmit={handleSubmit} className="animate-enter delay-2">
          <div className="apple-input-group">
            {/* Input Wrapper: Thêm class 'shake' nếu có lỗi */}
            <div className={`apple-input-wrapper ${isFocused ? 'focused' : ''} ${isActive ? 'active' : ''} ${isValid ? 'valid' : ''} ${errorShake ? 'shake' : ''}`}>
              
              <label className="apple-label">Email hoặc Số điện thoại</label>
              
              <input 
                type="text" 
                className="apple-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />

              <button 
                type="submit" 
                className="btn-arrow-submit" 
                disabled={loading} // Cho phép bấm để test hiệu ứng Shake, logic chặn ở handleSubmit
                onClick={handleSubmit} // Đảm bảo click vào nút cũng submit
              >
                {loading ? (
                   <div style={{width: 16, height: 16, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', animation: 'spin 0.8s linear infinite'}}><svg viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3.98047 3.51001C1.43047 4.39001 0.980469 9.09992 0.980469 12.4099C0.980469 15.7199 1.41047 20.4099 3.98047 21.3199C6.69047 22.2499 14.9805 16.1599 14.9805 12.4099C14.9805 8.65991 6.69047 2.58001 3.98047 3.51001Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M23 5.92004C23 4.53933 21.8807 3.42004 20.5 3.42004C19.1193 3.42004 18 4.53933 18 5.92004V18.92C18 20.3008 19.1193 21.42 20.5 21.42C21.8807 21.42 23 20.3008 23 18.92V5.92004Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></div>
                ) : (
                   <ArrowRight size={20} strokeWidth={2.5} />
                )}
              </button>

            </div>
          </div>

          <div className="auth-options">
            <label className="checkbox-wrapper" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer'}}>
              <input type="checkbox" style={{width: 16, height: 16, accentColor: '#0071e3'}} />
              <span style={{fontSize: '15px', color: '#1d1d1f'}}>Ghi nhớ đăng nhập</span>
            </label>

            <div className="auth-links">
              <a href="#" className="link-blue">
                Quên mật khẩu? <span className="link-icon">↗</span>
              </a>
              <div>
                 Chưa có tài khoản? 
                 <a href="/register" className="link-blue" style={{marginLeft: '5px'}}>
                   Tạo tài khoản CodeStore <span className="link-icon">↗</span>
                 </a>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Footer Component */}
      <Footer />

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default LoginPage;