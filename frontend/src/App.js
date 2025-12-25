import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import { useNavigate } from 'react-router-dom';
import axios from './utils/axiosInstance';
import CalendarPage from './components/CalendarPage';

import './App.css';

function App() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('Bugün');
  const [aktifKategori, setAktifKategori] = useState('Tümü');
  const [tamamlananlariGoster, setTamamlananlariGoster] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tema, setTema] = useState('light');
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [modalInitialDate, setModalInitialDate] = useState(null);


  const API_BASE = 'http://localhost:5000/api';

  // Giriş kontrolü
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  // Kullanıcı verisini al
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Temayı body sınıfına aktar
  useEffect(() => {
    document.body.className = tema;
  }, [tema]);

  // Başlangıçta görev ve kategori verilerini getir
  useEffect(() => {
    fetchTasks();
    axios.get(`${API_BASE}/categories`)
      .then(res => setCategories(res.data))
      .catch(err => console.error('Kategorileri alma hatası:', err));
  }, []);

  // Görevleri getir
  const fetchTasks = () => {
    axios.get(`${API_BASE}/tasks`)
      .then(res => setTasks(res.data))
      .catch(err => console.error('Görevleri alma hatası:', err));
  };

  // Yeni görev ekle
  const handleAddTask = (title = '', date = '', category = 'Genel',description = '') => {
    if (typeof title !== 'string' || title.trim() === '') return;

    const newTask = {
      title,
      dueDate: date,
      category,
      description,
      completed: false,
    };

    axios.post(`${API_BASE}/tasks`, newTask)
      .then(() => {
        fetchTasks(); // ✅ Listeyi yeniden getir
      })
      .catch(err => console.error('Görev ekleme hatası:', err.response?.data || err.message));
  };

  // Görev sil
  const handleDeleteTask = (id) => {
    axios.delete(`${API_BASE}/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter(task => task._id !== id));
      })
      .catch(err => console.error('Silme hatası:', err.response?.data || err.message));
  };

  // Görev başlığını güncelle
  const handleEditTaskTitle = (id, newTitle) => {
    const taskToUpdate = tasks.find(task => task._id === id);
    if (!taskToUpdate) return;

    axios.put(`${API_BASE}/tasks/${id}`, {
      ...taskToUpdate,
      title: newTitle,
    }).then(res => {
      const updated = tasks.map(task => task._id === id ? res.data : task);
      setTasks(updated);
    });
  };

  // Tamamlandı durumunu değiştir
  const handleToggleTask = (id) => {
    const taskToToggle = tasks.find(task => task._id === id);
    if (!taskToToggle) return;

    axios.put(`${API_BASE}/tasks/${id}`, {
      ...taskToToggle,
      completed: !taskToToggle.completed,
    }).then(res => {
      const updated = tasks.map(task => task._id === id ? res.data : task);
      setTasks(updated);
    });
  };
  const filteredTasks = tasks.filter((task) => {
  if (selectedFilter === 'Tamamlananlar') {
    return task.completed === true;
  } else if (selectedFilter === 'Tümü') {
    return true;
  } else {
    return task.category === selectedFilter;
  }
});


  // Yeni kategori ekle
  const handleAddCategory = (name, color) => {
    if (name.trim() === '') return;

    axios.post(`${API_BASE}/categories`, { name, color })
      .then(res => setCategories([...categories, res.data]))
      .catch(err => console.error('Kategori ekleme hatası:', err));
  };

  // Kategori sil
 const handleDeleteCategory = async (categoryId) => {
  try {
    // Backend'e DELETE isteği gönder
    await axios.delete(`/categories/${categoryId}`);


    // State içinden kategoriyi çıkar
    setCategories((prev) => prev.filter(cat => cat._id !== categoryId));
  } catch (error) {
    console.error('Kategori silinirken hata oluştu:', error);
    alert('Kategori silinemedi. Lütfen tekrar deneyin.');
  }
};
const handleUpdateTask = (updatedTask) => {
  axios
    .put(`${API_BASE}/tasks/${updatedTask._id}`, updatedTask)
    .then((res) => {
      const newTasks = tasks.map((task) =>
        task._id === updatedTask._id ? res.data : task
      );
      setTasks(newTasks);
    })
    .catch((err) =>
      console.error('Görev güncelleme hatası:', err.response?.data || err.message)
    );
};



  // Filtreli görev listesi
  const getFilteredTasks = () => {
  if (!Array.isArray(tasks)) return [];

  const today = new Date().toISOString().split('T')[0];
  let filtered = [...tasks];
   
if (selectedFilter === 'Takvim' && selectedDate) {
  filtered = filtered.filter(task => task.dueDate === selectedDate);
}
  // ✅ Öncelikle Tamamlananlar filtresi uygulanır
  if (selectedFilter === 'Tamamlananlar') {
    return filtered.filter(task => task.completed);
  }if (selectedFilter === 'Tamamlananlar') {
  const now = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(now.getDate() - 7);

  return filtered.filter(task => {
    const updated = new Date(task.updatedAt);
    return task.completed && updated >= oneWeekAgo && updated <= now;
  });
}


  // Bugün filtresi
  if (selectedFilter === 'Bugün') {
    filtered = filtered.filter(task => task.dueDate === today);
  }

  // Yaklaşan filtresi
  if (selectedFilter === 'Yaklaşan') {
    filtered = filtered
      .filter(task => task.dueDate > today)
      .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  }

  // ✅ Aktif kategori sadece "Tamamlananlar" harici durumlarda uygulanmalı
  if (aktifKategori !== 'Tümü') {
    filtered = filtered.filter(task => task.category === aktifKategori);
  }

  // Tamamlananları gizle seçeneği aktifse
  if (!tamamlananlariGoster) {
    filtered = filtered.filter(task => !task.completed);
  }

  // ✅ Arama filtresi
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(term) ||
        (task.description && task.description.toLowerCase().includes(term))
      );
    }



  return filtered;
};


  return (
    <div className={`app-container ${tema}`}>
      
      <Sidebar
        setSelectedFilter={setSelectedFilter}
        selectedFilter={selectedFilter}
        setAktifKategori={setAktifKategori}
        aktifKategori={aktifKategori}
        categories={categories}
        
      />

      <div className="main-content">
        
        <Header tema={tema} setTema={setTema} 
        searchTerm={searchTerm}           // ✅ Eklendi
          setSearchTerm={setSearchTerm}     // ✅ Eklendi
        />
      
        

        
        {selectedFilter === 'Takvim' ? (
        <CalendarPage
          tasks={tasks}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
    
          onAddTaskClick={(clickedDate) => {
          setModalInitialDate(clickedDate || new Date().toISOString().split('T')[0]);
          setTaskModalOpen(true);
  
            }}

        />
    
 ) : (

        <TaskList
          tasks={getFilteredTasks()}
          onToggleTask={handleToggleTask}
          onDeleteTask={handleDeleteTask}
          onEditTaskTitle={handleEditTaskTitle}
          categories={categories}
          onOpenModal={setSelectedTask}
          onAddTaskInline={handleAddTask}
          onAddCategory={handleAddCategory}
          tamamlananlariGoster={tamamlananlariGoster}
          setTamamlananlariGoster={setTamamlananlariGoster}
          selectedFilter={selectedFilter}
          tema={tema}
          onDeleteCategory={handleDeleteCategory}
          setSelectedFilter={setSelectedFilter}
            onUpdateTask={handleUpdateTask}  // ✅ Bunu ekle

        />
 )}


        {selectedTask && (
          <TaskModal
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
            tema={tema}
          />
        )}
        {taskModalOpen && (
          <TaskModal
            task={null}
            onClose={() => setTaskModalOpen(false)}
            tema={tema}
            initialDate={modalInitialDate}
            onAddTask={handleAddTask}
          />
 )}

      </div>
    </div>
  );
}

export default App;
