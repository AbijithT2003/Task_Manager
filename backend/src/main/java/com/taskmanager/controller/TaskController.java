 package com.taskmanager.controller;

import com.taskmanager.dto.TaskCreateDto;
import com.taskmanager.dto.TaskDto;
import com.taskmanager.model.Task.TaskPriority;
import com.taskmanager.model.Task.TaskStatus;
import com.taskmanager.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Task Management", description = "APIs for managing tasks")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")

public class TaskController {

    private final TaskService taskService;

    @PostMapping
    @Operation(summary = "Create a new task", description = "Creates a new task with the provided details")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Task created successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid input data")
    })
    public ResponseEntity<TaskDto> createTask(@Valid @RequestBody TaskCreateDto createDto) {
        log.info("Creating new task with title: {}", createDto.getTitle());
        TaskDto created = taskService.createTask(createDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping
    @Operation(summary = "Get all tasks", description = "Retrieves all tasks")
    @ApiResponse(responseCode = "200", description = "Tasks retrieved successfully")
    public ResponseEntity<List<TaskDto>> getAllTasks() {
        log.info("Retrieving all tasks");
        List<TaskDto> tasks = taskService.getAllTasks();
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get task by ID", description = "Retrieves a specific task by its ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Task found"),
        @ApiResponse(responseCode = "404", description = "Task not found")
    })
    public ResponseEntity<TaskDto> getTaskById(
            @Parameter(description = "Task ID", required = true)
            @PathVariable Long id) {
        log.info("Retrieving task with ID: {}", id);
        TaskDto task = taskService.getTaskById(id);
        return ResponseEntity.ok(task);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update task", description = "Updates an existing task with new details")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Task updated successfully"),
        @ApiResponse(responseCode = "404", description = "Task not found"),
        @ApiResponse(responseCode = "400", description = "Invalid input data")
    })
    public ResponseEntity<TaskDto> updateTask(
            @Parameter(description = "Task ID", required = true)
            @PathVariable Long id,
            @Valid @RequestBody TaskCreateDto updateDto) {
        log.info("Updating task with ID: {}", id);
        TaskDto updated = taskService.updateTask(id, updateDto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete task", description = "Deletes a task by its ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Task deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Task not found")
    })
    public ResponseEntity<Void> deleteTask(
            @Parameter(description = "Task ID", required = true)
            @PathVariable Long id) {
        log.info("Deleting task with ID: {}", id);
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/status/{status}")
    @Operation(summary = "Get tasks by status", description = "Retrieves tasks filtered by status")
    public ResponseEntity<List<TaskDto>> getTasksByStatus(
            @Parameter(description = "Task status", required = true)
            @PathVariable TaskStatus status) {
        log.info("Retrieving tasks with status: {}", status);
        List<TaskDto> tasks = taskService.getTasksByStatus(status);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/priority/{priority}")
    @Operation(summary = "Get tasks by priority", description = "Retrieves tasks filtered by priority")
    public ResponseEntity<List<TaskDto>> getTasksByPriority(
            @Parameter(description = "Task priority", required = true)
            @PathVariable TaskPriority priority) {
        log.info("Retrieving tasks with priority: {}", priority);
        List<TaskDto> tasks = taskService.getTasksByPriority(priority);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/overdue")
    @Operation(summary = "Get overdue tasks", description = "Retrieves all overdue tasks")
    public ResponseEntity<List<TaskDto>> getOverdueTasks() {
        log.info("Retrieving overdue tasks");
        List<TaskDto> tasks = taskService.getOverdueTasks();
        return ResponseEntity.ok(tasks);
    }
    // --- Additional methods can be added here as needed ---{    
}
