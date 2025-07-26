package com.sunbeam.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.entity.TransacMode;
import com.sunbeam.entity.TransacType;
import com.sunbeam.entity.Transaction;

public interface TransactionDao extends JpaRepository<Transaction, Long> {


	
	List<Transaction> findByTransactionMode(TransacMode transactionMode);
	
	List<Transaction> findByTransactionType(TransacType transactionType);
	

    Optional<Transaction> findById(Long id) ;
    
    
    Optional<Transaction> getTransactionById(Long transactionId) ;
}
