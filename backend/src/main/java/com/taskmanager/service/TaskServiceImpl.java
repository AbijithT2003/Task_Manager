package com.taskmanager.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import com.taskmanager.dto.TaskCreateDto;
import com.taskmanager.dto.TaskDto;
import com.taskmanager.exception.ResourceNotFoundException;
import com.taskmanager.model.Task;
import com.taskmanager.model.Task.TaskPriority;
import com.taskmanager.model.Task.TaskStatus;
import com.taskmanager.repository.TaskRepository;
//import com.taskmanager.service.TaskService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;

    @Override
    public TaskDto createTask(TaskCreateDto createDto) {
        Task task = mapToEntity(createDto);
        Task saved = taskRepository.save(task);
        log.info("Created task with ID: {}", saved.getId());
        return mapToDto(saved);
    }

    @Override
    public TaskDto getTaskById(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with ID: " + id));
        return mapToDto(task);
    }

    @Override
    public TaskDto updateTask(Long id, TaskCreateDto updateDto) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with ID: " + id));
        
        task.setTitle(updateDto.getTitle());
        task.setDescription(updateDto.getDescription());
        task.setStatus(updateDto.getStatus());
        task.setPriority(updateDto.getPriority());
        task.setDueDate(updateDto.getDueDate());
        task.setUpdatedAt(LocalDateTime.now());
        
        Task updated = taskRepository.save(task);
        log.info("Updated task with ID: {}", updated.getId());
        return mapToDto(updated);
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
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<TaskDto> getTasksByStatus(TaskStatus status) {
        return taskRepository.findByStatus(status).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<TaskDto> getTasksByPriority(TaskPriority priority) {
        return taskRepository.findByPriority(priority).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<TaskDto> getOverdueTasks() {
        return taskRepository.findOverdueTasks(LocalDateTime.now(), TaskStatus.COMPLETED).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    // --- Mapping methods ---
    private TaskDto mapToDto(Task task) {
        return TaskDto.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .status(task.getStatus())
                .priority(task.getPriority())
                .dueDate(task.getDueDate())
                .createdAt(task.getCreatedAt())
                .updatedAt(task.getUpdatedAt())
                .build();
    }

    private Task mapToEntity(TaskCreateDto Dto) {
        return Task.builder()
                .title(Dto.getTitle())
                .description(Dto.getDescription())
                .status(Dto.getStatus())
                .priority(Dto.getPriority())
                .dueDate(Dto.getDueDate())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
    }
}