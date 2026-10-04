import React, { useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { useAuth } from '../hooks/useAuth';
import { CheckCircle2, Server, Database, Code, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { user } = useAuth();
  const [backendStatus, setBackendStatus] = useState({ loading: true, online: false, message: '' });

  useEffect(() => {
    const checkApi = async () => {
      try {
        const res = await authService.checkHealth();
        setBackendStatus({ loading: false, online: true, message: res.message });
      } catch (err) {
        setBackendStatus({ loading: false, online: false, message: 'Chưa kết nối tới Backend server' });
      }
    };

    checkApi();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Hero Banner */}
      <div className="glass-card" style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          Dự án <span className="gradient-text">ARAWMS</span> Standard Setup
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto 2rem' }}>
          Cấu trúc thư mục chuẩn modular cho ứng dụng Full-stack: Backend Express.js REST API + MongoDB Atlas kết nối cùng Frontend React (Vite).
        </p>

        {user ? (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1.5rem', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid var(--primary)', borderRadius: '30px' }}>
            <CheckCircle2 color="var(--success)" size={20} />
            <span>Xin chào, <strong>{user.name}</strong> ({user.email})! Đã xác thực thành công.</span>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/login" className="btn btn-primary">
              Khám phá Đăng nhập <ArrowRight size={18} />
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Đăng ký tài khoản
            </Link>
          </div>
        )}
      </div>

      {/* Connection Status Card */}
      <div className="glass-card">
        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Server size={22} style={{ color: 'var(--accent)' }} />
          Trạng thái kết nối Backend Express API
        </h3>
        {backendStatus.loading ? (
          <p style={{ color: 'var(--text-muted)' }}>Đang kiểm tra kết nối API...</p>
        ) : backendStatus.online ? (
          <div className="alert alert-success" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={18} />
            <span>{backendStatus.message} (http://localhost:5000/api/health)</span>
          </div>
        ) : (
          <div className="alert alert-error">
            ⚠️ {backendStatus.message}. (Bạn cần chạy <code>npm run dev</code> ở thư mục <code>ARAWMS_BE</code>).
          </div>
        )}
      </div>

      {/* Tech Stack Highlights */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-card">
          <Code size={32} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
          <h3>React + Vite FE</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Giao diện frontend tối ưu, Axios Interceptors, Context API Auth, React Router v6 & Modern Dark Glassmorphic UI.
          </p>
        </div>

        <div className="glass-card">
          <Server size={32} style={{ color: 'var(--accent)', marginBottom: '1rem' }} />
          <h3>ExpressJS BE</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Backend Node.js ES Modules chuẩn MVC/Service layer architecture, JWT Token Authentication, Global Error Handling.
          </p>
        </div>

        <div className="glass-card">
          <Database size={32} style={{ color: '#10b981', marginBottom: '1rem' }} />
          <h3>MongoDB Atlas</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Cơ sở dữ liệu đám mây MongoDB với Mongoose ODM, Schema validation & Mật khẩu mã hóa Bcrypt.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
