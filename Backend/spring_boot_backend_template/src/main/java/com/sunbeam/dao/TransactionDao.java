package com.sunbeam.dao;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sunbeam.entity.Transaction;



public interface TransactionDao extends JpaRepository<Transaction, Long> {
	List<Transaction> findByUserIdAndCreatedAtLessThanEqual(
          String userId, LocalDateTime toDate);
	
	List<Transaction> findByUserId(String userId);

	List<Transaction> findByUserIdAndCreatedAtBetween(
          String userId, LocalDateTime fromDate, LocalDateTime toDate);
	
}
