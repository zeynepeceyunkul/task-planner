import React, { useState, useEffect } from 'react';
import './TaskModal.css';

import closeIcon from '../assets/close-icon.png';
import checkIcon from '../assets/check-icon.png';
import xIcon from '../assets/x-icon.png';


function TaskModal({ task, onClose, tema, initialDate, onAddTask }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('Genel');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDate(task.dueDate);
      setCategory(task.category);
      setDescription(task.description || '');
    } else {
      setTitle('');
      setDate(initialDate || '');
      setCategory('Genel');
      setDescription('');
    }
  }, [task, initialDate]);

  const handleSubmit = () => {
    if (title.trim() === '') return;

    if (onAddTask) {
      onAddTask(title, date, category, description);
      onClose();
    }
  };

  return (
    <div className={`modal-overlay ${tema}`}>
      <div className={`modal-content ${tema}`}>
        <div className="modal-header">
          <h2>{task ? '📌 Görev Detayı' : ' Yeni Görev Ekle'}</h2>
          <button
            onClick={onClose}
            className="close-button"
            style={{ background: 'none', border: 'none' }}
          >
            <img src={closeIcon} alt="Kapat" style={{ width: '30px', height: '30px' }} />
          </button>
        </div>

        <div className="modal-body">
          {task ? (
            <>
              <p><strong>Başlık:</strong> {task.title}</p>
              <p><strong>Tarih:</strong> {task.dueDate || 'Belirtilmedi'}</p>
              <p><strong>Kategori:</strong> {task.category}</p>
              <p><strong>Açıklama:</strong> {task.description?.trim() ? task.description : '—'}</p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <strong>Tamamlandı mı:</strong>{' '}
                {task.completed ? (
                  <img src={checkIcon} alt="Evet" style={{ width: '20px', height: '20px' }} />
                ) : (
                  <img src={xIcon} alt="Hayır" style={{ width: '18px', height: '18px' }} />
                )}
              </p>
            </>
          ) : (
            <>
              <h3 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 'bold' }}>Yeni Görev Ekle</h3>

              <input
                type="text"
                placeholder="Görev Başlığı"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  marginBottom: '12px',
                  width: '93%',
                  fontSize: '16px',
                  backgroundColor: tema === 'dark' ? '#3c4b56' : '#f4f4f4',
                  color: tema === 'dark' ? '#ffffff' : '#2f3e46',
                }}
              />

              <textarea
                placeholder="Açıklama"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  marginBottom: '12px',
                  width: '93%',
                  height: '80px',
                  fontSize: '14px',
                  backgroundColor: tema === 'dark' ? '#3c4b56' : '#f4f4f4',
                  color: tema === 'dark' ? '#ffffff' : '#2f3e46',
                  resize: 'none',
                }}
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  width: '100%',
                  fontSize: '14px',
                  backgroundColor: tema === 'dark' ? '#3c4b56' : '#f4f4f4',
                  color: tema === 'dark' ? '#ffffff' : '#2f3e46',
                  marginBottom: '12px',
                }}
              >
                <option>Genel</option>
                <option>İş</option>
                <option>Okul</option>
                <option>Kişisel</option>
                <option>Sağlık</option>
                <option>Sosyal</option>
                <option>Alışveriş</option>
                <option>Finans</option>
                <option>Seyahat</option>
                <option>Hobi</option>
              </select>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  width: '93%',
                  fontSize: '14px',
                  backgroundColor: tema === 'dark' ? '#3c4b56' : '#f4f4f4',
                  color: tema === 'dark' ? '#ffffff' : '#2f3e46',
                  marginBottom: '12px',
                }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                <button
                  onClick={handleSubmit}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    backgroundColor: '#6E3D69',
                    color: '#fff',
                    border: 'none',
                    fontWeight: 'bold',
                    width: '48%',
                    cursor: 'pointer',
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#502c4c'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#6E3D69'}
                >
                  Kaydet
                </button>
                <button
                  onClick={onClose}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    backgroundColor: '#ccc',
                    color: '#2f3e46',
                    border: 'none',
                    fontWeight: 'bold',
                    width: '48%',
                    cursor: 'pointer',
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#b3b3b3'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#ccc'}
                >
                  İptal
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskModal;
