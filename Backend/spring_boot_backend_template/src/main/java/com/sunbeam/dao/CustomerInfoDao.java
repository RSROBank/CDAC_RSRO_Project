package com.sunbeam.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.entity.Status;
import com.sunbeam.entity.User;

public interface CustomerInfoDao extends JpaRepository <User, Long>{

	List<User> findByStatus(Status verified);

}
