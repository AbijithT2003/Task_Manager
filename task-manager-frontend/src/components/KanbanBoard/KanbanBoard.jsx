// frontend/src/components/KanbanBoard.js
import React from 'react';
import { Plus,Trash2  } from 'lucide-react';
import TaskCard from "../TaskCard/TaskCard.jsx";
import './KanbanBoard.css';

const KanbanBoard = ({ tasks, onTaskClick, onTaskMove, onCreateTask, onDeleteTask, onStatusChange }) => {
  const columns = [
  { id: 'todo', title: 'To Do', status: 'TODO', color: 'purple' },
  { id: 'in_progress', title: 'In Progress', status: 'IN_PROGRESS', color: 'blue' },
  { id: 'completed', title: 'Completed', status: 'COMPLETED', color: 'green' }
];
  const getTasksForColumn = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData('text/plain', task.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    const taskId = parseInt(e.dataTransfer.getData('text/plain'));
    const task = tasks.find(t => t.id === taskId);
    
    if (task && task.status !== status) {
      onTaskMove(taskId, status);
    }
  };

  return (
    <div className="kanban-board">
      {columns.map(column => {
        const columnTasks = getTasksForColumn(column.status);
        const handleClearCompleted = async () => {
        const completedTasks = columnTasks.filter(task => task.status === 'COMPLETED');
        for (const task of completedTasks) {
          await onDeleteTask(task.id);
        }
      };
        return (
          <div 
            key={column.id} 
            className={`kanban-column ${column.color}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.status)}
          >
            <div className="column-header">
              <div className="column-title">
                <h3>{column.title}</h3>
                <span className="task-count">{columnTasks.length}</span>
              </div>
              <button 
                className="add-task-btn"
                onClick={() => onCreateTask({ status: column.status })}
              >
                <Plus size={16} />
              </button>
            </div>

            <div className="column-content">
              {columnTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onClick={() => onTaskClick(task)}
                  onDragStart={(e) => handleDragStart(e, task)}
                  onDelete={onDeleteTask}
                  onStatusChange={onStatusChange}
                />
              ))}
              
              {column.id === 'completed' ? (
                <button 
                  className="clear-completed-btn"
                  onClick={handleClearCompleted}
                  disabled={columnTasks.length === 0}
                >
                  <Trash2 size={16} />
                  Clear Completed ({columnTasks.length})
                </button>
              ) : (
                <button 
                  className="add-new-task-btn"
                  onClick={() => onCreateTask({ status: column.status })}
                >
                  <Plus size={16} />
                  Add new task
                </button>
               )} 
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default KanbanBoard;