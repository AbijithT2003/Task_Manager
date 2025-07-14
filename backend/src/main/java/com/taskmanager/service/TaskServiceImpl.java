package com.taskmanager.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import com.taskmanager.dto.TaskCreateDto;
import com.taskmanager.dto.TaskDto;
import com.taskmanager.exception.ResourceNotFoundException;
import com.taskmanager.mapper.TaskMapper;
import com.taskmanager.model.Task;
import com.taskmanager.model.Task.TaskPriority;
import com.taskmanager.model.Task.TaskStatus;
import com.taskmanager.repository.TaskRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper; // ✅ corrected casing
    private final CategoryResolver categoryResolver;

    @Override
    public TaskDto createTask(TaskCreateDto createDto) {
        Task task = taskMapper.toEntity(createDto, categoryResolver); // assuming method updated
        task.setCreatedAt(LocalDateTime.now());
        task.setUpdatedAt(LocalDateTime.now());
        Task saved = taskRepository.save(task);
        return taskMapper.toDTO(saved);
    }

    @Override
    public TaskDto getTaskById(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with ID: " + id));
        return taskMapper.toDTO(task);
    }

    @Override
    public TaskDto updateTask(Long id, TaskCreateDto updateDto) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with ID: " + id));

        taskMapper.updateEntity(task, updateDto, categoryResolver); // assuming method updated
        task.setUpdatedAt(LocalDateTime.now());

        Task updated = taskRepository.save(task);
        log.info("Updated task with ID: {}", updated.getId());
        return taskMapper.toDTO(updated);
    }

    @Override
    public void deleteTask(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new ResourceNotFoundException("Task not found with ID: " + id);
        }
        taskRepository.deleteById(id);
        log.info("Deleted task with ID: {}", id);
    }

    @Override
    public List<TaskDto> getAllTasks() {
        return taskRepository.findAll().stream()
                .map(taskMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<TaskDto> getTasksByStatus(TaskStatus status) {
        return taskRepository.findByStatus(status).stream()
                .map(taskMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<TaskDto> getTasksByPriority(TaskPriority priority) {
        return taskRepository.findByPriority(priority).stream()
                .map(taskMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<TaskDto> getOverdueTasks() {
        return taskRepository.findOverdueTasks(LocalDateTime.now(), TaskStatus.COMPLETED).stream()
                .map(taskMapper::toDTO)
                .collect(Collectors.toList());
    }
    @Override
    public void updateTaskStatus(Long id, String status) {
        Task task = taskRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        task.setStatus(TaskStatus.valueOf(status.toUpperCase())); // Assuming Enum
        task.setUpdatedAt(LocalDateTime.now());
        taskRepository.save(task);
    }

}
