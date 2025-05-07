package com.example.projectManagement.repository;

import com.example.projectManagement.model.FiberCircuit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IFiberCircuitRepository extends JpaRepository<FiberCircuit, Long> {
}
