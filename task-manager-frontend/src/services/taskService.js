// frontend/src/services/taskService.js
const API_BASE_URL = import.meta.env.VITE_API_URL;

class TaskService {
  // Generic HTTP request handler
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

  // Project endpoints
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

  // Task endpoints
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

  // Task status update
  async updateTaskStatus(id, status) {
    return this.request(`/tasks/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  // Member endpoints
  async getMembers() {
    return this.request('/members');
  }

  async getMember(id) {
    return this.request(`/members/${id}`);
  }

  async createMember(memberData) {
    return this.request('/members', {
      method: 'POST',
      body: JSON.stringify(memberData),
    });
  }

  async updateMember(id, memberData) {
    return this.request(`/members/${id}`, {
      method: 'PUT',
      body: JSON.stringify(memberData),
    });
  }

  async deleteMember(id) {
    return this.request(`/members/${id}`, {
      method: 'DELETE',
    });
  }

  // Project member assignments
  async getProjectMembers(projectId) {
    return this.request(`/projects/${projectId}/members`);
  }

  async addProjectMember(projectId, memberId) {
    return this.request(`/projects/${projectId}/members`, {
      method: 'POST',
      body: JSON.stringify({ memberId }),
    });
  }

  async removeProjectMember(projectId, memberId) {
    return this.request(`/projects/${projectId}/members/${memberId}`, {
      method: 'DELETE',
    });
  }

  // Comment endpoints
  async getTaskComments(taskId) {
    return this.request(`/tasks/${taskId}/comments`);
  }

  async createTaskComment(taskId, commentData) {
    return this.request(`/tasks/${taskId}/comments`, {
      method: 'POST',
      body: JSON.stringify(commentData),
    });
  }

  async updateTaskComment(commentId, commentData) {
    return this.request(`/comments/${commentId}`, {
      method: 'PUT',
      body: JSON.stringify(commentData),
    });
  }

  async deleteTaskComment(commentId) {
    return this.request(`/comments/${commentId}`, {
      method: 'DELETE',
    });
  }

  // Attachment endpoints
  async getTaskAttachments(taskId) {
    return this.request(`/tasks/${taskId}/attachments`);
  }

  async uploadTaskAttachment(taskId, fileData) {
    const formData = new FormData();
    formData.append('file', fileData);
    
    return this.request(`/tasks/${taskId}/attachments`, {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    });
  }

  async deleteTaskAttachment(attachmentId) {
    return this.request(`/attachments/${attachmentId}`, {
      method: 'DELETE',
    });
  }

  // Search endpoints
  async searchTasks(query, projectId = null) {
    const params = new URLSearchParams({ q: query });
    if (projectId) params.append('projectId', projectId);
    
    return this.request(`/search/tasks?${params}`);
  }

  // Dashboard/Statistics endpoints
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
}

export const taskService = new TaskService();