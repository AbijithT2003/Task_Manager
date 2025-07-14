// frontend/src/components/TaskCard.js
import React from 'react';
import { MessageCircle, Paperclip, CheckSquare, Clock ,Trash2 } from 'lucide-react';
import './TaskCard.css';

const TaskCard = ({ task, onClick, onDragStart,onDelete  }) => {
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'green';
      default: return 'gray';
    }
  };
 
  const formatDueDate = (dueDate) => {
    if (!dueDate) return null;
    
    const date = new Date(dueDate);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const isOverdue = date < now && !isToday;
    
    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    if (isToday) {
      return { text: `Today ${timeString}`, urgent: true };
    } else if (isOverdue) {
      return { text: `Overdue ${timeString}`, urgent: true };
    } else {
      return { text: date.toLocaleDateString() + ' ' + timeString, urgent: false };
    }
  };

  const dueDateInfo = formatDueDate(task.dueDate);

  return (
    <div 
      className={`task-card ${task.completed ? 'completed' : ''}`}
      onClick={onClick}
      draggable
      onDragStart={onDragStart}
    >
      {/* Task Title */}
      <div className="task-title">
        <h4>{task.title}</h4>
        {task.completed && <CheckSquare className="completed-icon" size={16} />}
        <button className="delete-btn" onClick={(e) => {
          e.stopPropagation(); // prevent modal trigger
          onDelete(task.id);
        }}>
          <Trash2 size={14} />
        </button>
        </div>

      {/* Task Description */}
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      {/* Due Date */}
      {dueDateInfo && (
        <div className={`task-due-date ${dueDateInfo.urgent ? 'urgent' : ''}`}>
          <Clock size={12} />
          <span>{dueDateInfo.text}</span>
        </div>
      )}

      {/* Priority Badge */}
      {task.priority && (
        <div className={`priority-badge ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </div>
      )}
      {/* Category Badge */}
      {task.categoryName && (
        <div className="category-badge" data-category={task.categoryName.toLowerCase()}>
          {task.categoryName}
        </div>
      )}


      {/* Task Footer */}
      <div className="task-footer">
        <div className="task-stats">
          {/* Comments */}
          {task.commentsCount > 0 && (
            <div className="task-stat">
              <MessageCircle size={14} />
              <span>{task.commentsCount}</span>
            </div>
          )}

          {/* Attachments */}
          {task.attachmentsCount > 0 && (
            <div className="task-stat">
              <Paperclip size={14} />
              <span>{task.attachmentsCount}</span>
            </div>
          )}

          {/* Subtasks */}
          {task.subtasksCount > 0 && (
            <div className="task-stat">
              <CheckSquare size={14} />
              <span>{task.subtasksCount}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
