package com.example.projectManagement.service;

import com.example.projectManagement.model.Venue;
import com.example.projectManagement.model.VenueDTO;
import com.example.projectManagement.repository.IVenueRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class VenueService implements IVenueService{

    @Autowired
    private IVenueRepository venueRepository;
    @Autowired
    ObjectMapper mapper;

    private void saveVenue(VenueDTO venueDTO) {
        Venue venue = mapper.convertValue(venueDTO, Venue.class);
        venueRepository.save(venue);
    }

    @Override
    public void createVenue(VenueDTO venueDTO) {
        saveVenue(venueDTO);
    }

    @Override
    public VenueDTO readVenue(Long id) {
        Optional<Venue> venue = venueRepository.findById(id);
        VenueDTO venueDTO = null;
        if (venue.isPresent()) {
            venueDTO = mapper.convertValue(venue, VenueDTO.class);
        }
        return venueDTO;
    }

    @Override
    public void updateVenue(VenueDTO venueDTO) {
        saveVenue(venueDTO);
    }

    @Override
    public void deleteVenue(Long id) {
        venueRepository.deleteById(id);
    }

    @Override
    public Set<VenueDTO> getAllVenues() {
        List<Venue> venues = venueRepository.findAll();
        Set<VenueDTO> venuesDTO = new HashSet<>();
        for (Venue venue : venues) {
            venuesDTO.add(mapper.convertValue(venue, VenueDTO.class));
        }
        return venuesDTO;
    }
}
