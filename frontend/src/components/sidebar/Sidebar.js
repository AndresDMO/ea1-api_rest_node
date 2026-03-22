import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const [isToggled, setIsToggled] = useState(false);

  const sidebarStyle = {
    backgroundImage: `url(/images/FondoBarras.png)`
  };

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: 'fas fa-chart-line' },
    { path: '/genres', label: 'Géneros', icon: 'fas fa-film' },
    { path: '/directors', label: 'Directores', icon: 'fas fa-user' },
    { path: '/producers', label: 'Productoras', icon: 'fas fa-building' },
    { path: '/types', label: 'Tipos', icon: 'fas fa-folder' },
    { path: '/media', label: 'Media', icon: 'fas fa-video' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <button 
        className="sidebar-toggle"
        onClick={() => setIsToggled(!isToggled)}
      >
        <i className="fas fa-bars"></i>
      </button>
      
      <div className={`sidebar ${isToggled ? 'active' : ''}`} style={sidebarStyle}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <img src="/images/IUdigital.png" alt="Logo" className="sidebar-logo-img" />
          </div>
          <h1 className="sidebar-title">IUDA FILMS</h1>
          <p className="sidebar-subtitle">Admin Panel</p>
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-list">
            {menuItems.map((item) => (
              <li key={item.path} className="nav-item">
                <Link
                  to={item.path}
                  className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                  onClick={() => setIsToggled(false)}
                >
                  <span className="nav-icon">
                    <i className={item.icon}></i>
                  </span>
                  <span className="nav-label">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <p className="footer-text">© 2026 IUDA FILMS</p>
        </div>
      </div>

      {isToggled && <div className="sidebar-overlay" onClick={() => setIsToggled(false)} />}
    </>
  );
};

export default Sidebar;
