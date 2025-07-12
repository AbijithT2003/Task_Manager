package com.taskmanager.util;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.taskmanager.dto.ApiResponse;
public class ResponseUtil {
    
    public static <T> ResponseEntity<ApiResponse<T>> success(T data, String message) {
        return ResponseEntity.ok(ApiResponse.success(data, message));
    }
    
    public static <T> ResponseEntity<ApiResponse<T>> success(T data) {
        return ResponseEntity.ok(ApiResponse.success(data));
    }
    
    public static <T> ResponseEntity<ApiResponse<T>> created(T data, String message) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(data, message));
    }
    
    public static <T> ResponseEntity<ApiResponse<T>> error(String message, String errorCode, HttpStatus status) {
        return ResponseEntity.status(status)
                .body(ApiResponse.error(message, errorCode));
    }
    
    public static <T> ResponseEntity<ApiResponse<T>> badRequest(String message, String errorCode) {
        return error(message, errorCode, HttpStatus.BAD_REQUEST);
    }
    
    public static <T> ResponseEntity<ApiResponse<T>> notFound(String message, String errorCode) {
        return error(message, errorCode, HttpStatus.NOT_FOUND);
    }
    
    public static <T> ResponseEntity<ApiResponse<T>> internalError(String message, String errorCode) {
        return error(message, errorCode, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
