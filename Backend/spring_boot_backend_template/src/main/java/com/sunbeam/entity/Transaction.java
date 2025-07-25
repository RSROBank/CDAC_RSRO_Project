package com.sunbeam.entity;

import java.time.LocalDateTime;

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
	private Long transactionId;
	
	@Column(name = "user_Id",length = 100)
	private String userId;
	
	@Column(name = "to_Account",length = 50)
	private Long toAccount;
	
	@Column(name="amount")
	private Float amount;
	
	@Enumerated(EnumType.STRING)
	private TransacMode transacMode;
	
	@Enumerated(EnumType.STRING)
	private TransacType transacType;
	
	@Enumerated(EnumType.STRING)
	private Status status;
	
	@Column(length = 150)
	private String description;
	
	@Column(name="created_At")
	@CreationTimestamp
	private LocalDateTime createdAt;
	
	@Column(name="modified_At")
	@UpdateTimestamp
	private LocalDateTime modifiedAt;
	
	
	
	@Column(name="fd_id")
	private Long fdId;
	
	@Column(name="loan_id")
	private Long loanId;

	public Transaction(String userId, Long toAccount, Float amount, Status status, String description,
			TransacMode transacMode, TransacType transacType, LocalDateTime createdAt, LocalDateTime modifiedAt, Long fdId,
			Long loanId) {
		super();
		this.userId = userId;
		this.toAccount = toAccount;
		this.amount = amount;
		this.status = status;
		this.description = description;
		this.transacMode = transacMode;
		this.transacType = transacType;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
		this.fdId = fdId;
		this.loanId = loanId;
	}
	
	

}
