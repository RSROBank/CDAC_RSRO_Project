package com.sunbeam.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "accounts")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class AccountEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(unique = true, nullable = false)
	private String accountNumber; // 12-digit auto-generated

	@Column(unique = true, nullable = false)
	private String upiId; // 12-digit auto-generated

	
	private double balance = 0.0;

	@Enumerated(EnumType.STRING)
	private Status status = Status.PENDING; // Default status

	@OneToOne
	@JoinColumn(name = "customer_id", unique = true)
	private User customer;

	public AccountEntity(String accountNumber, String upiId, double balance, Status status, User customer) {
		super();
		this.accountNumber = accountNumber;
		this.upiId = upiId;
		this.balance = balance;
		this.status = status;
		this.customer = customer;
	}

	// Bidirectional if needed, or lazy fetch from Loan/FD table
//	    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL)
//	    private List<LoanInfo> loans;
//
//	    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL)
//	    private List<DepositEntity> fds;

	// Getters & Setters
	
	
}
