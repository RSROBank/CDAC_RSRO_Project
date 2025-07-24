package com.sunbeam.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;

@Entity
public class LoanTransaction {
	
		@Id
	    private int id;
		@Column(name = "loan_info_id")
	    private Long loanInfoId;
		@Enumerated(EnumType.STRING)
	    private Status status;
		
		@Column(name = "emi_installment_left")
	    private int emiInstallmentsLeft;
		
		@Column(name = "emi_amount")
	    private BigDecimal emiAmount;
		@Column(name = "late_fees")
	    private BigDecimal lateFees;
		
		@CreationTimestamp
	    @Column(name = "created_at")
	    private LocalDateTime createdAt;
		
		@UpdateTimestamp
	    @Column(name = "modified_at")
	    private LocalDateTime modifyAt;

		public LoanTransaction(Long loanInfoId, Status status, int emiInstallmentsLeft, BigDecimal emiAmount,
				BigDecimal lateFees, LocalDateTime createdAt, LocalDateTime modifyAt) {
			super();
			this.loanInfoId = loanInfoId;
			this.status = status;
			this.emiInstallmentsLeft = emiInstallmentsLeft;
			this.emiAmount = emiAmount;
			this.lateFees = lateFees;
			this.createdAt = createdAt;
			this.modifyAt = modifyAt;
		}
		
		

}
