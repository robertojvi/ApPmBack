package com.example.projectManagement.controller;

import com.example.projectManagement.model.VenueDTO;
import com.example.projectManagement.service.IVenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/api/venues")
public class VenueController {

    @Autowired
    IVenueService venueService;

    // Add methods to handle HTTP requests (GET, POST, PUT, DELETE) for venues
    @PostMapping
    public ResponseEntity<?> createVenue(@RequestBody VenueDTO venueDTO) {
        venueService.createVenue(venueDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public VenueDTO getVenue(@PathVariable Long id) {
        return venueService.readVenue(id);
    }

    @PutMapping
    public ResponseEntity<?> updateVenue(@RequestBody VenueDTO venueDTO) {
        venueService.updateVenue(venueDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVenue(@PathVariable Long id) {
        venueService.deleteVenue(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/list")
    public Collection<VenueDTO> getAllVenues() {
        return venueService.getAllVenues();
    }
}
