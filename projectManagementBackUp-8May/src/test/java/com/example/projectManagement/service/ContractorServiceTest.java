package com.example.projectManagement.service;

import com.example.projectManagement.model.ContractorDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertTrue;


@SpringBootTest
class ContractorServiceTest {
    @Autowired
    private IContractorService contractorService;
    @Test
    public void testCreateContractor() {
        ContractorDTO contractorDTO = new ContractorDTO();
        contractorDTO.setName("BlueWater");
        contractorDTO.setEmail("cmnorris@bluewatercommunications.net");
        contractorDTO.setPhoneNumber("231-590-7865");
        contractorDTO.setAddress("1234 Bluewater Lane");
        contractorDTO.setCity("Traverse City");
        contractorDTO.setState("MI");
        contractorDTO.setZipCode("49684");
        contractorDTO.setCountry("USA");
        contractorService.createContractor(contractorDTO);

        ContractorDTO contractorBW = contractorService.readContractor(1L);
        assertTrue(contractorBW != null);
    }

}