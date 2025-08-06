package com.sunbeam.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.entity.Transaction;



public interface TransactionDao extends JpaRepository<Transaction, Long> {
//	List<Transaction> findByUserIdAndCreatedAtLessThanEqual(
//          String userId, LocalDateTime toDate);
//	
	List<Transaction> findByUserId(Long userId);

//	List<Transaction> findByUserIdAndCreatedAtBetween(
//          Long userId, LocalDateTime fromDate, LocalDateTime toDate);
	
	List<Transaction> findTop5ByUserIdOrderByCreatedAtDesc(Long id);
	
}
