package com.example.projectManagement.service;

import com.example.projectManagement.model.Fom;
import com.example.projectManagement.model.FomDTO;
import com.example.projectManagement.repository.IFomRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class FomService implements IFomService{

    @Autowired
    private IFomRepository fomRepository;
    @Autowired
    ObjectMapper mapper;

    private void saveFom(FomDTO fomDTO) {
        Fom fom = mapper.convertValue(fomDTO, Fom.class);
        fomRepository.save(fom);
    }

    @Override
    public void createFom(FomDTO fomDTO) {
        saveFom(fomDTO);
    }

    @Override
    public FomDTO readFom(Long id) {
        Optional<Fom> fom = fomRepository.findById(id);
        FomDTO fomDTO = null;
        if (fom.isPresent()) {
            fomDTO = mapper.convertValue(fom, FomDTO.class);
        }
        return fomDTO;
    }

    @Override
    public void updateFom(FomDTO fomDTO) {
        saveFom(fomDTO);
    }

    @Override
    public void deleteFom(Long id) {
        fomRepository.deleteById(id);
    }

    @Override
    public Set<FomDTO> getAllFoms() {
        List<Fom> foms = fomRepository.findAll();
        Set<FomDTO> fomsDTO = new HashSet<>();
        for (Fom fom : foms) {
            fomsDTO.add(mapper.convertValue(fom, FomDTO.class));
        }
        return fomsDTO;
    }
}
