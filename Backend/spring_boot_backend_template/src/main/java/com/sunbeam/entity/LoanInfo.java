package com.sunbeam.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
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
@Getter
@Setter
@NoArgsConstructor
@Table(name = "users")
public class LoanInfo {
	
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int id;

	    private BigDecimal amount;
	    @Column(name = "approved_date")
	    private LocalDateTime approvedDate;
	    
	    @Column(name = "tenure_months")
	    private int tenureMonths;
	    
	    @Enumerated(EnumType.STRING)
	    private Status status;
	    
	    @Column(name = "user_id")
	    private Long userId;
	    
	    @Column(name = "total_emis")
	    private int totalEmis;
	    
	    @Column(name = "emi_amount")
	    private BigDecimal emiAmount;
	    
	    @CreationTimestamp
	    @Column(name = "created_at")
	    private LocalDateTime createdAt;
	    
	    @UpdateTimestamp
	    @Column(name = "modified_at")
	    private LocalDateTime modifiedAt;

		public LoanInfo(BigDecimal amount, LocalDateTime approvedDate, int tenureMonths, Status status, Long userId,
				int totalEmis, BigDecimal emiAmount, LocalDateTime createdAt, LocalDateTime modifiedAt) {
			super();
			this.amount = amount;
			this.approvedDate = approvedDate;
			this.tenureMonths = tenureMonths;
			this.status = status;
			this.userId = userId;
			this.totalEmis = totalEmis;
			this.emiAmount = emiAmount;
			this.createdAt = createdAt;
			this.modifiedAt = modifiedAt;
		}
	    
	    

}
