package com.sunbeam.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.sunbeam.entity.Status;
import com.sunbeam.entity.TransacMode;
import com.sunbeam.entity.TransacType;
import com.sunbeam.entity.Transaction;

public class TransactionServiceImpl {

	@Autowired
    private Transaction transactionRepository;


    public Transaction createTransaction(Long userId, Long toAccount, Float amount, TransacMode mode, 
                                        TransacType type, Status status, String description, 
                                        Long fdId, Long loanId) {
        Transaction transaction = new Transaction();
        transaction.setUserId(userId);
        transaction.setToAccount(toAccount);
        transaction.setAmount(amount);
        transaction.setTransactionMode(mode);
        transaction.setTransactionType(type);
        transaction.setStatus(status);
        transaction.setDescription(description);
        transaction.setFdId(fdId);
        transaction.setLoanId(loanId);
        transaction.setCreatedAt(LocalDateTime.now());
        transaction.setModifiedAt(LocalDateTime.now());
        
        return transactionRepository.save(transaction);
    }

    public Optional<Transaction> getTransactionsByUserId(Long userId) {
        return transactionRepository.findByUserId(userId);
    }

//    @Override
    public Optional<Transaction> getTransactionById(Long transactionId) {
        return transactionRepository.findByUserId(transactionId);
    }

//    @Override
    public Transaction updateTransactionStatus(Long transactionId, Status status) {
        Transaction transaction = transactionRepository.findByUserId(transactionId)
            .orElseThrow(() -> new RuntimeException("Transaction not found with id: " + transactionId));
        transaction.setStatus(status);
        transaction.setModifiedAt(LocalDateTime.now());
        return transactionRepository.save(transaction);
    }

//    @Override
    public List<Transaction> getTransactionsByStatus(Status status) {
        return transactionRepository.findByStatus(status);
    }


	
}
