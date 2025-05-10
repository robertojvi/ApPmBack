package com.example.projectManagement.service;

import com.example.projectManagement.model.FomDTO;

import java.util.Set;

public interface IFomService {
    void createFom(FomDTO fomDTO);
    FomDTO readFom(Long id);
    void updateFom(FomDTO fomDTO);
    void deleteFom(Long id);
    Set<FomDTO> getAllFoms();
}
