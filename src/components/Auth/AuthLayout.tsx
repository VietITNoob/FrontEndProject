import React from 'react';
import './Auth.css';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="auth-container">
      {/* Background động */}
      <div className="auth-bg-glow">
        <div className="glow-blob glow-1"></div>
        <div className="glow-blob glow-2"></div>
      </div>
      
      {/* Nội dung (Card) */}
      <div className="auth-card">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;