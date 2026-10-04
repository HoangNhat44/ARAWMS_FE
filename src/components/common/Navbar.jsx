import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Layers, LogOut, User as UserIcon, LogIn } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <Link to="/" className="navbar-brand">
        <Layers style={{ color: 'var(--primary)' }} size={28} />
        <span className="gradient-text">ARAWMS App</span>
      </Link>

      <nav>
        <ul className="navbar-links">
          <li>
            <Link to="/">Trang chủ</Link>
          </li>
          {user ? (
            <>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', fontWeight: 600 }}>
                <UserIcon size={18} style={{ color: 'var(--accent)' }} />
                <span>{user.name}</span>
              </li>
              <li>
                <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                  <LogOut size={16} />
                  Đăng xuất
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                  <LogIn size={16} />
                  Đăng nhập
                </Link>
              </li>
              <li>
                <Link to="/register" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                  Đăng ký
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
