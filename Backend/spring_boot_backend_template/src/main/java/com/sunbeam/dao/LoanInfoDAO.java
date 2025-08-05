package com.sunbeam.dao;

import java.util.List;


import java.util.Optional;


import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.dto.LoanInfoDTO;
import com.sunbeam.entity.LoanInfo;
import com.sunbeam.entity.Status;

public interface LoanInfoDAO extends JpaRepository<LoanInfo, Long> {


	List<LoanInfo> findByStatus(Status status);

	List<LoanInfo> findByUserId(Long id);

   
}
