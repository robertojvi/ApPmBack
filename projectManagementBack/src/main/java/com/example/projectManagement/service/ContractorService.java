package com.example.projectManagement.service;

import com.example.projectManagement.model.Contractor;
import com.example.projectManagement.model.ContractorDTO;
import com.example.projectManagement.repository.IContractorRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ContractorService implements IContractorService{
    @Autowired
    private IContractorRepository contractorRepository;
    @Autowired
    ObjectMapper mapper;

    private void saveContractor(ContractorDTO contractorDTO) {
        Contractor contractor = mapper.convertValue(contractorDTO, Contractor.class);
        contractorRepository.save(contractor);
    }
    @Override
    public void createContractor(ContractorDTO contractorDTO) {
        saveContractor(contractorDTO);
    }

    @Override
    public ContractorDTO readContractor(Long id) {
        Optional<Contractor> contractor = contractorRepository.findById(id);
        ContractorDTO contractorDTO = null;
        if (contractor.isPresent()) {
            contractorDTO = mapper.convertValue(contractor, ContractorDTO.class);
        }
        return contractorDTO;
    }

    @Override
    public void updateContractor(ContractorDTO contractorDTO) {
        saveContractor(contractorDTO);
    }

    @Override
    public void deleteContractor(Long id) {
        contractorRepository.deleteById(id);
    }

    @Override
    public Set<ContractorDTO> getAllContractors() {
        List<Contractor> contractors = contractorRepository.findAll();
        Set<ContractorDTO> contractorsDTO = new HashSet<>();
        for (Contractor contractor : contractors) {
            contractorsDTO.add(mapper.convertValue(contractor, ContractorDTO.class));
        }
        return contractorsDTO;
    }
}
