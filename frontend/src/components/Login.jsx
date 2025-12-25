import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hata, setHata] = useState('');

  const navigate = useNavigate();
  const API_BASE = 'http://localhost:5000/api';

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_BASE}/auth/login`, {
        email,
        password,
      });

      // ✅ Gelen cevabı kontrol et
      if (response.data && response.data.token) {
        // Token ve kullanıcı bilgilerini kaydet
        localStorage.setItem('token', response.data.token);
        localStorage.setItem(
          'user',
          JSON.stringify({
            name: response.data.name,
            email: response.data.email,
          })
        );

        // Anasayfaya yönlendir
        navigate('/');
      } else {
        setHata('Sunucudan geçerli bir yanıt alınamadı.');
        console.error('Geçersiz response:', response.data);
      }

    } catch (err) {
      console.error('Giriş hatası:', err.response || err);
      setHata(err.response?.data?.message || 'Giriş başarısız');
    }
  };

  return (
    <div className="auth-container">
      <h2>Giriş Yap</h2>
      <form onSubmit={handleLogin} autoComplete="off">
        <input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Giriş Yap</button>
      </form>

      {hata && <p style={{ color: 'red', marginTop: '10px' }}>{hata}</p>}
    </div>
  );
}

export default Login;
