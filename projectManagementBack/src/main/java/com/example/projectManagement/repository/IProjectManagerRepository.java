package com.example.projectManagement.repository;

import com.example.projectManagement.model.ProjectManager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IProjectManagerRepository extends JpaRepository<ProjectManager, Long> {
}
