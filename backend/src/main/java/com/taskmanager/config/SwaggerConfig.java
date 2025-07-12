package com.taskmanager.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI taskManagerOpenAPI() {
        Server devServer = new Server();
        devServer.setUrl("http://localhost:8080");
        devServer.setDescription("Development server");

        Server prodServer = new Server();
        prodServer.setUrl("https://taskmanager.example.com");
        prodServer.setDescription("Production server");

        Contact contact = new Contact();
        contact.setEmail("admin@taskmanager.com");
        contact.setName("Task Manager Team");
        contact.setUrl("https://taskmanager.example.com");

        License license = new License()
                .name("MIT License")
                .url("https://choosealicense.com/licenses/mit/");

        Info info = new Info()
                .title("Task Manager API")
                .version("1.0.0")
                .contact(contact)
                .description("A comprehensive task management system API that allows users to create, update, delete, and manage tasks efficiently. Features include task prioritization, status tracking, due date management, and advanced filtering capabilities.")
                .termsOfService("https://taskmanager.example.com/terms")
                .license(license);

        return new OpenAPI()
                .info(info)
                .servers(List.of(devServer, prodServer));
    }
}