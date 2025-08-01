package com.sunbeam.dao;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sunbeam.entity.Transaction;

public interface TransactionDao extends JpaRepository<Transaction, Long> {
	@Query("SELECT t FROM Transaction t WHERE t.userId = :userId "
			+ "AND (:fromDate IS NULL OR t.createdAt >= :fromDate) "
			+ "AND (:toDate IS NULL OR t.createdAt <= :toDate) "
			+ "AND (:type IS NULL OR LOWER(t.transactionType) = LOWER(:type))")
	List<Transaction> findFilteredTransactions(@Param("userId") Long userId,
			@Param("fromDate") LocalDateTime fromDate, @Param("toDate") LocalDateTime toDate, @Param("type") String type);

}
