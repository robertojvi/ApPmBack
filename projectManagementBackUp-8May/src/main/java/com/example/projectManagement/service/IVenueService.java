package com.example.projectManagement.service;

import com.example.projectManagement.model.VenueDTO;

import java.util.Set;

public interface IVenueService {
    void createVenue(VenueDTO venueDTO);
    VenueDTO readVenue(Long id);
    void updateVenue(VenueDTO venueDTO);
    void deleteVenue(Long id);
    Set<VenueDTO> getAllVenues();
}
