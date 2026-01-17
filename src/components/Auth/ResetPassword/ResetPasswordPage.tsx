import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

import '../Auth/Auth.css'; // Dùng lại CSS cũ
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Lấy ID từ URL (ví dụ: ?id=1)
  const userId = searchParams.get('id');
  const userEmail = searchParams.get('email');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState<string | null>(null);

  // Validate
  const isMatch = password.length > 0 && password === confirmPassword;
  const isValidLength = password.length >= 6;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isMatch || !isValidLength || !userId) return;

    setLoading(true);
    setError('');

    try {
      // Gọi API custom vừa tạo ở server.js
      const response = await fetch('http://localhost:3001/reset-password-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: userId, 
          newPassword: password 
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        const data = await response.json();
        setError(data.error || 'Lỗi đổi mật khẩu.');
      }
    } catch (err) {
      setError('Lỗi kết nối server.');
    } finally {
      setLoading(false);
    }
  };

  if (!userId) {
    return <div style={{textAlign:'center', marginTop: 100}}>Link không hợp lệ.</div>;
  }

  return (
    <div className="auth-container">
      <Header />
      <div className="auth-content">
        
        {!isSuccess ? (
          <>
            <div className="animate-enter delay-1">
              <h1 className="auth-title tag-gradient">Mật khẩu mới.</h1>
              <h2 className="auth-subtitle">
                Tạo mật khẩu mới cho tài khoản <b>{userEmail}</b>.
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="animate-enter delay-2">
              <div className="apple-input-group">
                
                {/* Mật khẩu mới */}
                <div className={`apple-input-wrapper ${isFocused === 'pass' ? 'focused' : ''} ${password.length > 0 ? 'active' : ''}`}>
                  <label className="apple-label">Mật khẩu mới</label>
                  <input 
                    type={showPass ? "text" : "password"}
                    className="apple-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setIsFocused('pass')}
                    onBlur={() => setIsFocused(null)}
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="icon-eye-btn">
                     {showPass ? <EyeOff size={18}/> : <Eye size={18}/>}
                  </button>
                </div>

                {/* Xác nhận mật khẩu (Slide down animation) */}
                <div className={`password-expand-wrapper ${password.length > 0 ? 'open' : ''}`}>
                    <div className={`apple-input-wrapper ${isFocused === 'confirm' ? 'focused' : ''} ${isMatch ? 'valid' : ''}`}>
                    <label className="apple-label">Nhập lại mật khẩu</label>
                    <input 
                        type="password" 
                        className="apple-input"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onFocus={() => setIsFocused('confirm')}
                        onBlur={() => setIsFocused(null)}
                    />
                    
                    {/* Nút Submit */}
                    <button 
                        type="submit" 
                        className="btn-arrow-submit" 
                        disabled={!isMatch || !isValidLength || loading}
                    >
                        {loading ? <div className="spinner-loading"></div> : <ArrowRight size={20} />}
                    </button>
                    </div>
                </div>

              </div>
              
              {/* Validation Hints */}
              <div style={{marginTop: 15, fontSize: 13, color: '#86868b', paddingLeft: 10}}>
                <p style={{color: isValidLength ? '#34c759' : ''}}>• Tối thiểu 6 ký tự</p>
                <p style={{color: isMatch && password.length > 0 ? '#34c759' : ''}}>• Mật khẩu khớp nhau</p>
              </div>

              {error && <p style={{color: 'red', textAlign: 'center', marginTop: 10}}>{error}</p>}
            </form>
          </>
        ) : (
          /* TRẠNG THÁI THÀNH CÔNG */
          <div className="success-state animate-enter">
             <div className="success-icon-wrapper">
               <Lock size={48} className="success-icon" />
               <div className="success-check"><CheckCircle2 size={20} fill="#34c759" color="white"/></div>
            </div>
            <h1 className="auth-title">Thành công!</h1>
            <p className="auth-subtitle">Mật khẩu của bạn đã được cập nhật.</p>
            <div style={{marginTop: 30}}>
                <button onClick={() => navigate('/login')} className="btn-primary-outline" style={{background: '#1d1d1f', color: 'white', padding: '12px 40px'}}>
                    Đăng nhập ngay
                </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ResetPasswordPage;