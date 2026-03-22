import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './Home.css';

const Home = () => {
  const [stats, setStats] = useState({
    genres: 0,
    directors: 0,
    producers: 0,
    types: 0,
    media: 0,
    total: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [genresRes, directorsRes, producersRes, typesRes, mediaRes] = await Promise.all([
          api.get('/genres'),
          api.get('/directors'),
          api.get('/producers'),
          api.get('/types'),
          api.get('/media')
        ]);

        const newStats = {
          genres: genresRes.data.length || 0,
          directors: directorsRes.data.length || 0,
          producers: producersRes.data.length || 0,
          types: typesRes.data.length || 0,
          media: mediaRes.data.length || 0,
          total: 0
        };

        newStats.total = newStats.genres + newStats.directors + newStats.producers + newStats.types + newStats.media;
        setStats(newStats);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const modules = [
    {
      id: 1,
      title: 'Géneros',
      description: 'Administra géneros de películas',
      link: '/genres',
      image: '/images/Generos.png',
      faIcon: 'fas fa-mask',
      color: '#6366F1',
      count: stats.genres
    },
    {
      id: 2,
      title: 'Directores',
      description: 'Gestiona directores de cine',
      link: '/directors',
      image: '/images/Director.jpg',
      faIcon: 'fas fa-user-tie',
      color: '#06B6D4',
      count: stats.directors
    },
    {
      id: 3,
      title: 'Productoras',
      description: 'Controla productoras y estudios',
      link: '/producers',
      image: '/images/Productoras.jpg',
      faIcon: 'fas fa-industry',
      color: '#F97316',
      count: stats.producers
    },
    {
      id: 4,
      title: 'Tipos',
      description: 'Clasifica tipos de contenido',
      link: '/types',
      image: '/images/Tipos.jpg',
      faIcon: 'fas fa-list',
      color: '#A855F7',
      count: stats.types
    },
    {
      id: 5,
      title: 'Media',
      description: 'Publica películas y series',
      link: '/media',
      image: '/images/Media.jpg',
      faIcon: 'fas fa-film',
      color: '#EC4899',
      count: stats.media
    }
  ];

  return (
    <div className="home-container">
      <div className="hero-section">
        <img src="/images/BannerIU.jpg" alt="Banner IUDA FILMS" className="hero-image" />
        <div className="hero-overlay">
          <h1 className="hero-title">¡Bienvenido, Administrador!</h1>
          <p className="hero-subtitle">Panel de Gestión - IUDA FILMS</p>
          <p className="hero-text">Administra películas, directores y contenido audiovisual para la comunidad académica</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-section">
        <div className="stats-grid">
          {modules.map((module) => (
            <div key={module.id} className="stat-card" style={{ borderLeftColor: module.color }}>
              <div className="stat-icon" style={{ backgroundColor: `${module.color}20`, color: module.color }}>
                <i className={module.faIcon}></i>
              </div>
              <div className="stat-content">
                <h4 className="stat-title">{module.title}</h4>
                <p className="stat-number">{module.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Module Cards */}
      <div className="modules-section">
        <h2 className="section-title">Gestión de Contenido</h2>
        <div className="row">
          {modules.map((module) => (
            <div key={module.id} className="col-module">
              <Link to={module.link} className="module-card-link">
                <div className="module-card" style={{ borderTopColor: module.color }}>
                  <div className="module-image">
                    <img
                      src={module.image}
                      alt={module.title}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="module-icon-overlay" style={{ backgroundColor: module.color }}>
                      <img src={module.image} alt={module.title} className="module-icon-img" />
                    </div>
                  </div>
                  <div className="module-content">
                    <h5 className="module-title">{module.title}</h5>
                    <p className="module-description">{module.description}</p>
                    <div className="module-footer">
                      <span className="module-count">{module.count} registros</span>
                      <button className="module-button">
                        Ir al módulo <i className="fas fa-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
