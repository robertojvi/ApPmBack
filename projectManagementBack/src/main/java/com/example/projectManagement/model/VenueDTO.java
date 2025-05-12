package com.example.projectManagement.model;

import java.util.List;

public class VenueDTO {
    private Long id;
    private String name;
    private String address;
    private String city;
    private String state;
    private String zipCode;
    private String country;
    private String phoneNumber;
    private String email;
    private String contactPerson;
    private Integer numberOfLots;
    private String electricalCompany;
    private List<String> buldings;
    private List<String> serviceAreas;
    private String contractSLA;

    public String getContractSLA() {
        return contractSLA;
    }

    public void setContractSLA(String contractSLA) {
        this.contractSLA = contractSLA;
    }

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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContactPerson() {
        return contactPerson;
    }

    public void setContactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
    }

    public Integer getNumberOfLots() {
        return numberOfLots;
    }

    public void setNumberOfLots(Integer numberOfLots) {
        this.numberOfLots = numberOfLots;
    }

    public String getElectricalCompany() {
        return electricalCompany;
    }

    public void setElectricalCompany(String electricalCompany) {
        this.electricalCompany = electricalCompany;
    }

    public List<String> getBuldings() {
        return buldings;
    }

    public void setBuldings(List<String> buldings) {
        this.buldings = buldings;
    }

    public List<String> getServiceAreas() {
        return serviceAreas;
    }

    public void setServiceAreas(List<String> serviceAreas) {
        this.serviceAreas = serviceAreas;
    }
}
