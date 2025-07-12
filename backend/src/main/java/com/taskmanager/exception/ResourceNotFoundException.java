package com.taskmanager.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Custom exception for resource not found scenarios
 * This exception is thrown when a requested resource cannot be found
 */
@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {
    
    private String resourceName;
    private String fieldName;
    private Object fieldValue;
    
    /**
     * Constructor with custom message
     * @param message the detail message
     */
    public ResourceNotFoundException(String message) {
        super(message);
    }
    
    /**
     * Constructor with resource details
     * @param resourceName the name of the resource
     * @param fieldName the field name used for searching
     * @param fieldValue the field value used for searching
     */
    public ResourceNotFoundException(String resourceName, String fieldName, Object fieldValue) {
        super(String.format("%s not found with %s: '%s'", resourceName, fieldName, fieldValue));
        this.resourceName = resourceName;
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
    }
    
    /**
     * Constructor with message and cause
     * @param message the detail message
     * @param cause the cause of the exception
     */
    public ResourceNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
    
    /**
     * Constructor with resource details and cause
     * @param resourceName the name of the resource
     * @param fieldName the field name used for searching
     * @param fieldValue the field value used for searching
     * @param cause the cause of the exception
     */
    public ResourceNotFoundException(String resourceName, String fieldName, Object fieldValue, Throwable cause) {
        super(String.format("%s not found with %s: '%s'", resourceName, fieldName, fieldValue), cause);
        this.resourceName = resourceName;
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
    }
    
    // Getters
    public String getResourceName() {
        return resourceName;
    }
    
    public String getFieldName() {
        return fieldName;
    }
    
    public Object getFieldValue() {
        return fieldValue;
    }
}