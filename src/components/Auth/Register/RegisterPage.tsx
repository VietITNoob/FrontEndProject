import '../Auth.css';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import { ChevronDown, Loader2 } from 'lucide-react';
import { useRegister } from './useRegister'; // <--- Import Logic ở đây

const RegisterPage = () => {
    // Gọi Hook để lấy logic ra (giống tiêm Service trong Angular)
    const { 
        formData, 
        loading, 
        handleChange, 
        handleBirthdayChange, 
        handleRegister 
    } = useRegister();

    return (
        <div className="auth-container">
            <Header />

            <div className="auth-content" style={{ maxWidth: '980px' }}>
                <div className="register-header">
                    <h1 className="register-title">Tạo Tài Khoản Code Store</h1>
                    <p className="register-subtitle">
                        Một Tài Khoản Code Store là tất cả những gì bạn cần để truy cập mọi dịch vụ của Code Store. <br />
                        Đã có Tài Khoản? <a href="/login" className="link-blue" style={{ marginLeft: 5 }}>Đăng nhập tại đây &rsaquo;</a>
                    </p>
                </div>

                <form onSubmit={handleRegister}>
                    <div className="form-section-container">
                        
                        {/* --- HỌ TÊN --- */}
                        <div className="form-row">
                            <div className="form-col">
                                <div className="apple-input-wrapper">
                                    <input 
                                        type="text" className="apple-input" placeholder="Họ" 
                                        name="firstName" value={formData.firstName} onChange={handleChange} required
                                    />
                                </div>
                            </div>
                            <div className="form-col">
                                <div className="apple-input-wrapper">
                                    <input 
                                        type="text" className="apple-input" placeholder="Tên" 
                                        name="lastName" value={formData.lastName} onChange={handleChange} required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* --- QUỐC GIA --- */}
                        <div className="form-row" style={{ marginBottom: 0 }}>
                            <div className="section-label">QUỐC GIA / KHU VỰC</div>
                        </div>
                        <div className="form-row">
                            <div className="apple-select-wrapper" style={{ width: '100%' }}>
                                <select className="apple-select" name="country" value={formData.country} onChange={handleChange}>
                                    <option value="Vietnam">Việt Nam</option>
                                    <option value="United States">United States</option>
                                    <option value="Singapore">Singapore</option>
                                </select>
                                <ChevronDown size={16} className="apple-select-arrow" />
                            </div>
                        </div>

                        {/* --- NGÀY SINH --- */}
                        <div className="form-row" style={{ marginBottom: 0 }}>
                            <div className="section-label">NGÀY SINH</div>
                        </div>
                        <div className="form-row">
                            <div className="form-col">
                                <div className="apple-select-wrapper">
                                    <select className="apple-select" name="month" value={formData.birthday.month} onChange={handleBirthdayChange} required>
                                        <option value="" disabled>Tháng</option>
                                        {[...Array(12)].map((_, i) => <option key={i} value={i + 1}>Tháng {i + 1}</option>)}
                                    </select>
                                    <ChevronDown size={16} className="apple-select-arrow" />
                                </div>
                            </div>
                            <div className="form-col">
                                <div className="apple-select-wrapper">
                                    <select className="apple-select" name="day" value={formData.birthday.day} onChange={handleBirthdayChange} required>
                                        <option value="" disabled>Ngày</option>
                                        {[...Array(31)].map((_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}
                                    </select>
                                    <ChevronDown size={16} className="apple-select-arrow" />
                                </div>
                            </div>
                            <div className="form-col">
                                <div className="apple-select-wrapper">
                                    <select className="apple-select" name="year" value={formData.birthday.year} onChange={handleBirthdayChange} required>
                                        <option value="" disabled>Năm</option>
                                        {[...Array(100)].map((_, i) => <option key={i} value={2024 - i}>{2024 - i}</option>)}
                                    </select>
                                    <ChevronDown size={16} className="apple-select-arrow" />
                                </div>
                            </div>
                        </div>

                        <div className="form-divider"></div>

                        {/* --- EMAIL & PASSWORD --- */}
                        <div className="apple-input-group">
                            <div className="apple-input-wrapper" style={{ marginBottom: 20 }}>
                                <input 
                                    type="email" className="apple-input" placeholder="name@example.com" 
                                    name="email" value={formData.email} onChange={handleChange} required
                                />
                                <span style={{ position: 'absolute', right: 16, fontSize: 12, color: '#86868b' }}>Đây sẽ là ID mới của bạn.</span>
                            </div>

                            <div className="apple-input-wrapper" style={{ marginBottom: 20 }}>
                                <input 
                                    type="password" className="apple-input" placeholder="Mật khẩu" 
                                    name="password" value={formData.password} onChange={handleChange} required
                                />
                            </div>

                            <div className="apple-input-wrapper">
                                <input 
                                    type="password" className="apple-input" placeholder="Xác nhận mật khẩu" 
                                    name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required
                                />
                            </div>
                        </div>

                        <div className="form-divider"></div>

                        {/* --- PHONE --- */}
                        <div className="form-row" style={{ marginBottom: 0 }}>
                            <div className="section-label">SỐ ĐIỆN THOẠI</div>
                        </div>
                        <div className="form-row">
                            <div style={{ flex: '0 0 100px' }}>
                                <div className="apple-select-wrapper">
                                    <select className="apple-select" defaultValue="+84">
                                        <option value="+84">+84 (VN)</option>
                                        <option value="+1">+1 (US)</option>
                                    </select>
                                    <ChevronDown size={16} className="apple-select-arrow" />
                                </div>
                            </div>
                            <div className="form-col">
                                <div className="apple-input-wrapper">
                                    <input 
                                        type="tel" className="apple-input" placeholder="Số điện thoại" 
                                        name="phone" value={formData.phone} onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="radio-group" style={{marginTop: 20}}>
                            <label className="radio-item">
                                <input type="radio" name="verifyMethod" value="sms" 
                                    checked={formData.verifyMethod === 'sms'} onChange={handleChange} className="radio-input" 
                                />
                                <span className="radio-label">Tin nhắn văn bản</span>
                            </label>
                            <label className="radio-item">
                                <input type="radio" name="verifyMethod" value="call" 
                                    checked={formData.verifyMethod === 'call'} onChange={handleChange} className="radio-input" 
                                />
                                <span className="radio-label">Cuộc gọi điện thoại</span>
                            </label>
                        </div>

                        <div className="form-divider"></div>

                        {/* --- CAPTCHA --- */}
                        <div className="section-label">NHẬP KÝ TỰ TRONG ẢNH</div>
                        <div className="captcha-container">
                            <div className="captcha-image">XK49</div>
                            <div className="apple-input-wrapper" style={{ flex: 1, border: 'none', height: 40 }}>
                                <input 
                                    type="text" className="apple-input" placeholder="Nhập mã" style={{ padding: '0 10px' }} 
                                    name="captcha" value={formData.captcha} onChange={handleChange} required
                                />
                            </div>
                        </div>

                        {/* --- BUTTON SUBMIT --- */}
                        <div style={{ textAlign: 'center', marginBottom: 60, marginTop: 40 }}>
                            <button type="submit" className="btn-continue" disabled={loading}>
                                {loading ? (
                                    <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap: 10}}>
                                        <Loader2 className="animate-spin" size={20} /> Đang xử lý...
                                    </div>
                                ) : (
                                    "Tiếp tục"
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    );
};

export default RegisterPage;