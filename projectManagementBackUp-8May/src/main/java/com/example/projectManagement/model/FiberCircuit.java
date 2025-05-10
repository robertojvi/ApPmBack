package com.example.projectManagement.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Set;
@Entity
@Table(name="fiberCircuits")
public class FiberCircuit {
    @Id
    @GeneratedValue
    private Long id;
    private String providerName;
    private String circuitId;
    private String circuitType;
    private String circuitStatus;
    private String circuitDescription;
    private String circuitBandwidth;
    private String circuitActivationDate;
    private String circuitTerminationDate;
    private String circuitLocation;
    @OneToMany(mappedBy = "fiberCircuit")
    @JsonIgnore
    private Set<Project> projects;

    public Set<Project> getProjects() {
        return projects;
    }

    public void setProjects(Set<Project> projects) {
        this.projects = projects;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProviderName() {
        return providerName;
    }

    public void setProviderName(String providerName) {
        this.providerName = providerName;
    }

    public String getCircuitId() {
        return circuitId;
    }

    public void setCircuitId(String circuitId) {
        this.circuitId = circuitId;
    }

    public String getCircuitType() {
        return circuitType;
    }

    public void setCircuitType(String circuitType) {
        this.circuitType = circuitType;
    }

    public String getCircuitStatus() {
        return circuitStatus;
    }

    public void setCircuitStatus(String circuitStatus) {
        this.circuitStatus = circuitStatus;
    }

    public String getCircuitDescription() {
        return circuitDescription;
    }

    public void setCircuitDescription(String circuitDescription) {
        this.circuitDescription = circuitDescription;
    }

    public String getCircuitBandwidth() {
        return circuitBandwidth;
    }

    public void setCircuitBandwidth(String circuitBandwidth) {
        this.circuitBandwidth = circuitBandwidth;
    }

    public String getCircuitActivationDate() {
        return circuitActivationDate;
    }

    public void setCircuitActivationDate(String circuitActivationDate) {
        this.circuitActivationDate = circuitActivationDate;
    }

    public String getCircuitTerminationDate() {
        return circuitTerminationDate;
    }

    public void setCircuitTerminationDate(String circuitTerminationDate) {
        this.circuitTerminationDate = circuitTerminationDate;
    }

    public String getCircuitLocation() {
        return circuitLocation;
    }

    public void setCircuitLocation(String circuitLocation) {
        this.circuitLocation = circuitLocation;
    }
}
