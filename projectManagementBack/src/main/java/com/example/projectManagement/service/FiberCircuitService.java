package com.example.projectManagement.service;

import com.example.projectManagement.model.FiberCircuit;
import com.example.projectManagement.model.FiberCircuitDTO;
import com.example.projectManagement.repository.IFiberCircuitRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class FiberCircuitService implements IFiberCircuitService{

    @Autowired
    private IFiberCircuitRepository fiberCircuitRepository;

    @Autowired
    ObjectMapper mapper;

    private void saveFiberCircuit(FiberCircuitDTO fiberCircuitDTO) {
        FiberCircuit fiberCircuit = mapper.convertValue(fiberCircuitDTO, FiberCircuit.class);
        fiberCircuitRepository.save(fiberCircuit);
    }

    @Override
    public void createFiberCircuit(FiberCircuitDTO fiberCircuitDTO) {
        saveFiberCircuit(fiberCircuitDTO);
    }

    @Override
    public FiberCircuitDTO readFiberCircuit(Long id) {
        Optional<FiberCircuit> fiberCircuit = fiberCircuitRepository.findById(id);
        FiberCircuitDTO fiberCircuitDTO = null;
        if (fiberCircuit.isPresent()) {
            fiberCircuitDTO = mapper.convertValue(fiberCircuit, FiberCircuitDTO.class);
        }
        return fiberCircuitDTO;
    }

    @Override
    public void updateFiberCircuit(FiberCircuitDTO fiberCircuitDTO) {
        saveFiberCircuit(fiberCircuitDTO);
    }

    @Override
    public void deleteFiberCircuit(Long id) {
        fiberCircuitRepository.deleteById(id);

    }

    @Override
    public Set<FiberCircuitDTO> getAllFiberCircuits() {
        List<FiberCircuit> fiberCircuits = fiberCircuitRepository.findAll();
        Set<FiberCircuitDTO> fiberCircuitsDTO = new HashSet<>();
        for (FiberCircuit fiberCircuit : fiberCircuits) {
            fiberCircuitsDTO.add(mapper.convertValue(fiberCircuit, FiberCircuitDTO.class));
        }
        return fiberCircuitsDTO;
    }
}
