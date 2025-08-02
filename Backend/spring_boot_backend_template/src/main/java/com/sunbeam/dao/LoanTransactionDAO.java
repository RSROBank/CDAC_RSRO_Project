package com.sunbeam.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sunbeam.entity.LoanTransaction;

public interface LoanTransactionDAO extends JpaRepository<LoanTransaction, Integer> {
   
}
