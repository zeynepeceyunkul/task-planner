import React, { useState } from 'react';
import './TaskList.css';
import checkIcon from '../assets/check-icon.png';
import deleteIcon from '../assets/delete-icon.png';
import editIcon from '../assets/edit-icon.png';
import calendarIcon from '../assets/calendar-icon.png';
import plusIcon from '../assets/plus-icon.png';
import starIcon from '../assets/star-icon.png'; // Çöp kutusu ikonu
import warningIcon from '../assets/warning-icon.png';
import EditTaskModal from './EditTaskModal';


function TaskList({
  tasks,
  onToggleTask,
  onDeleteTask,
  onEditTaskTitle,
  onAddTaskInline,
  categories,
  onOpenModal,
  onAddCategory,
  onDeleteCategory, // Silme işlevi için ekledik
  tamamlananlariGoster,
  setTamamlananlariGoster,
  selectedFilter,
  setSelectedFilter,
  tema,// ✅ BURAYA EKLE
  onUpdateTask
}) {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('Genel');
  const [newTaskDate, setNewTaskDate] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [kategoriModalAcik, setKategoriModalAcik] = useState(false);
  const [yeniKategoriAdi, setYeniKategoriAdi] = useState('');
  const [yeniKategoriRenk, setYeniKategoriRenk] = useState('#cccccc');
  const [showModal, setShowModal] = useState(false); // Modal gösterimi için yeni durum
  const [showCategoryModal, setShowCategoryModal] = useState(false); // Kategori ekleme modalı
const [selectedTaskToEdit, setSelectedTaskToEdit] = useState(null);
const [showEditModal, setShowEditModal] = useState(false);

const handleUpdateTaskAndClose = (updatedTask) => {
  onUpdateTask(updatedTask); // ✅ App.js’ten gelen fonksiyon çalışacak (veritabanı güncelleniyor)
  setSelectedTaskToEdit(null);
  setShowEditModal(false);
};



  const getCategoryColor = (categoryName) => {
    const found = categories.find((cat) => cat.name === categoryName);
    return found ? found.color : '#ccc';
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim() === '') return;
    onAddTaskInline(newTaskTitle, newTaskDate, newTaskCategory, newTaskDescription);
    setNewTaskTitle('');
    setNewTaskCategory('Genel');
    setNewTaskDate('');
    setNewTaskDescription('');
    setShowModal(false); // Modal'ı kapat
  };

  const handleKategoriEkle = () => {
    if (yeniKategoriAdi.trim() === '') return;
    onAddCategory(yeniKategoriAdi, yeniKategoriRenk);
    setYeniKategoriAdi('');
    setYeniKategoriRenk('#cccccc');
    setShowCategoryModal(false);
  };

  // Kategori silme işlemi
  const handleKategoriSil = (categoryId) => {
    onDeleteCategory(categoryId);
  };


const now = new Date();
  const filteredTasks = tasks.filter(task => {
    const taskDate = new Date(task.dueDate);

    if (selectedFilter === 'Bugün') {
      return taskDate.toDateString() === now.toDateString();
    }

    if (selectedFilter === 'Yaklaşan') {
      return taskDate > now && !task.completed;
    }

    if (selectedFilter === 'Geciken') {
      const diffInDays = (now - taskDate) / (1000 * 60 * 60 * 24);
      return !task.completed && diffInDays > 0 && diffInDays <= 7;
    }

    if (selectedFilter === 'Tamamlananlar') {
      return task.completed;
    }

    return true;
  });


  return (
    <div className="task-list">
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
      }}>
        <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
  <img
    src={
      selectedFilter === 'Geciken'
        ? warningIcon
        : calendarIcon
    }
    alt="Simge"
    style={{ width: '30px', height: '30px' }}
  />
  {selectedFilter === 'Tamamlananlar'
    ? 'Tamamlananlar'
    : selectedFilter === 'Yaklaşan'
    ? 'Yaklaşan'
    : selectedFilter === 'Geciken'
    ? 'Geciken'
    : 'Bugün'}
</h2>





        <button
  title={tamamlananlariGoster ? "Tamamlananları gizle" : "Tamamlananları göster"}
  onClick={() => {
  setTamamlananlariGoster(!tamamlananlariGoster);
}}

  style={{
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px'
  }}
>
  <img
    src={checkIcon}
    alt="Tamamlananları Göster"
    style={{ width: '30px', height: '30px', opacity: tamamlananlariGoster ? 1 : 0.5 }}
  />
