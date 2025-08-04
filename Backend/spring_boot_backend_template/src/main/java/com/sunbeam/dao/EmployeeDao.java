package com.sunbeam.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.entity.EmployeeEntity;
import com.sunbeam.entity.User;
import com.sunbeam.entity.UserEntity;

public interface EmployeeDao extends JpaRepository<EmployeeEntity, Long> {

	Optional<EmployeeEntity> findById(Long userId);

	boolean existsByEmail(String email);

}
