package com.taskmanager.repository;

import com.taskmanager.model.Task;
import com.taskmanager.model.Task.TaskPriority;
import com.taskmanager.model.Task.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    
    // Find tasks by status
    List<Task> findByStatus(TaskStatus status);
    
    // Find tasks by priority
    List<Task> findByPriority(TaskPriority priority);
    
    // Find tasks by status and priority
    List<Task> findByStatusAndPriority(TaskStatus status, TaskPriority priority);
    
    // Find tasks due before a certain date
    List<Task> findByDueDateBefore(LocalDateTime date);
    
    // Find tasks due between dates
    List<Task> findByDueDateBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    // Custom query to find overdue tasks
    @Query("SELECT t FROM Task t WHERE t.dueDate < :currentDate AND t.status != :completedStatus")
    List<Task> findOverdueTasks(@Param("currentDate") LocalDateTime currentDate, 
                               @Param("completedStatus") TaskStatus completedStatus);
    
    // Find tasks by title containing (case-insensitive search)
    List<Task> findByTitleContainingIgnoreCase(String title);
    
    // Find tasks ordered by due date
    List<Task> findAllByOrderByDueDateAsc();
    
    // Find tasks ordered by priority (custom order)
    @Query("SELECT t FROM Task t ORDER BY " +
           "CASE t.priority " +
           "WHEN com.taskmanager.model.Task$TaskPriority.HIGH THEN 1 " +
           "WHEN com.taskmanager.model.Task$TaskPriority.MEDIUM THEN 2 " +
           "WHEN com.taskmanager.model.Task$TaskPriority.LOW THEN 3 " +
           "END, t.dueDate ASC")
    List<Task> findAllOrderByPriorityAndDueDate();
}