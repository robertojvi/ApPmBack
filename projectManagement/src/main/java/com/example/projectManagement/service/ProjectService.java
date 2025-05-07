package com.example.projectManagement.service;

import com.example.projectManagement.model.Project;
import com.example.projectManagement.model.ProjectDTO;
import com.example.projectManagement.repository.IProjectRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ProjectService implements IProjectService{

    @Autowired
    private IProjectRepository projectRepository;
    @Autowired
    ObjectMapper mapper;

    private void saveProject(ProjectDTO projectDTO) {
        Project project = mapper.convertValue(projectDTO, Project.class);
        projectRepository.save(project);
    }

    @Override
    public void createProject(ProjectDTO projectDTO) {
        saveProject(projectDTO);
    }

    @Override
    public ProjectDTO readProject(Long id) {
        Optional<Project> project = projectRepository.findById(id);
        ProjectDTO projectDTO = null;
        if (project.isPresent()) {
            projectDTO = mapper.convertValue(project, ProjectDTO.class);
        }
        return projectDTO;
    }

    @Override
    public void updateProject(ProjectDTO projectDTO) {
        saveProject(projectDTO);
    }

    @Override
    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }

    @Override
    public Set<ProjectDTO> getAllProjects() {
        List<Project> projects = projectRepository.findAll();
        Set<ProjectDTO> projectsDTO = new HashSet<>();
        for (Project project : projects) {
            projectsDTO.add(mapper.convertValue(project, ProjectDTO.class));
        }
        return projectsDTO;
    }
}
