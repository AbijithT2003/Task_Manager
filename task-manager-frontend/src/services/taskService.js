// frontend/src/services/taskService.js
const API_BASE_URL = import.meta.env.VITE_API_URL;

class TaskService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { data, status: response.status };
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Project Endpoints
  async getProjects() {
    return this.request('/projects');
  }

  async getProject(id) {
    return this.request(`/projects/${id}`);
  }

  async createProject(projectData) {
    return this.request('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  }

  async updateProject(id, projectData) {
    return this.request(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(projectData),
    });
  }

  async deleteProject(id) {
    return this.request(`/projects/${id}`, {
      method: 'DELETE',
    });
  }

  // Task Endpoints
  async getTasks(projectId) {
    return this.request(`/projects/${projectId}/tasks`);
  }

  async getTask(id) {
    return this.request(`/tasks/${id}`);
  }

  async createTask(taskData) {
    return this.request('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  }

  async updateTask(id, taskData) {
    return this.request(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
  }

  async deleteTask(id) {
    return this.request(`/tasks/${id}`, {
      method: 'DELETE',
    });
  }

  async updateTaskStatus(id, status) {
    return this.request(`/tasks/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  // Optional: Dashboard/Stats
  async getDashboardStats(projectId = null) {
    const params = projectId ? `?projectId=${projectId}` : '';
    return this.request(`/dashboard/stats${params}`);
  }

  async getTasksByStatus(projectId) {
    return this.request(`/projects/${projectId}/tasks/by-status`);
  }

  async getTasksByPriority(projectId) {
    return this.request(`/projects/${projectId}/tasks/by-priority`);
  }

  async getOverdueTasks(projectId = null) {
    const params = projectId ? `?projectId=${projectId}` : '';
    return this.request(`/tasks/overdue${params}`);
  }

  // Optional: Search
  async searchTasks(query, projectId = null) {
    const params = new URLSearchParams({ q: query });
    if (projectId) params.append('projectId', projectId);
    return this.request(`/search/tasks?${params}`);
  }
}

export const taskService = new TaskService();
