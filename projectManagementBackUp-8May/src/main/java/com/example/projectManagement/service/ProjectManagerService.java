package com.example.projectManagement.service;

import com.example.projectManagement.model.ProjectManager;
import com.example.projectManagement.model.ProjectManagerDTO;
import com.example.projectManagement.repository.IProjectManagerRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ProjectManagerService implements IProjectManagerService{

    @Autowired
    private IProjectManagerRepository projectManagerRepository;
    @Autowired
    ObjectMapper mapper;

    private void saveProjectManager(ProjectManagerDTO projectManagerDTO) {
        ProjectManager projectManager = mapper.convertValue(projectManagerDTO, ProjectManager.class);
        projectManagerRepository.save(projectManager);
    }

    @Override
    public void createProjectManager(ProjectManagerDTO projectManagerDTO) {
        saveProjectManager(projectManagerDTO);
    }

    @Override
    public ProjectManagerDTO readProjectManager(Long id) {
        Optional<ProjectManager> projectManager = projectManagerRepository.findById(id);
        ProjectManagerDTO projectManagerDTO = null;
        if (projectManager.isPresent()) {
            projectManagerDTO = mapper.convertValue(projectManager, ProjectManagerDTO.class);
        }
        return projectManagerDTO;
    }

    @Override
    public void updateProjectManager(ProjectManagerDTO projectManagerDTO) {
        saveProjectManager(projectManagerDTO);
    }

    @Override
    public void deleteProjectManager(Long id) {
        projectManagerRepository.deleteById(id);
    }

    @Override
    public Set<ProjectManagerDTO> getAllProjectManagers() {
        List<ProjectManager> projectManagers = projectManagerRepository.findAll();
        Set<ProjectManagerDTO> projectManagersDTO = new HashSet<>();
        for (ProjectManager projectManager : projectManagers) {
            projectManagersDTO.add(mapper.convertValue(projectManager, ProjectManagerDTO.class));
        }
        return projectManagersDTO;
    }
}
