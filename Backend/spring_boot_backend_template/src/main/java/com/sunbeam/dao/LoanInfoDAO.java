package com.sunbeam.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.entity.LoanInfo;

public interface LoanInfoDAO extends JpaRepository<LoanInfo, Long> {

	List<LoanInfo> findByUserId(Long id);
   
}
