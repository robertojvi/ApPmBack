package com.example.projectManagement.controller;

import com.example.projectManagement.model.ContractorDTO;
import com.example.projectManagement.service.IContractorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/api/contractors")
public class ContractorController {

    @Autowired
    IContractorService contractorService;

    // Add methods to handle HTTP requests (GET, POST, PUT, DELETE) for contractors
    @PostMapping
    public ResponseEntity<?> createContractor(@RequestBody ContractorDTO contractorDTO) {
        contractorService.createContractor(contractorDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ContractorDTO getContractor(@PathVariable Long id) {
        return contractorService.readContractor(id);
    }

    @PutMapping
    public ResponseEntity<?> updateContractor(@RequestBody ContractorDTO contractorDTO) {
        contractorService.updateContractor(contractorDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteContractor(@PathVariable Long id) {
        contractorService.deleteContractor(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/list")
    public Collection<ContractorDTO> getAllContractors() {
        return contractorService.getAllContractors();
    }
}
