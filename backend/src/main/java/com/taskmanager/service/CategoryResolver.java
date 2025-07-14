package com.taskmanager.service;

import com.taskmanager.model.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryResolver {

    public Category fromId(Long id) {
        if (id == null) return null;
        Category category = new Category();
        category.setId(id);
        return category;
    }
}
