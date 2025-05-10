package com.example.projectManagement.controller;

import com.example.projectManagement.model.ProjectDTO;
import com.example.projectManagement.service.IProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    IProjectService projectService;

    // Add methods to handle HTTP requests (GET, POST, PUT, DELETE) for projects
    @PostMapping
    public ResponseEntity<?> createProject(@RequestBody ProjectDTO projectDTO) {
        projectService.createProject(projectDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ProjectDTO getProject(@PathVariable Long id) {
        return projectService.readProject(id);
    }

    @PutMapping
    public ResponseEntity<?> updateProject(@RequestBody ProjectDTO projectDTO) {
        projectService.updateProject(projectDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/list")
    public Collection<ProjectDTO> getAllProjects() {
        return projectService.getAllProjects();
    }
}
