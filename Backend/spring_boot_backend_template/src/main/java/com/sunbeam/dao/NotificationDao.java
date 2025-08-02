package com.sunbeam.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.entity.EmployeeEntity;
import com.sunbeam.entity.Notification;

public interface NotificationDao extends JpaRepository<Notification, Long>{

	List<Notification> findByEmployeeId(Long employeeId);

	List<Notification> findByUserId(Long userId);
	
	
}
