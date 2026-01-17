import React, { useState } from 'react'; // Import React để dùng JSX
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, CheckCircle2, Mail, AlertCircle } from 'lucide-react';


// Import Hook vừa tạo
import { useForgotPassword } from './useForgotPassword';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';

const ForgotPasswordPage = () => {
  // Gọi Hook ra dùng
  const {
    email,
    setEmail,
    loading,
    isSubmitted,
    error,
    isValidEmail,
    handleResetPassword,
    handleRetry
  } = useForgotPassword();

  // State cục bộ chỉ dùng cho UI (hiệu ứng focus input)
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="auth-container">
      <Header />

      <div className="auth-content">
        
        {/* TRẠNG THÁI 1: FORM NHẬP EMAIL */}
        {!isSubmitted ? (
          <>
            <div className="animate-enter delay-1">
              <h1 className="auth-title tag-gradient">Khôi phục tài khoản.</h1>
              <h2 className="auth-subtitle">
                Nhập email của bạn để nhận liên kết đặt lại mật khẩu.
              </h2>
            </div>

            <form onSubmit={handleResetPassword} className="animate-enter delay-2">
              <div className="apple-input-group">
                {/* Class shake nếu có lỗi */}
                <div className={`apple-input-wrapper ${isFocused ? 'focused' : ''} ${email.length > 0 ? 'active' : ''} ${isValidEmail ? 'valid' : ''} ${error ? 'shake' : ''}`}>
                  <label className="apple-label">Email đăng ký</label>
                  <input 
                    type="email" 
                    className="apple-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    disabled={loading}
                  />
                  
                  {/* Nút Submit */}
                  <button 
                    type="submit" 
                    className="btn-arrow-submit" 
                    disabled={!isValidEmail || loading}
                  >
                    {loading ? (
                        <div className="spinner-loading"></div>
                    ) : (
                        <ArrowRight size={20} strokeWidth={2.5} />
                    )}
                  </button>
                </div>
              </div>

              {/* Hiển thị lỗi nếu có */}
              {error && (
                <div className="error-message animate-enter" style={{color: '#ff3b30', marginTop: 15, display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, justifyContent: 'center'}}>
                  <AlertCircle size={16} /> {error}
                </div>
              )}

              <div className="auth-options" style={{justifyContent: 'center', marginTop: 30}}>
                <Link to="/login" className="link-blue back-link">
                  <ChevronLeft size={16} /> Quay lại đăng nhập
                </Link>
              </div>
            </form>
          </>
        ) : (
          /* TRẠNG THÁI 2: THÔNG BÁO THÀNH CÔNG */
          <div className="success-state animate-enter">
            <div className="success-icon-wrapper">
               <Mail size={48} className="success-icon" />
               <div className="success-check"><CheckCircle2 size={20} fill="#34c759" color="white"/></div>
            </div>
            
            <h1 className="auth-title" style={{fontSize: 32}}>Đã gửi email!</h1>
            <p className="auth-subtitle" style={{maxWidth: 400, margin: '10px auto'}}>
              Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến <b>{email}</b>.
              <br/>Vui lòng kiểm tra hộp thư (bao gồm cả mục Spam).
            </p>

            <div style={{marginTop: 40}}>
               <Link to="/login" className="btn-primary-outline">
                 Quay lại đăng nhập
               </Link>
            </div>
            
            <div style={{marginTop: 20}}>
               <button 
                 onClick={handleRetry} 
                 className="link-blue" 
                 style={{background: 'none', border: 'none', cursor: 'pointer', fontSize: 15}}
               >
                 Gửi lại bằng email khác
               </button>
            </div>
          </div>
        )}

      </div>
      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;