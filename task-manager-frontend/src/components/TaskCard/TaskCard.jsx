// frontend/src/components/TaskCard.js
import React from 'react';
import { MessageCircle, Paperclip, CheckSquare, Clock } from 'lucide-react';
import './TaskCard.css';

const TaskCard = ({ task, members, onClick, onDragStart }) => {
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'green';
      default: return 'gray';
    }
  };

  const getAssignedMember = (assigneeId) => {
    return members.find(member => member.id === assigneeId);
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

  const assignedMember = getAssignedMember(task.assigneeId);
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

        {/* Assigned Member */}
        {assignedMember && (
          <div className="task-assignee">
            <img
              src={assignedMember.avatar || `https://ui-avatars.com/api/?name=${assignedMember.name}&background=random`}
              alt={assignedMember.name}
              title={assignedMember.name}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;