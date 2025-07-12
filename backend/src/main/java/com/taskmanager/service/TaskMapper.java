package com.taskmanager.service;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.taskmanager.dto.TaskCreateDto;
import com.taskmanager.dto.TaskDto;
import com.taskmanager.model.Task;

@Mapper(componentModel = "spring", 
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface TaskMapper {
    TaskDto toDTO(Task task);
    Task toEntity(TaskCreateDto createDTO);
    void updateEntity(@MappingTarget Task task, TaskCreateDto updateDTO);
}
