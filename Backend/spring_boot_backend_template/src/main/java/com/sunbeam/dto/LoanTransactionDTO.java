package com.sunbeam.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.sunbeam.entity.Status;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoanTransactionDTO {
    
	@NotNull
    private int id;
	@NotNull
    private Long loanInfoId;
	@NotNull
    private Status status;
	@NotNull
    private int emiInstallmentsLeft;
	@NotNull 
    private BigDecimal emiAmount;
	@NotNull 
    private BigDecimal lateFees;
	@NotNull
    private LocalDateTime createdAt;
	@NotNull
    private LocalDateTime modifyAt;
}
