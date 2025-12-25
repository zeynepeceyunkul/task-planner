import React, { useState, useEffect } from 'react';
import './TaskModal.css';
import closeIcon from '../assets/close-icon.png';
import editIcon from '../assets/edit-icon.png';

function EditTaskModal({ task, onClose, onUpdateTask, tema }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDate(task.dueDate || '');
      setCategory(task.category || 'Genel');
      setDescription(task.description || '');
    }
  }, [task]);

  const handleUpdate = () => {
    if (title.trim() === '') return;

    const updatedTask = {
      ...task,
      title,
      dueDate: date,
      category,
      description,
    };

    onUpdateTask(updatedTask);
    onClose();
  };

  return (
    <div className={`modal-overlay ${tema}`}>
      <div className={`modal-content ${tema}`}>
        <div className="modal-header">
<h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
  <img src={editIcon} alt="Düzenle" style={{ width: '25px', height: '25px' }} />
  Görevi Düzenle
</h2>

          <button
            onClick={onClose}
            className="close-button"
            style={{ background: 'none', border: 'none' }}
          >
            <img src={closeIcon} alt="Kapat" style={{ width: '30px', height: '30px' }} />
          </button>
        </div>

        <div className="modal-body">
          <input
            type="text"
            placeholder="Başlık"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle(tema)}
          />

          <textarea
            placeholder="Açıklama"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ ...inputStyle(tema), height: '80px', resize: 'none' }}
          />

          <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  style={{ ...inputStyle(tema), width: '100%' }}
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
            style={inputStyle(tema)}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
            <button
              onClick={handleUpdate}
              style={saveBtnStyle}
              onMouseOver={(e) => e.target.style.backgroundColor = '#502c4c'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#6E3D69'}
            >
              Kaydet
            </button>
            <button
              onClick={onClose}
              style={cancelBtnStyle}
            >
              İptal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = (tema) => ({
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  marginBottom: '12px',
  width: '93%',
  fontSize: '14px',
  backgroundColor: tema === 'dark' ? '#3c4b56' : '#f4f4f4',
  color: tema === 'dark' ? '#ffffff' : '#2f3e46',
});

const saveBtnStyle = {
  padding: '10px',
  borderRadius: '8px',
  backgroundColor: '#6E3D69',
  color: '#fff',
  border: 'none',
  fontWeight: 'bold',
  width: '48%',
  cursor: 'pointer',
};

const cancelBtnStyle = {
  padding: '10px',
  borderRadius: '8px',
  backgroundColor: '#ccc',
  color: '#2f3e46',
  border: 'none',
  fontWeight: 'bold',
  width: '48%',
  cursor: 'pointer',
};

export default EditTaskModal;
