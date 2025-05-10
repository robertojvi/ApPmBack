package com.example.projectManagement.service;

import com.example.projectManagement.model.ProjectManagerDTO;

import java.util.Set;

public interface IProjectManagerService {
    void createProjectManager(ProjectManagerDTO projectManagerDTO);
    ProjectManagerDTO readProjectManager(Long id);
    void updateProjectManager(ProjectManagerDTO projectManagerDTO);
    void deleteProjectManager(Long id);
    Set<ProjectManagerDTO> getAllProjectManagers();
}
