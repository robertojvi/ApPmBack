package com.example.projectManagement.repository;

import com.example.projectManagement.model.ImpEngineer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IImpEngineerRepository extends JpaRepository<ImpEngineer, Long> {
}
