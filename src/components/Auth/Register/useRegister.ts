import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext'; // <--- 1. IMPORT AUTH CONTEXT

// Định nghĩa kiểu dữ liệu cho Form
export interface RegisterFormData {
    firstName: string;
    lastName: string;
    country: string;
    birthday: {
        month: string | number;
        day: string | number;
        year: string | number;
    };
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    captcha: string;
    verifyMethod: string;
}

export const useRegister = () => {
    const navigate = useNavigate();
    const { login } = useAuth(); // <--- 2. LẤY HÀM LOGIN TỪ CONTEXT
    const [loading, setLoading] = useState(false);
    
    // Khởi tạo state
    const [formData, setFormData] = useState<RegisterFormData>({
        firstName: '',
        lastName: '',
        country: 'Vietnam',
        birthday: { month: '', day: '', year: '' },
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        captcha: '',
        verifyMethod: 'sms'
    });

    // Xử lý thay đổi input thường
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Xử lý thay đổi ngày sinh
    const handleBirthdayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            birthday: { ...prev.birthday, [name]: value }
        }));
    };

    // Xử lý Submit Form
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Validation
        if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
            alert("Vui lòng điền đầy đủ thông tin bắt buộc!");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert("Mật khẩu xác nhận không khớp!");
            return;
        }

        if (formData.captcha.toUpperCase() !== 'XK49') {
            alert("Mã xác thực không đúng! (Gợi ý: XK49)");
            return;
        }

        setLoading(true);

        try {
            // 2. Gọi API
            const response = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    phone: formData.phone,
                    country: formData.country,
                    birthday: formData.birthday
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data || 'Đăng ký thất bại (Email có thể đã tồn tại)');
            }

            // -------------------------------------------------------
            // 3. SỬA ĐOẠN NÀY: Dùng login() của Context thay vì localStorage
            // -------------------------------------------------------
            // Hàm này sẽ tự động lưu localStorage VÀ cập nhật Header ngay lập tức
            login(data.user, data.accessToken);

            alert("Đăng ký tài khoản thành công!");
            navigate('/');

        } catch (error: any) {
            console.error("Register Error:", error);
            alert(error.message || "Có lỗi xảy ra khi đăng ký.");
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        loading,
        handleChange,
        handleBirthdayChange,
        handleRegister
    };
};