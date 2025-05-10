package com.example.projectManagement.service;

import com.example.projectManagement.model.ImpEngineer;
import com.example.projectManagement.model.ImpEngineerDTO;
import com.example.projectManagement.repository.IImpEngineerRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ImpEngineerService implements IImpEngineerService{

    @Autowired
    private IImpEngineerRepository impEngineerRepository;
    @Autowired
    ObjectMapper mapper;

    private void saveImpEngineer(ImpEngineerDTO impEngineerDTO) {
        ImpEngineer impEngineer = mapper.convertValue(impEngineerDTO, ImpEngineer.class);
        impEngineerRepository.save(impEngineer);
    }

    @Override
    public void createImpEngineer(ImpEngineerDTO impEngineerDTO) {
        saveImpEngineer(impEngineerDTO);
    }

    @Override
    public ImpEngineerDTO readImpEngineer(Long id) {
        Optional<ImpEngineer> impEngineer = impEngineerRepository.findById(id);
        ImpEngineerDTO impEngineerDTO = null;
        if (impEngineer.isPresent()) {
            impEngineerDTO = mapper.convertValue(impEngineer, ImpEngineerDTO.class);
        }
        return impEngineerDTO;
    }

    @Override
    public void updateImpEngineer(ImpEngineerDTO impEngineerDTO) {
        saveImpEngineer(impEngineerDTO);
    }

    @Override
    public void deleteImpEngineer(Long id) {
        impEngineerRepository.deleteById(id);
    }

    @Override
    public Set<ImpEngineerDTO> getAllImpEngineers() {
        List<ImpEngineer> impEngineers = impEngineerRepository.findAll();
        Set<ImpEngineerDTO> impEngineersDTO = new HashSet<>();
        for (ImpEngineer impEngineer : impEngineers) {
            impEngineersDTO.add(mapper.convertValue(impEngineer, ImpEngineerDTO.class));
        }
        return impEngineersDTO;
    }
}
