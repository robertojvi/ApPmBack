package com.example.projectManagement.repository;

import com.example.projectManagement.model.Contractor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IContractorRepository extends JpaRepository<Contractor, Long> {
}
