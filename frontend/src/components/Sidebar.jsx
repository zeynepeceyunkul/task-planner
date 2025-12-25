import React, { useState } from 'react';
import './Sidebar.css';
import userAvatar from '../assets/user-avatar.png';
import calendarIcon from '../assets/calendar-icon.png';
import starIcon from '../assets/star-icon.png';
import listIcon from '../assets/list-icon.png';
import checkIcon from '../assets/check-icon.png';
import warningIcon from '../assets/warning-icon.png';

function Sidebar({
  setSelectedFilter,
  selectedFilter,
  setAktifKategori,
  aktifKategori,
  categories
}) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);

  const username = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')).name
    : 'Kullanıcı';

  const toggleCategoryPanel = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  // Tamamlananlar satırını iki farklı yerde göstereceğiz
  const TamamlananlarItem = (
    <li
      onClick={() => {
        setSelectedFilter('Tamamlananlar');
        setAktifKategori('');
      }}
      style={{
        listStyle: 'none',
        cursor: 'pointer',
        fontWeight: selectedFilter === 'Tamamlananlar' ? 'bold' : 'normal',
        display: 'flex',
        alignItems: 'center',
        gap: '0px',
        paddingLeft: '6px',
        margin: '6px 0'
      }}
    >
      <img src={checkIcon} alt="Tamamlananlar" style={{ width: '23px', height: '23px' }} />
      Tamamlananlar
    </li>
  );

  return (
    <div className="sidebar">
      {/* Kullanıcı bilgisi */}
      <div style={{
  display: 'flex',
  alignItems: 'center',
  gap: '6px', // ya da 2px gibi küçük bir değer
  marginBottom: '20px',
  paddingLeft: '5px',
  marginLeft: '10px'
}}>
  <img
    src={userAvatar}
    alt="Kullanıcı"
    style={{ width: '50px', height: '50px', borderRadius: '0%', marginRight: '0px' }}
  />
  <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{username}</span>
</div>


      {/* Bugün / Yaklaşan */}
      <ul>
        <li
          onClick={() => {
            setSelectedFilter('Bugün');
            setAktifKategori('Tümü');
          }}
          style={{
            fontWeight: selectedFilter === 'Bugün' ? 'bold' : 'normal',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <img src={calendarIcon} alt="Bugün" style={{ width: '25px', height: '25px' }} />
          Bugün
        </li>

        <li
          onClick={() => {
            setSelectedFilter('Yaklaşan');
            setAktifKategori('Tümü');
          }}
          style={{
            fontWeight: selectedFilter === 'Yaklaşan' ? 'bold' : 'normal',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <img src={calendarIcon} alt="Takvim" style={{ width: '25px', height: '25px' }} />
          Yaklaşan
        </li>

         <li
  className={selectedFilter === 'Geciken' ? 'active' : ''}
  onClick={() => setSelectedFilter('Geciken')}
  style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
>
  <img src={warningIcon} alt="Geciken" style={{ width: '25px', height: '25px' }} />
  Geciken
</li>


          <li
    onClick={() => setSelectedFilter('Takvim')}
    className={selectedFilter === 'Takvim' ? 'active' : ''}
    style={{
            fontWeight: selectedFilter === 'Takvim' ? 'bold' : 'normal',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <img src={calendarIcon} alt="Takvim" style={{ width: '25px', height: '25px' }} />
          Takvim
  
  </li>

      </ul>

      <hr style={{ margin: '4px 0 6px 0' }} />

      {/* Kategoriler başlığı */}
      <div className="sidebar-header" style={{ marginTop: '0' }}>
        <h4 style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={toggleCategoryPanel}>
          Kategoriler
          <div className={`triangle-icon ${isCategoryOpen ? 'up' : 'down'}`}></div>
        </h4>
      </div>

      {/* ✅ Tamamlananlar - Kategoriler KAPALIYKEN göster */}
      {!isCategoryOpen && TamamlananlarItem}

      {/* 🔽 Kategoriler listesi (açılır kapanır) */}
      <div
        className={`category-list ${isCategoryOpen ? 'open' : 'closed'}`}
        style={{
          overflow: 'hidden',
          maxHeight: isCategoryOpen ? '1000px' : '0',
          transition: 'max-height 0.3s ease-out',
          paddingLeft: '10px'
        }}
      >
        <ul style={{ listStyle: 'none', paddingLeft: '0', margin: 0 }}>
          <li
            className="kategori-tumu"
            onClick={() => setAktifKategori('Tümü')}
            style={{
              cursor: 'pointer',
              fontWeight: aktifKategori === 'Tümü' ? 'bold' : 'normal',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <img src={listIcon} alt="Tümü" style={{ width: '25px', height: '25px' }} />
            Tümü
          </li>

          {categories.map((cat) => (
            <li
              key={cat._id}
              onClick={() => setAktifKategori(cat.name)}
              style={{
                cursor: 'pointer',
                marginBottom: '6px',
                fontWeight: aktifKategori === cat.name ? 'bold' : 'normal',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <img src={starIcon} alt="Kategori" style={{ width: '8px', height: '8px' }} />
              {cat.name}
            </li>
          ))}

          {/* ✅ Tamamlananlar - Kategoriler AÇIKKEN göster */}
          {isCategoryOpen && TamamlananlarItem}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
