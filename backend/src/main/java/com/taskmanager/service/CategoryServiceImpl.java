package com.taskmanager.service;

import com.taskmanager.dto.CategoryDto;
import com.taskmanager.model.Category;
import com.taskmanager.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    @Override
    public List<CategoryDto> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(category -> {
                    CategoryDto dto = new CategoryDto();
                    dto.setId(category.getId());
                    dto.setName(category.getName());
                    return dto;
                })
                .toList();
    }

    @Override
    public CategoryDto createCategory(CategoryDto dto) {
        Category category = new Category();
        category.setName(dto.getName());
        category = categoryRepository.save(category);

        dto.setId(category.getId());
        return dto;
    }
}
