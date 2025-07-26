package com.sunbeam.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "FD_Info")
@Getter
@Setter
@NoArgsConstructor
public class DepositEntity {

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fd_id", length = 100)
    private Long id;

    @Column(name = "user_id", length = 100)
    private Long userId;

    @Column(name = "principal_amount", precision = 15, scale = 2)
    private BigDecimal principalAmount;

    @Column(precision = 15, scale = 2)
    private BigDecimal interest;

    @Column(name = "tenure_months")
    private Integer tenureMonths;

    @Column(name = "start_date")
    private LocalDateTime startDate;
    
    @Enumerated(EnumType.STRING)
    
    private Status status;

    @Column(name = "emp_reference_id")
    private Long empReferenceId;
    
    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "modified_at")
    private LocalDateTime modifiedAt;
    
    
    // Parameterized constructor
    public DepositEntity(Long userId, BigDecimal principalAmount, BigDecimal interest,
                     Integer tenureMonths, LocalDateTime startDate, Status status, Long empReferenceId,
                     LocalDateTime createdAt, LocalDateTime modifyAt) {
        this.userId = userId;
        this.principalAmount = principalAmount;
        this.interest = interest;
        this.tenureMonths = tenureMonths;
        this.startDate = startDate;
        this.status = status;
        this.empReferenceId = empReferenceId;
        this.createdAt = createdAt;
        this.modifiedAt = modifyAt;
    }

 }

