package com.example.projectManagement.service;

import com.example.projectManagement.model.FiberCircuitDTO;

import java.util.Set;

public interface IFiberCircuitService {
    void createFiberCircuit(FiberCircuitDTO fiberCircuitDTO);
    FiberCircuitDTO readFiberCircuit(Long id);
    void updateFiberCircuit(FiberCircuitDTO fiberCircuitDTO);
    void deleteFiberCircuit(Long id);
    Set<FiberCircuitDTO> getAllFiberCircuits();
}
