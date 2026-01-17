import '../Auth.css';
import { ArrowRight, Edit2 } from 'lucide-react';

import { useLogin } from './useLogin'; // Hook Logic
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';


const LoginPage = () => {
  // 1. Lấy data và logic từ Custom Hook
  const {
    step,
    email, setEmail,
    password, setPassword,
    isFocused, setIsFocused,
    loading,
    errorShake,
    isEmailValid,
    isPasswordValid,
    inputRef,
    passwordRef,
    handleSubmit,
    handleEditEmail
  } = useLogin();

  // 2. Component nút mũi tên (View only)
  const ArrowButton = ({ isValid }: { isValid: boolean }) => (
    <button 
      type="submit" 
      className="btn-arrow-submit" 
      disabled={!isValid || loading}
      onClick={handleSubmit}
    >
      {loading ? (
          <div className="spinner-loading"></div> // Nhớ CSS cho class này (border-radius 50%, xoay vòng)
      ) : (
          <ArrowRight size={20} strokeWidth={2.5} />
      )}
    </button>
  );

  return (
    <div className="auth-container">
      <Header />

      <div className="auth-content">
        <div className="animate-enter delay-1">
          <h1 className="auth-title tag-gradient">
            {step === 'email' ? 'Đăng nhập CodeStore.' : 'Nhập mật khẩu.'}
          </h1>
          <h2 className="auth-subtitle">Trải nghiệm mua sắm source code nhanh chóng.</h2>
        </div>

        <form onSubmit={handleSubmit} className="animate-enter delay-2">
          
          <div className="apple-input-group">
            
            {/* INPUT EMAIL */}
            <div className={`apple-input-wrapper ${isFocused === 'email' ? 'focused' : ''} ${email.length > 0 ? 'active' : ''} ${step === 'email' && isEmailValid ? 'valid' : ''} ${errorShake && step === 'email' ? 'shake' : ''} ${step === 'password' ? 'dimmed' : ''}`}>
              <label className="apple-label">Email hoặc Số điện thoại</label>
              <input 
                ref={inputRef}
                type="text" 
                className="apple-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocused('email')}
                onBlur={() => setIsFocused(null)}
                disabled={step === 'password'} 
              />
              {step === 'email' && <ArrowButton isValid={isEmailValid} />}
            </div>

            {/* INPUT PASSWORD (Slide Down) */}
            <div className={`password-expand-wrapper ${step === 'password' ? 'open' : ''}`}>
              <div className={`apple-input-wrapper ${isFocused === 'password' ? 'focused' : ''} ${password.length > 0 ? 'active' : ''} ${isPasswordValid ? 'valid' : ''} ${errorShake && step === 'password' ? 'shake' : ''}`}>
                <label className="apple-label">Mật khẩu</label>
                <input 
                  ref={passwordRef}
                  type="password" 
                  className="apple-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsFocused('password')}
                  onBlur={() => setIsFocused(null)}
                />
                {step === 'password' && <ArrowButton isValid={isPasswordValid} />}
              </div>
            </div>

          </div>

          {/* OPTIONS & LINKS (Đã gộp gọn gàng) */}
          <div className="auth-options">
            
            {/* Nếu đang ở bước Password -> Hiện nút Sửa Email */}
            {step === 'password' ? (
               <div style={{textAlign: 'center', marginBottom: 15}}>
                  <span style={{fontSize: 14, color: '#6e6e73'}}>Đang đăng nhập: <b>{email}</b></span> 
                  <button 
                    type="button" 
                    onClick={handleEditEmail} 
                    style={{border:'none', background:'none', color:'#0071e3', cursor:'pointer', marginLeft: 5, display: 'inline-flex', alignItems: 'center', gap: 4}}
                  >
                    <Edit2 size={12}/> Sửa
                  </button>
               </div>
            ) : (
                /* Nếu đang ở bước Email -> Hiện Checkbox Ghi nhớ */
                <label className="checkbox-wrapper" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', marginBottom: 15}}>
                  <input type="checkbox" style={{width: 16, height: 16, accentColor: '#0071e3'}} />
                  <span style={{fontSize: '15px', color: '#1d1d1f'}}>Ghi nhớ đăng nhập</span>
                </label>
            )}

            {/* Links chung */}
            <div className="auth-links">
              <a href="/forgot" className="link-blue">
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
      <Footer />
    </div>
  );
};

export default LoginPage;