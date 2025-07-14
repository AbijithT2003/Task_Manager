// frontend/src/components/TaskCard.js
import React from 'react';
import { MessageCircle, Paperclip, CheckSquare, Clock ,Trash2, Play, CheckCircle, RotateCcw } from 'lucide-react';
import './TaskCard.css';

const TaskCard = ({ task, onClick, onDragStart,onDelete,onStatusChange   }) => {
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
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const nowOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const isToday = dateOnly.getTime() === nowOnly.getTime();
    const isOverdue = dateOnly < nowOnly;
    
    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit',hour12: false });
    
      if (isToday) {
      return { text: `Today ${timeString}`, urgent: true };
    } else if (isOverdue) {
      const daysDiff = Math.ceil((nowOnly - dateOnly) / (1000 * 60 * 60 * 24));
      return { text: `${daysDiff} day${daysDiff > 1 ? 's' : ''} overdue`, urgent: true };
    } else {
      const dateString = date.toLocaleDateString([], {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      });
      return { text: `${dateString} ${timeString}`, urgent: false };
    }
  }
const getNextStatus = (currentStatus) => {
  const statusFlow = {
    'TODO': 'IN_PROGRESS',
    'IN_PROGRESS': 'COMPLETED',
    'COMPLETED': 'TODO'
  };
  return statusFlow[currentStatus] || 'TODO';
};

const getStatusIcon = (status) => {
  const icons = {
    'TODO': Play,
    'IN_PROGRESS': CheckCircle,
    'COMPLETED': RotateCcw
  };
  return icons[status];
};
  const dueDateInfo = formatDueDate(task.dueDate);
  const StatusIcon = getStatusIcon(task.status);
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
        <div className="task-actions">
    <button 
      className="quick-status-btn"
      onClick={(e) => {
        e.stopPropagation(); // prevent modal open
        onStatusChange(task.id, getNextStatus(task.status));
        console.log("Changing task", task, "to status:", StatusIcon.name);

      }}
      title={`Move to ${getNextStatus(task.status)}`}
    >
      <StatusIcon size={16} />
    </button>
  </div>
      </div>
    </div>
  );
};

export default TaskCard;
