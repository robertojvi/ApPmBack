package com.example.projectManagement.model;

public class ProjectDTO {
    private Long id;
    private String name;
    private Venue venue;
    private Contractor contractor;
    private ProjectManager projectManager;
    private Fom fom;
    private ImpEngineer impEngineer;
    private FiberCircuit fiberCircuit;
    private String status;
    private String startDate;
    private String endDate;
    private Integer numberOfDays;
    private Integer numberOfPoles;
    private Integer numberOfVaults;
    private Integer numberOfFiberSplices;
    private Integer feetTrenching;
    private Integer feetConduit;
    private Integer feetFiber;
    private Integer numberOfAccessPoints;
    private Boolean headendInstallation;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Venue getVenue() {
        return venue;
    }

    public void setVenue(Venue venue) {
        this.venue = venue;
    }

    public Contractor getContractor() {
        return contractor;
    }

    public void setContractor(Contractor contractor) {
        this.contractor = contractor;
    }

    public ProjectManager getProjectManager() {
        return projectManager;
    }

    public void setProjectManager(ProjectManager projectManager) {
        this.projectManager = projectManager;
    }

    public Fom getFom() {
        return fom;
    }

    public void setFom(Fom fom) {
        this.fom = fom;
    }

    public ImpEngineer getImpEngineer() {
        return impEngineer;
    }

    public void setImpEngineer(ImpEngineer impEngineer) {
        this.impEngineer = impEngineer;
    }

    public FiberCircuit getFiberCircuit() {
        return fiberCircuit;
    }

    public void setFiberCircuit(FiberCircuit fiberCircuit) {
        this.fiberCircuit = fiberCircuit;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public Integer getNumberOfDays() {
        return numberOfDays;
    }

    public void setNumberOfDays(Integer numberOfDays) {
        this.numberOfDays = numberOfDays;
    }

    public Integer getNumberOfPoles() {
        return numberOfPoles;
    }

    public void setNumberOfPoles(Integer numberOfPoles) {
        this.numberOfPoles = numberOfPoles;
    }

    public Integer getNumberOfVaults() {
        return numberOfVaults;
    }

    public void setNumberOfVaults(Integer numberOfVaults) {
        this.numberOfVaults = numberOfVaults;
    }

    public Integer getNumberOfFiberSplices() {
        return numberOfFiberSplices;
    }

    public void setNumberOfFiberSplices(Integer numberOfFiberSplices) {
        this.numberOfFiberSplices = numberOfFiberSplices;
    }

    public Integer getFeetTrenching() {
        return feetTrenching;
    }

    public void setFeetTrenching(Integer feetTrenching) {
        this.feetTrenching = feetTrenching;
    }

    public Integer getFeetConduit() {
        return feetConduit;
    }

    public void setFeetConduit(Integer feetConduit) {
        this.feetConduit = feetConduit;
    }

    public Integer getFeetFiber() {
        return feetFiber;
    }

    public void setFeetFiber(Integer feetFiber) {
        this.feetFiber = feetFiber;
    }

    public Integer getNumberOfAccessPoints() {
        return numberOfAccessPoints;
    }

    public void setNumberOfAccessPoints(Integer numberOfAccessPoints) {
        this.numberOfAccessPoints = numberOfAccessPoints;
    }

    public Boolean getHeadendInstallation() {
        return headendInstallation;
    }

    public void setHeadendInstallation(Boolean headendInstallation) {
        this.headendInstallation = headendInstallation;
    }
}