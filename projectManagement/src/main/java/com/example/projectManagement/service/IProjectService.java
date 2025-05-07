package com.example.projectManagement.service;

import com.example.projectManagement.model.ProjectDTO;

import java.util.Set;

public interface IProjectService {
    void createProject(ProjectDTO projectDTO);
    ProjectDTO readProject(Long id);
    void updateProject(ProjectDTO projectDTO);
    void deleteProject(Long id);
    Set<ProjectDTO> getAllProjects();
}
