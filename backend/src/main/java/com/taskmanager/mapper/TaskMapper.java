package com.taskmanager.mapper;

import com.taskmanager.dto.TaskCreateDto;
import com.taskmanager.dto.TaskDto;
import com.taskmanager.model.Task;
import com.taskmanager.service.CategoryResolver;
import org.mapstruct.*;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface TaskMapper {

    // Entity -> DTO
    @Mapping(source = "category.id", target = "categoryId")
    @Mapping(source = "category.name", target = "categoryName")
    TaskDto toDTO(Task task);

    // Create DTO -> Entity (use @Context to inject resolver)
    @Mapping(target = "category", expression = "java(categoryResolver.fromId(dto.getCategoryId()))")
    Task toEntity(TaskCreateDto dto, @Context CategoryResolver categoryResolver);

    // Update Entity
    @Mapping(target = "category", expression = "java(categoryResolver.fromId(dto.getCategoryId()))")
    void updateEntity(@MappingTarget Task task, TaskCreateDto dto, @Context CategoryResolver categoryResolver);
}
