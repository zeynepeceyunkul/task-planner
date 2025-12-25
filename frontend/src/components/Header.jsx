import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

// Görsel ikonları import et
import searchIcon from '../assets/search-icon.png';
import sunIcon from '../assets/sun-icon.png';
import moonIcon from '../assets/moon-icon.png';
import doorIcon from '../assets/door-icon.png';

function Header({ tema, setTema, searchTerm, setSearchTerm }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="header">
      <div className="search-bar">
        <span className="search-icon">
          <img src={searchIcon} alt="Ara" style={{ width: '20px', height: '20px' }} />
        </span>
        <input
          type="text"
          placeholder="Görev ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="header-right">
        <button
          onClick={() => setTema(tema === 'light' ? 'dark' : 'light')}
          className="theme-toggle"
        >
          <img
            src={tema === 'light' ? moonIcon : sunIcon}
            alt="Tema Değiştir"
            style={{ width: '24px', height: '24px' }}
          />
        </button>

        <button onClick={handleLogout} className="logout-btn">
          <img src={doorIcon} alt="Çıkış" style={{ width: '24px', height: '24px' }} />
        </button>
      </div>
    </div>
  );
}

export default Header;
