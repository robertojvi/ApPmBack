package com.example.projectManagement.service;

import com.example.projectManagement.model.ImpEngineerDTO;

import java.util.Set;

public interface IImpEngineerService {
    void createImpEngineer(ImpEngineerDTO impEngineerDTO);
    ImpEngineerDTO readImpEngineer(Long id);
    void updateImpEngineer(ImpEngineerDTO impEngineerDTO);
    void deleteImpEngineer(Long id);
    Set<ImpEngineerDTO> getAllImpEngineers();
}
