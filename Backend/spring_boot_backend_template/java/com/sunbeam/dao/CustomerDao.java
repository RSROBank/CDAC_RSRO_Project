package com.sunbeam.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.entity.EmployeeEntity;

public interface CustomerDao extends JpaRepository<EmployeeEntity, Long>{

}
