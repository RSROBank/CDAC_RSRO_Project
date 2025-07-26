package com.sunbeam.entity;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "transactions")
@Getter
@Setter
@NoArgsConstructor

public class Transaction {
	@Id
	@Column(name = "transaction_id", length = 100)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "user_id")
	private Long userId;
	
	@Column(name = "to_account",length = 50)
	private Long toAccount;
	
	
	private Float amount;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "transaction_mode")
	private TransacMode transactionMode;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "transaction_type")
	private TransacType transactionType;
	
	@Enumerated(EnumType.STRING)
	private Status status;
	
	@Column(length = 300)
	private String description;
	
	@Column(name="created_at")
	@CreationTimestamp
	private LocalDateTime createdAt;
	
	@Column(name="modified_at")
	@UpdateTimestamp
	private LocalDateTime modifiedAt;
	
	
	
	@Column(name="fd_id")
	private Long fdId;
	
	@Column(name="loan_id")
	private Long loanId;

	public Transaction(Long userId, Long toAccount, Float amount, Status status, String description,
			TransacMode transactionMode, TransacType transactionType, LocalDateTime createdAt, LocalDateTime modifiedAt, Long fdId,
			Long loanId) {
		super();
		this.userId = userId;
		this.toAccount = toAccount;
		this.amount = amount;
		this.status = status;
		this.description = description;
		this.transactionMode = transactionMode;
		this.transactionType = transactionType;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
		this.fdId = fdId;
		this.loanId = loanId;
	}

	public Optional<Transaction> findByUserId(Long userId2) {
		// TODO Auto-generated method stub
		return null;
	}

	public List<Transaction> findByStatus(Status status2) {
		// TODO Auto-generated method stub
		return null;
	}

	public Transaction save(Transaction transaction) {
		// TODO Auto-generated method stub
		return null;
	}

	public void delete(Transaction transaction) {
		// TODO Auto-generated method stub
		
	}
	
	

}
