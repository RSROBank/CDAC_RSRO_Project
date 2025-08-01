package com.sunbeam.dto;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.web.bind.annotation.CrossOrigin;

import com.sunbeam.entity.Status;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@CrossOrigin(origins = "http://localhost:3000")
@NoArgsConstructor
@AllArgsConstructor
public class DepositDTO {
	
	@NotNull(message = "user id is required")
    private Long userId;
	@NotNull(message = "principal amount is required")
    private BigDecimal principalAmount;
	@NotNull(message = "rate of interest is required")
    private BigDecimal interest;
	@NotNull(message = "tenure months will be valid")
    private Integer tenureMonths;
	@NotNull(message = "starting date is required")
    private LocalDateTime startDate;
	@NotNull(message = "status is mandatory")
    private Status status;
	@NotNull(message = "emp reference id is required")
    private Long empReferenceId;
	@NotNull(message = "created date and time is mandatory")
    private LocalDateTime createdAt;
	@NotNull(message = "modified date and time is manadory")
    private LocalDateTime modifiedAt;

}
    
