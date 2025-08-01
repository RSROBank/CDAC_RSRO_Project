package com.sunbeam.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.entity.Admin;
import com.sunbeam.entity.EmployeeEntity;
import com.sunbeam.entity.User;
import com.sunbeam.entity.UserEntity;

public interface AdminDao extends JpaRepository<Admin, Long> {

	Optional<Admin> findById(Long userId);

}
