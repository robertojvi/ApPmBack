package com.construction.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String type;
    private String name;
    private Boolean poleInstallation;
    private Boolean poleEquipmentInstallation;
    private Boolean electricalInstallation;
    private Boolean nemaBoxInstallation;
    private Boolean vaultInstallation;
    private String trenchingPath;
    private Boolean trenchingDone;
    private Boolean indoorApInstallation;
    private Boolean outdoorApInstallation;
    private Boolean cabinNemaBoxInstallation;
    private Boolean cabinElectricalInstallation;
    private Boolean headendEquipmentInstallation;
    private Boolean headendEquipmentConfiguration;
}