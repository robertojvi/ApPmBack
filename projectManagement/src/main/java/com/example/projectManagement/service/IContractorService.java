package com.example.projectManagement.service;

import com.example.projectManagement.model.ContractorDTO;

import java.util.Set;

public interface IContractorService {
    void createContractor(ContractorDTO contractorDTO);
    ContractorDTO readContractor(Long id);
    void updateContractor(ContractorDTO contractorDTO);
    void deleteContractor(Long id);
    Set<ContractorDTO> getAllContractors();
}
