import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext'; // <--- 1. IMPORT AUTH CONTEXT
import type { User } from '../../../types';

// Cập nhật Interface khớp với dữ liệu User bạn cần hiển thị trên Header
interface LoginResponse {
  accessToken: string;
  user: User
  };


export const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // <--- 2. LẤY HÀM LOGIN TỪ CONTEXT
  
  // Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // States
  const [step, setStep] = useState<'email' | 'password'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorShake, setErrorShake] = useState(false);

  // Effect: Auto focus
  useEffect(() => {
    if (step === 'email' && inputRef.current) inputRef.current.focus();
    if (step === 'password' && passwordRef.current) passwordRef.current.focus();
  }, [step]);

  // Hàm rung lắc
  const triggerShake = () => {
    setErrorShake(true);
    setTimeout(() => setErrorShake(false), 400);
  };

  // LOGIC XỬ LÝ CHÍNH
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // --- BƯỚC 1: EMAIL ---
    if (step === 'email') {
      if (!email) {
        triggerShake();
        return;
      }
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep('password');
      }, 500);
    } 
    
    // --- BƯỚC 2: PASSWORD & API ---
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

        // -------------------------------------------------------
        // 3. SỬA ĐOẠN NÀY: Dùng hàm login() thay vì localStorage.setItem()
        // -------------------------------------------------------
        login(data.user, data.accessToken); 

        // Chuyển trang
        navigate('/');

      } catch (error) {
        console.error(error);
        triggerShake();
        alert('Đăng nhập thất bại! Kiểm tra lại email/password.');
      } finally {
        setLoading(false);
      }
    }
  };

  // Logic phụ
  const handleEditEmail = () => {
    setStep('email');
    setPassword('');
  };

  const isEmailValid = email.length > 0;
  const isPasswordValid = password.length > 0;

  return {
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
    handleEditEmail,
    triggerShake
  };
};