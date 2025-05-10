package com.example.projectManagement.controller;

import com.example.projectManagement.model.ImpEngineerDTO;
import com.example.projectManagement.service.IImpEngineerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/api/impEngineers")
public class ImpEngineerController {

    @Autowired
    IImpEngineerService impEngineerService;

    // Add methods to handle HTTP requests (GET, POST, PUT, DELETE) for Implementation Engineers
    @PostMapping
    public ResponseEntity<?> createImpEngineer(@RequestBody ImpEngineerDTO impEngineerDTO) {
        impEngineerService.createImpEngineer(impEngineerDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ImpEngineerDTO getImpEngineer(@PathVariable Long id) {
        return impEngineerService.readImpEngineer(id);
    }

    @PutMapping
    public ResponseEntity<?> updateImpEngineer(@RequestBody ImpEngineerDTO impEngineerDTO) {
        impEngineerService.updateImpEngineer(impEngineerDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteImpEngineer(@PathVariable Long id) {
        impEngineerService.deleteImpEngineer(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/list")
    public Collection<ImpEngineerDTO> getAllImpEngineers() {
        return impEngineerService.getAllImpEngineers();
    }
}
