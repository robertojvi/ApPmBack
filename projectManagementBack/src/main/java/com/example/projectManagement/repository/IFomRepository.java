package com.example.projectManagement.repository;

import com.example.projectManagement.model.Fom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IFomRepository extends JpaRepository<Fom, Long> {
}
