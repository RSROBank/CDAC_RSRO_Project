package com.sunbeam.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.entity.LoanInfo;

public interface LoanInfoDAO extends JpaRepository<LoanInfo, Long> {
   
}
