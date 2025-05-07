package com.example.projectManagement.controller;

import com.example.projectManagement.model.ProjectManagerDTO;
import com.example.projectManagement.service.IProjectManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/api/projectManagers")
public class ProjectManagerController {

    @Autowired
    IProjectManagerService projectManagerService;

    // Add methods to handle HTTP requests (GET, POST, PUT, DELETE) for Project Managers
    @PostMapping
    public ResponseEntity<?> createProjectManager(@RequestBody ProjectManagerDTO projectManagerDTO) {
        projectManagerService.createProjectManager(projectManagerDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ProjectManagerDTO getProjectManager(@PathVariable Long id) {
        return projectManagerService.readProjectManager(id);
    }

    @PutMapping
    public ResponseEntity<?> updateProjectManager(@RequestBody ProjectManagerDTO projectManagerDTO) {
        projectManagerService.updateProjectManager(projectManagerDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProjectManager(@PathVariable Long id) {
        projectManagerService.deleteProjectManager(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/list")
    public Collection<ProjectManagerDTO> getAllProjectManagers() {
        return projectManagerService.getAllProjectManagers();
    }
}
