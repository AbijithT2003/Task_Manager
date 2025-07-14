package com.taskmanager.service;

import com.taskmanager.dto.TaskCreateDto;
import com.taskmanager.dto.TaskDto;
import com.taskmanager.model.Task.TaskPriority;
import com.taskmanager.model.Task.TaskStatus;

import java.util.List;

public interface TaskService {
    
    /**
     * Creates a new task
     * @param createDto Task creation data
     * @return Created task Dto
     */
    TaskDto createTask(TaskCreateDto createDto);
    
    /**
     * Updates an existing task
     * @param id Task ID
     * @param updateDto Task update data
     * @return Updated task Dto
     */
    TaskDto updateTask(Long id, TaskCreateDto updateDto);
    
    /**
     * Deletes a task by ID
     * @param id Task ID
     */
    void deleteTask(Long id);
    
    /**
     * Retrieves all tasks
     * @return List of all tasks
     */
    List<TaskDto> getAllTasks();
    
    /**
     * Retrieves a task by ID
     * @param id Task ID
     * @return Task Dto
     */
    TaskDto getTaskById(Long id);
    
    /**
     * Retrieves tasks by status
     * @param status Task status
     * @return List of tasks with the specified status
     */
    List<TaskDto> getTasksByStatus(TaskStatus status);
    

    void updateTaskStatus(Long id, String status);
    

    /**
     * Retrieves tasks by priority
     * @param priority Task priority
     * @return List of tasks with the specified priority
     */
    List<TaskDto> getTasksByPriority(TaskPriority priority);
    
    /**
     * Retrieves all overdue tasks
     * @return List of overdue tasks
     */
    List<TaskDto> getOverdueTasks();
}