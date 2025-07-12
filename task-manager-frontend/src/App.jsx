// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import KanbanBoard from './components/KanbanBoard/KanbanBoard';
import TaskModal from './components/TaskModal/TaskModal';

import { taskService } from './services/taskService';
import './App.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState('kanban');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    //loadProjects();
   // loadMembers();
  }, []);

  // Load tasks when project changes
  useEffect(() => {
    if (currentProject) {
     // loadTasks();
    }
  }, [currentProject]);

  const loadProjects = async () => {
    try {
      const response = await taskService.getProjects();
      setProjects(response.data);
      if (response.data.length > 0) {
        setCurrentProject(response.data[0]);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  const loadTasks = async () => {
    try {
      setLoading(true);
      const response = await taskService.getTasks(currentProject.id);
      setTasks(response.data);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMembers = async () => {
    try {
      const response = await taskService.getMembers();
      setMembers(response.data);
    } catch (error) {
      console.error('Error loading members:', error);
    }
  };

  const handleProjectChange = (project) => {
    setCurrentProject(project);
  };

  const handleTaskCreate = async (taskData) => {
    try {
      const response = await taskService.createTask({
        ...taskData,
        projectId: currentProject.id
      });
      setTasks(prevTasks => [...prevTasks, response.data]);
      setIsTaskModalOpen(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleTaskUpdate = async (taskId, updates) => {
    try {
      const response = await taskService.updateTask(taskId, updates);
      setTasks(prevTasks =>
        prevTasks.map(task =>
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
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
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

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || task.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="app">
      <Header
        projects={projects}
        currentProject={currentProject}
        onProjectChange={handleProjectChange}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        members={members}
        onAddMember={() => console.log('Add member clicked')}
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
            members={members}
          />
        )}
      </main>

      {isTaskModalOpen && (
        <TaskModal
          task={selectedTask}
          members={members}
          onSave={selectedTask ? 
            (updates) => handleTaskUpdate(selectedTask.id, updates) : 
            handleTaskCreate
          }
          onDelete={selectedTask ? () => handleTaskDelete(selectedTask.id) : null}
          onClose={closeTaskModal}
        />
      )}
    </div>
  );
}

export default App;