// frontend/src/App.js
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Header from './components/Header/Header';
import KanbanBoard from './components/KanbanBoard/KanbanBoard';
import TaskModal from './components/TaskModal/TaskModal';
import { taskService } from './services/taskService';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('kanban');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');



  useEffect(() => {
    loadTasks();
    loadCategories();
  }, []);

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await taskService.getAllTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadCategories = async () => {
  try {
    const response = await taskService.getCategories();
    setCategories(response.data);
  } catch (error) {
    console.error('Error loading categories:', error);
  }
  };
  const handleCategoryCreate = async (categoryData) => {
  try {
    const response = await taskService.createCategory(categoryData);
    setCategories(prevCategories => [...prevCategories, response.data]);
  } catch (error) {
    console.error('Error creating category:', error);
  }
  };
  const handleStatusChange = async (taskId, newStatus) => {
  try {
    await taskService.updateTaskStatus(taskId, newStatus);
    const { data } = await taskService.getAllTasks(); // Refresh tasks
    setTasks(data); // Update your local state
    loadTasks(); // Reload tasks to ensure UI is updated
  } catch (err) {
    console.error('Failed to update status', err);
  }
};



  const handleTaskCreate = async (taskData) => {
    if (!taskData?.title) return;
    try {
      const response = await taskService.createTask(taskData);
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setIsTaskModalOpen(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleTaskUpdate = async (taskId, updates) => {
    try {
      const response = await taskService.updateTask(taskId, updates);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? response.data : task
        )
      );
      if (selectedTask && selectedTask.id === taskId) {
        setSelectedTask(response.data);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleTaskDelete = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      setIsTaskModalOpen(false);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleTaskMove = async (taskId, newStatus) => {
    await handleTaskUpdate(taskId, { status: newStatus });
  };

  const openTaskModal = (task = null) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const closeTaskModal = () => {
    setSelectedTask(null);
    setIsTaskModalOpen(false);
  };

  const handleAddTask = () => {
    openTaskModal();
  };
  const handleDeleteTask = async (taskId) => {
    await taskService.deleteTask(taskId);
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === '' || task.categoryId === parseInt(selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [tasks, searchTerm, selectedCategory]);

  return (
    <div className="app">
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onAddTask={handleAddTask}
        categories={categories} 
        selectedCategory={selectedCategory} 
        onCategoryFilter={setSelectedCategory} 
      />

      <main className="main-content">
        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : (
          <KanbanBoard
            tasks={filteredTasks}
            onTaskClick={openTaskModal}
            onTaskMove={handleTaskMove}
            onCreateTask={openTaskModal}
            categories={categories}
            onCategoryCreate={handleCategoryCreate}
            onDeleteTask={handleDeleteTask}
            onStatusChange={handleStatusChange}
          />
        )}
      </main>

      {isTaskModalOpen && (
        <TaskModal
          task={selectedTask}
          categories={categories}
          onSave={
            selectedTask
              ? (updates) => handleTaskUpdate(selectedTask.id, updates)
              : handleTaskCreate
          }
          onDelete={
            selectedTask ? () => handleTaskDelete(selectedTask.id) : null
          }
          onClose={closeTaskModal}
        />
      )}
    </div>
  );
}

export default App;
