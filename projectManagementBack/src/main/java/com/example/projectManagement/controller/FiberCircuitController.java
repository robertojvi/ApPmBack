package com.example.projectManagement.controller;

import com.example.projectManagement.model.FiberCircuitDTO;
import com.example.projectManagement.service.IFiberCircuitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/api/fiberCircuits")
public class FiberCircuitController {

    @Autowired
    IFiberCircuitService fiberCircuitService;

    @PostMapping
    public ResponseEntity<?> createFiberCircuit(@RequestBody FiberCircuitDTO fiberCircuitDTO) {
        fiberCircuitService.createFiberCircuit(fiberCircuitDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public FiberCircuitDTO getFiberCircuit(@PathVariable Long id) {
        return fiberCircuitService.readFiberCircuit(id);
    }

    @PutMapping
    public ResponseEntity<?> updateFiberCircuit(@RequestBody FiberCircuitDTO fiberCircuitDTO) {
        fiberCircuitService.updateFiberCircuit(fiberCircuitDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFiberCircuit(@PathVariable Long id) {
        fiberCircuitService.deleteFiberCircuit(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/list")
    public Collection<FiberCircuitDTO> getAllFiberCircuits() {
        return fiberCircuitService.getAllFiberCircuits();
    }
}
