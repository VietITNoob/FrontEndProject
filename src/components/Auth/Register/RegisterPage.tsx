import React, { useState } from 'react';
import '../Auth.css'; // Dùng chung CSS với Login nhưng có thêm phần mới
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import { ChevronDown, RefreshCw, Volume2 } from 'lucide-react'; // Icon cho Captcha & Select

const RegisterPage = () => {
    // State giả lập
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        country: 'Vietnam',
        birthday: { month: '', day: '', year: '' },
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        verifyMethod: 'sms' // 'sms' | 'call'
    });

    return (
        <div className="auth-container">
            <Header />

            <div className="auth-content" style={{ maxWidth: '980px' }}> {/* Container rộng hơn cho trang register */}

                {/* HEADER CỦA FORM */}
                <div className="register-header">
                    <h1 className="register-title">Tạo Tài Khoản Code Store</h1>
                    <p className="register-subtitle">
                        Một Tài Khoản Code Store là tất cả những gì bạn cần để truy cập mọi dịch vụ của Code Store. <br />
                        Đã có Tài Khoản Code Store? <a href="/login" className="link-blue" style={{ marginLeft: 5 }}>Đăng nhập tại đây &rsaquo;</a>
                    </p>
                </div>

                <form>
                    <div className="form-section-container">
                        {/* --- NAME SECTION --- */}
                        <div className="form-row">
                            <div className="form-col">
                                <div className="apple-input-wrapper">
                                    <input type="text" className="apple-input" placeholder="Họ" />
                                </div>
                            </div>
                            <div className="form-col">
                                <div className="apple-input-wrapper">
                                    <input type="text" className="apple-input" placeholder="Tên" />
                                </div>
                            </div>
                        </div>

                        {/* --- COUNTRY & BIRTHDAY --- */}
                        <div className="form-row" style={{ marginBottom: 0 }}>
                            <div className="section-label">QUỐC GIA / KHU VỰC</div>
                        </div>
                        <div className="form-row">
                            <div className="apple-select-wrapper" style={{ width: '100%' }}>
                                <select className="apple-select" defaultValue="Vietnam">
                                    <option value="Vietnam">Việt Nam</option>
                                    <option value="United States">United States</option>
                                    <option value="Singapore">Singapore</option>
                                </select>
                                <ChevronDown size={16} className="apple-select-arrow" />
                            </div>
                        </div>

                        <div className="form-row" style={{ marginBottom: 0 }}>
                            <div className="section-label">NGÀY SINH</div>
                        </div>
                        <div className="form-row">
                            {/* Month */}
                            <div className="form-col">
                                <div className="apple-select-wrapper">
                                    <select className="apple-select" defaultValue="">
                                        <option value="" disabled>Tháng</option>
                                        {[...Array(12)].map((_, i) => <option key={i} value={i + 1}>Tháng {i + 1}</option>)}
                                    </select>
                                    <ChevronDown size={16} className="apple-select-arrow" />
                                </div>
                            </div>
                            {/* Day */}
                            <div className="form-col">
                                <div className="apple-select-wrapper">
                                    <select className="apple-select" defaultValue="">
                                        <option value="" disabled>Ngày</option>
                                        {[...Array(31)].map((_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}
                                    </select>
                                    <ChevronDown size={16} className="apple-select-arrow" />
                                </div>
                            </div>
                            {/* Year */}
                            <div className="form-col">
                                <div className="apple-select-wrapper">
                                    <select className="apple-select" defaultValue="">
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
                                <input type="email" className="apple-input" placeholder="name@example.com" />
                                <span style={{ position: 'absolute', right: 16, fontSize: 12, color: '#86868b' }}>Đây sẽ là ID Tài Khoản Apple mới của bạn.</span>
                            </div>

                            <div className="apple-input-wrapper" style={{ marginBottom: 20 }}>
                                <input type="password" className="apple-input" placeholder="Mật khẩu" />
                            </div>

                            <div className="apple-input-wrapper">
                                <input type="password" className="apple-input" placeholder="Xác nhận mật khẩu" />
                            </div>
                        </div>

                        <div className="form-divider"></div>

                        {/* --- PHONE NUMBER --- */}
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
                                    <input type="tel" className="apple-input" placeholder="Số điện thoại" />
                                </div>
                            </div>
                        </div>

                        <div style={{ maxWidth: 460, margin: '10px auto 20px', fontSize: 13, color: '#86868b', textAlign: 'left' }}>
                            Hãy đảm bảo nhập số điện thoại mà bạn luôn có thể truy cập. Số này sẽ được dùng để xác minh danh tính của bạn.
                        </div>

                        <div className="form-row" style={{ marginBottom: 10 }}>
                            <div className="section-label" style={{ fontSize: 15 }}>Xác minh bằng:</div>
                        </div>

                        <div className="radio-group">
                            <label className="radio-item">
                                <input type="radio" name="verify" className="radio-input" defaultChecked />
                                <span className="radio-label">Tin nhắn văn bản</span>
                            </label>
                            <label className="radio-item">
                                <input type="radio" name="verify" className="radio-input" />
                                <span className="radio-label">Cuộc gọi điện thoại</span>
                            </label>
                        </div>

                        <div className="form-divider"></div>

                        {/* --- ANNOUNCEMENTS --- */}
                        <div className="checkbox-group">
                            <label className="checkbox-item">
                                <input type="checkbox" className="checkbox-input" />
                                <div className="checkbox-text">
                                    <h4>Thông báo</h4>
                                    <p>Nhận email và thông báo về các sản phẩm, dịch vụ và phần mềm của Apple.</p>
                                </div>
                            </label>
                            <label className="checkbox-item">
                                <input type="checkbox" className="checkbox-input" />
                                <div className="checkbox-text">
                                    <h4>Ứng dụng, Nhạc, TV và Thêm nữa</h4>
                                    <p>Nhận email về các nội dung mới, ưu đãi độc quyền trên App Store và iTunes.</p>
                                </div>
                            </label>
                        </div>

                        <div className="form-divider"></div>

                        {/* --- CAPTCHA --- */}
                        <div className="section-label">NHẬP KÝ TỰ TRONG ẢNH</div>
                        <div className="captcha-container">
                            <div className="captcha-image">
                                XK49
                            </div>
                            <div className="apple-input-wrapper" style={{ flex: 1, border: 'none', height: 40 }}>
                                <input type="text" className="apple-input" placeholder="Nhập mã" style={{ padding: '0 10px' }} />
                            </div>
                        </div>
                        <div style={{ maxWidth: 460, margin: '0 auto 30px', textAlign: 'left', display: 'flex', gap: 15 }}>
                            <button type="button" className="link-blue" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                                <RefreshCw size={14} style={{ marginRight: 4 }} /> Mã mới
                            </button>
                            <button type="button" className="link-blue" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                                <Volume2 size={14} style={{ marginRight: 4 }} /> Khiếm thị
                            </button>
                        </div>

                        {/* --- SUBMIT --- */}
                        <div style={{ textAlign: 'center', marginBottom: 60 }}>
                            <button type="submit" className="btn-continue">
                                Tiếp tục
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