</button>

      </div>

      {tasks.length === 0 && (
        <div style={{ padding: '10px', color: '#999' }}>Görev bulunamadı.</div>
      )}

      {filteredTasks.map((task) => (

        <div
          className="task"
          key={task._id}
          onClick={() => onOpenModal(task)}
          style={{
            borderLeft: `4px solid ${getCategoryColor(task.category)}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <input
            type="checkbox"
            checked={task.completed}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => {
              e.stopPropagation();
              onToggleTask(task._id);
            }}
          />
          <div className="task-info" style={{ flex: 1 }}>
            {editingTaskId === task._id ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="text"
                  value={editedTitle}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  style={{
                    padding: '6px 8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    flex: 1,
                    fontSize: '14px'
                  }}
                />
                <button
                  className="edit-save-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (editedTitle.trim() !== '') {
                      onEditTaskTitle(task._id, editedTitle.trim());
                      setEditingTaskId(null);
                    }
                  }}
                >
                  Kaydet
                </button>
              </div>
            ) : (
              <>
                <div className={`task-title ${task.completed ? 'completed' : ''}`}>
                  {task.title}
                </div>
                {task.dueDate && (
  <div className="task-sub" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
    <img src={calendarIcon} alt="Takvim" style={{ width: '20px', height: '20px' }} />
    <span style={{ lineHeight: '20px' }}>{task.dueDate}</span>
  </div>
)}
<div className="task-sub" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
  <img
    src={starIcon}
    alt="Kategori"
    style={{
      width: '10px',
      height: '10px',
      marginLeft: '5px' // ⭐️ Bu sayede yukarıya kayar ve ortalanır
    }}
  />
  <span style={{ lineHeight: '20px' }}>{task.category}</span>
</div>


              </>
            )}
          </div>
          <div className="task-actions">
            {editingTaskId !== task._id && (
<button
  className="edit-btn"
  onClick={(e) => {
    e.stopPropagation();
    setSelectedTaskToEdit(task);
    setShowEditModal(true);
  }}
>
  <img src={editIcon} alt="Düzenle" style={{ width: '25px', height: '25px' }} />
</button>

            )}
            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteTask(task._id);
              }}
            >
              <img src={deleteIcon} alt="Sil" style={{ width: '25px', height: '25px' }} />
            </button>
          </div>
        </div>
      ))}

      {selectedFilter !== 'Tamamlananlar' && (
  <button
    onClick={() => setShowModal(true)} // Modal'ı aç
    className="add-task-button"
    style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
  >
    <img src={plusIcon} alt="Ekle" style={{ width: '20px', height: '20px' }} />
    Görev Ekle
  </button>
)}


      {/* Yeni Görev Ekleme Modalı */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{
            backgroundColor: tema === 'dark' ? '#2f3e46' : '#ffffff',
            color: tema === 'dark' ? '#ffffff' : '#2f3e46',
          }}>
            <h3 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 'bold' }}>Yeni Görev Ekle</h3>

            <input
              type="text"
              placeholder="Görev Başlığı"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
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
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
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

            <div style={{ marginBottom: '12px' }}>
              <select
                value={newTaskCategory}
                onChange={(e) => setNewTaskCategory(e.target.value)}
                style={{
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  width: '100%',
                  fontSize: '14px',
                  backgroundColor: tema === 'dark' ? '#3c4b56' : '#f4f4f4',
                  color: tema === 'dark' ? '#ffffff' : '#2f3e46',
                }}
              >
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="date"
              value={newTaskDate}
              onChange={(e) => setNewTaskDate(e.target.value)}
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
                onClick={handleAddTask}
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  backgroundColor: '#6E3D69',
                  color: '#fff',
                  border: 'none',
                  fontWeight: 'bold',
                  width: '48%',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#502c4c'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#6E3D69'}
              >
                Kaydet
              </button>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  backgroundColor: '#ccc',
                  color: '#2f3e46',
                  border: 'none',
                  fontWeight: 'bold',
                  width: '48%',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#b3b3b3'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#ccc'}
              >
                İptal
              </button>
            </div>

            {/* Kategori Ekleme Butonu */}
            <button
              onClick={() => setShowCategoryModal(true)}
              style={{
                marginTop: '10px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#6E3D69',
                fontWeight: 'bold',
              }}
            >
              Kategori Ekle
            </button>
          </div>
        </div>
      )}

      {/* Kategori Ekleme Modalı */}
      {showCategoryModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{
            backgroundColor: tema === 'dark' ? '#2f3e46' : '#ffffff',
            color: tema === 'dark' ? '#ffffff' : '#2f3e46',
          }}>
            <h3 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 'bold' }}>Kategori Ekle</h3>

            {/* Kategorilerin Listelendiği Kısım */}
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '16px' }}>
              {categories.map(cat => (
                <li
                  key={cat._id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px',
                  }}
                >
                  <div
                    style={{
                      width: '14px',
                      height: '14px',
                      backgroundColor: cat.color,
                      borderRadius: '50%',
                    }}
                  ></div>
                  <span>{cat.name}</span>
                  {/* Kategori Silme Butonu */}
                  <button
                    onClick={() => handleKategoriSil(cat._id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px',
                    }}
                  >
                    <img src={deleteIcon} alt="Sil" style={{ width: '20px', height: '20px' }} />
                  </button>
                </li>
              ))}
            </ul>

            {/* Yeni Kategori Adı ve Renk Seçimi */}
            <input
              type="text"
              placeholder="Kategori adı"
              value={yeniKategoriAdi}
              onChange={(e) => setYeniKategoriAdi(e.target.value)}
              style={{
                padding: '8px 10px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
            <input
              type="color"
              value={yeniKategoriRenk}
              onChange={(e) => setYeniKategoriRenk(e.target.value)}
              style={{
                height: '38px',
                width: '100%',
                border: 'none',
                background: 'none',
                cursor: 'pointer'
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
              <button
                onClick={handleKategoriEkle}
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  backgroundColor: '#6E3D69',
                  color: '#fff',
                  border: 'none',
                  fontWeight: 'bold',
                  width: '48%',
                  cursor: 'pointer'
                }}
              >
                Ekle
              </button>
              <button
                onClick={() => setShowCategoryModal(false)}
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  backgroundColor: '#ccc',
                  color: '#2f3e46',
                  border: 'none',
                  fontWeight: 'bold',
                  width: '48%',
                  cursor: 'pointer'
                }}
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
      {showEditModal && selectedTaskToEdit && (
  <EditTaskModal
  task={selectedTaskToEdit}
  onClose={() => setShowEditModal(false)}
  onUpdateTask={handleUpdateTaskAndClose} // ✅ bu yeni fonksiyon!
  tema={tema}
/>

)}

    </div>
  );
}

export default TaskList;
