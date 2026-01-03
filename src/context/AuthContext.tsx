import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

// 1. Định nghĩa kiểu dữ liệu User
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  country?: string;
}

// 2. Định nghĩa Context Type
interface AuthContextType {
  user: User | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean; // <--- QUAN TRỌNG: Thêm biến này để fix lỗi F5
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Provider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Mặc định là TRUE (Đang load) để chặn các trang bảo mật chưa chạy vội
  const [isLoading, setIsLoading] = useState(true); 

  // Kiểm tra LocalStorage khi App vừa chạy
  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('accessToken');
      
      if (storedUser && token) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Lỗi parse user từ local storage", e);
          // Nếu lỗi data rác thì xóa đi
          localStorage.removeItem('user');
          localStorage.removeItem('accessToken');
        }
      }
      // Dù có user hay không, chạy xong logic thì tắt Loading
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = (userData: User, token: string) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('accessToken', token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    window.location.href = '/login'; 
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. Hook sử dụng Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};