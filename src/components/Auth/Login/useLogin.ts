import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Interface cho API response (nếu cần)
interface LoginResponse {
  accessToken: string;
  user: {
    email: string;
    id: number;
  };
}

export const useLogin = () => {
  const navigate = useNavigate();
  
  // Refs để thao tác DOM (focus)
  const inputRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // States
  const [step, setStep] = useState<'email' | 'password'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorShake, setErrorShake] = useState(false);

  // Effect: Auto focus khi chuyển bước
  useEffect(() => {
    if (step === 'email' && inputRef.current) inputRef.current.focus();
    if (step === 'password' && passwordRef.current) passwordRef.current.focus();
  }, [step]);

  // Hàm rung lắc báo lỗi
  const triggerShake = () => {
    setErrorShake(true);
    setTimeout(() => setErrorShake(false), 400);
  };

  // LOGIC XỬ LÝ CHÍNH
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // --- BƯỚC 1: XỬ LÝ EMAIL ---
    if (step === 'email') {
      if (!email) {
        triggerShake();
        return;
      }
      setLoading(true);
      // Giả lập check email (0.5s)
      setTimeout(() => {
        setLoading(false);
        setStep('password');
      }, 500);
    } 
    
    // --- BƯỚC 2: XỬ LÝ PASSWORD & GỌI API ---
    else {
      if (!password) {
        triggerShake();
        return;
      }
      
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3001/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) throw new Error('Login failed');

        const data: LoginResponse = await response.json();

        // Lưu session
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Chuyển trang
        navigate('/');

      } catch (error) {
        console.error(error);
        triggerShake();
        alert('Đăng nhập thất bại!');
      } finally {
        setLoading(false);
      }
    }
  };

  // Logic phụ trợ cho View
  const handleEditEmail = () => {
    setStep('email');
    setPassword('');
  };

  const isEmailValid = email.length > 0;
  const isPasswordValid = password.length > 0;

  // Trả về tất cả những gì View cần dùng
  return {
    // State
    step,
    email, setEmail,
    password, setPassword,
    isFocused, setIsFocused,
    loading,
    errorShake,
    isEmailValid,
    isPasswordValid,
    
    // Refs
    inputRef,
    passwordRef,

    // Actions
    handleSubmit,
    handleEditEmail,
    triggerShake
  };
};