import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // ✅ Bu önemli!
import './CalendarPage.css';
import plusIcon from '../assets/plus-icon.png'; // TaskList ile aynı ikon
import TaskModal from './TaskModal'; // 📌 TaskModal bileşenini import et
import { useState } from 'react';


function CalendarPage({ tasks, selectedDate, setSelectedDate, onAddTaskClick }) {
  const events = tasks.map((task) => {
  const category = task.category || 'Genel';
  const renkler = {
    'Genel': '#CBAACB',      // yumuşak lila
    'İş': '#A9849F',         // mürdüm-gri
    'Okul': '#90CAF9',       // pastel mavi
    'Kişisel': '#F8BBD0',    // açık pembe
    'Sağlık': '#FFE082',     // pastel sarı
    'Sosyal': '#AED581',     // yumuşak yeşil
    'Alışveriş': '#FFAB91',  // mercan tonu
    'Finans': '#B0BEC5',     // soft gri-mavi
    'Seyahat': '#CE93D8',    // pastel mor
    'Hobi': '#D7CCC8'        // taş rengi
  };

  return {
    title: task.title,
    date: task.dueDate,
    color: renkler[category] || '#6c757d',
  };
});

  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="fc-container">
      <div className="fc-header">
        <h2>Takvim</h2>
        <button className="add-task-button" onClick={() => onAddTaskClick()}>
          <img src={plusIcon} alt="Ekle" style={{ width: '16px', height: '16px', marginRight: '6px' }} />
          Görev Ekle
        </button>

      </div>

      <FullCalendar
  plugins={[dayGridPlugin, interactionPlugin]}
  initialView="dayGridMonth"
  headerToolbar={{
    start: 'prev,next',
    center: 'title',
    end: 'dayGridMonth,dayGridWeek,dayGridDay'
  }}
  events={events}
  eventClick={(info) => {
  const clickedTask = tasks.find(task => task.title === info.event.title && task.dueDate === info.event.startStr);
  if (clickedTask) {
    setSelectedTask(clickedTask);
    setIsModalOpen(true);
  }
}}

  dateClick={(info) => {
    if (onAddTaskClick) {
      onAddTaskClick(info.dateStr);
    }
  }}
  locale="tr"
  height="auto"
/>
{isModalOpen && selectedTask && (
  <TaskModal
    task={selectedTask}
    onClose={() => setIsModalOpen(false)}
    tema="light" // tema prop'un varsa buraya onu koy
  />
)}

    </div>
  );
}

export default CalendarPage;
