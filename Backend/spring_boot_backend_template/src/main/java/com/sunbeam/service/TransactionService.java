package com.sunbeam.service;

import java.util.List;
import java.util.Optional;

import com.sunbeam.dto.TransactionDTO;
import com.sunbeam.entity.Status;
import com.sunbeam.entity.TransacMode;
import com.sunbeam.entity.TransacType;
import com.sunbeam.entity.Transaction;

public interface TransactionService {
	
	Transaction createTransaction(TransactionDTO dto);
	
	Optional<Transaction> getTransactionsByUserId(Long userId) ;
	
	Optional<Transaction> getTransactionById(Long transactionId);
	
	List<Transaction> getTransactionsByStatus(Status status) ;

	
}
