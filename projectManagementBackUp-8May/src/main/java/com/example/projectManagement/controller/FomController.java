package com.example.projectManagement.controller;

import com.example.projectManagement.model.FomDTO;
import com.example.projectManagement.service.IFomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/api/foms")
public class FomController {

    @Autowired
    IFomService fomService;

    // Add methods to handle HTTP requests (GET, POST, PUT, DELETE) for FOMs
    @PostMapping
    public ResponseEntity<?> createFom(@RequestBody FomDTO fomDTO) {
        fomService.createFom(fomDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public FomDTO getFom(@PathVariable Long id) {
        return fomService.readFom(id);
    }

    @PutMapping
    public ResponseEntity<?> updateFom(@RequestBody FomDTO fomDTO) {
        fomService.updateFom(fomDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFom(@PathVariable Long id) {
        fomService.deleteFom(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/list")
    public Collection<FomDTO> getAllFoms() {
        return fomService.getAllFoms();
    }
}
