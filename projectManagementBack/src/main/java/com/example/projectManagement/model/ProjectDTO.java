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
    private Integer numberOfInteriorAccessPoints;
    private Integer numberOfExteriorAccessPoints;
    private Boolean headendInstallation;

    private double percentageComplete;
    private Integer numberOfDaysCompleted;
    private Integer numberOfPolesCompleted;
    private Integer numberOfVaultsCompleted;
    private Integer numberOfFiberSplicesCompleted;
    private Integer feetTrenchingCompleted;
    private Integer feetConduitCompleted;
    private Integer feetFiberCompleted;
    private Integer numberOfInteriorAccessPointsCompleted;
    private Integer numberOfExteriorAccessPointsCompleted;

    private Integer numberOfPointToPoints;
    private Integer numberOfPointToPointsCompleted;
    private String SalesDealClosedDate;

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

    public Integer getNumberOfInteriorAccessPoints() {
        return numberOfInteriorAccessPoints;
    }

    public void setNumberOfInteriorAccessPoints(Integer numberOfInteriorAccessPoints) {
        this.numberOfInteriorAccessPoints = numberOfInteriorAccessPoints;
    }

    public Integer getNumberOfExteriorAccessPoints() {
        return numberOfExteriorAccessPoints;
    }

    public void setNumberOfExteriorAccessPoints(Integer numberOfExteriorAccessPoints) {
        this.numberOfExteriorAccessPoints = numberOfExteriorAccessPoints;
    }

    public Boolean getHeadendInstallation() {
        return headendInstallation;
    }

    public void setHeadendInstallation(Boolean headendInstallation) {
        this.headendInstallation = headendInstallation;
    }

    public double getPercentageComplete() {
        return percentageComplete;
    }

    public void setPercentageComplete(double percentageComplete) {
        this.percentageComplete = percentageComplete;
    }

    public Integer getNumberOfDaysCompleted() {
        return numberOfDaysCompleted;
    }

    public void setNumberOfDaysCompleted(Integer numberOfDaysCompleted) {
        this.numberOfDaysCompleted = numberOfDaysCompleted;
    }

    public Integer getNumberOfPolesCompleted() {
        return numberOfPolesCompleted;
    }

    public void setNumberOfPolesCompleted(Integer numberOfPolesCompleted) {
        this.numberOfPolesCompleted = numberOfPolesCompleted;
    }

    public Integer getNumberOfVaultsCompleted() {
        return numberOfVaultsCompleted;
    }

    public void setNumberOfVaultsCompleted(Integer numberOfVaultsCompleted) {
        this.numberOfVaultsCompleted = numberOfVaultsCompleted;
    }

    public Integer getNumberOfFiberSplicesCompleted() {
        return numberOfFiberSplicesCompleted;
    }

    public void setNumberOfFiberSplicesCompleted(Integer numberOfFiberSplicesCompleted) {
        this.numberOfFiberSplicesCompleted = numberOfFiberSplicesCompleted;
    }

    public Integer getFeetTrenchingCompleted() {
        return feetTrenchingCompleted;
    }

    public void setFeetTrenchingCompleted(Integer feetTrenchingCompleted) {
        this.feetTrenchingCompleted = feetTrenchingCompleted;
    }

    public Integer getFeetConduitCompleted() {
        return feetConduitCompleted;
    }

    public void setFeetConduitCompleted(Integer feetConduitCompleted) {
        this.feetConduitCompleted = feetConduitCompleted;
    }

    public Integer getFeetFiberCompleted() {
        return feetFiberCompleted;
    }

    public void setFeetFiberCompleted(Integer feetFiberCompleted) {
        this.feetFiberCompleted = feetFiberCompleted;
    }

    public Integer getNumberOfInteriorAccessPointsCompleted() {
        return numberOfInteriorAccessPointsCompleted;
    }

    public void setNumberOfInteriorAccessPointsCompleted(Integer numberOfInteriorAccessPointsCompleted) {
        this.numberOfInteriorAccessPointsCompleted = numberOfInteriorAccessPointsCompleted;
    }

    public Integer getNumberOfExteriorAccessPointsCompleted() {
        return numberOfExteriorAccessPointsCompleted;
    }

    public void setNumberOfExteriorAccessPointsCompleted(Integer numberOfExteriorAccessPointsCompleted) {
        this.numberOfExteriorAccessPointsCompleted = numberOfExteriorAccessPointsCompleted;
    }

    public Integer getNumberOfPointToPoints() {
        return numberOfPointToPoints;
    }

    public void setNumberOfPointToPoints(Integer numberOfPointToPoints) {
        this.numberOfPointToPoints = numberOfPointToPoints;
    }

    public Integer getNumberOfPointToPointsCompleted() {
        return numberOfPointToPointsCompleted;
    }

    public void setNumberOfPointToPointsCompleted(Integer numberOfPointToPointsCompleted) {
        this.numberOfPointToPointsCompleted = numberOfPointToPointsCompleted;
    }

    public String getSalesDealClosedDate() {
        return SalesDealClosedDate;
    }

    public void setSalesDealClosedDate(String salesDealClosedDate) {
        SalesDealClosedDate = salesDealClosedDate;
    }
}