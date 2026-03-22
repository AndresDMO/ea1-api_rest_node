import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="/images/IUdigital.png" alt="IUDA Logo" className="navbar-logo" />
          <span className="navbar-brand-text">IUDA FILMS</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/genres">
                Géneros
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/directors">
                Directores
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/producers">
                Productoras
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/types">
                Tipos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/media">
                Media
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
