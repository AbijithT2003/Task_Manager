package com.taskmanager.service;

import com.taskmanager.dto.TaskCreateDto;
import com.taskmanager.dto.TaskDto;
import com.taskmanager.model.Category;
import com.taskmanager.model.Task;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public abstract class TaskMapper {

    @Autowired
    private CategoryResolver categoryResolver;

    // Entity -> DTO
    @Mapping(source = "category.id", target = "categoryId")
    @Mapping(source = "category.name", target = "categoryName")
    public abstract TaskDto toDTO(Task task);

    // Create DTO -> Entity
    @Mapping(target = "category", expression = "java(categoryResolver.fromId(dto.getCategoryId()))")
    public abstract Task toEntity(TaskCreateDto dto);

    // Update existing entity
    @Mapping(target = "category", expression = "java(categoryResolver.fromId(dto.getCategoryId()))")
    public abstract void updateEntity(@MappingTarget Task task, TaskCreateDto dto);
}
