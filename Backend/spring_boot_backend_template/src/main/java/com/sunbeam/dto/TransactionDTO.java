package com.sunbeam.dto;

import java.time.LocalDateTime;

import com.sunbeam.entity.Status;
import com.sunbeam.entity.TransactionMode;
import com.sunbeam.entity.TransactionType;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;




@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class TransactionDTO {

	
//	@NotNull
//	private long id;
//	
	@NotBlank
	private String userId;
	
	@NotNull
	private Long toAccount;
	
	@NotBlank
	private String accountHolderName;
	
	@NotNull
	@Min(1)
	private Float amount;
	
	@NotNull
	private Status status;
	
	@NotBlank
	private String description;
	
	@NotBlank
	private TransactionMode transactionMode;
	
	@NotBlank
	private TransactionType transactionType;
	
	@NotNull
	private LocalDateTime createdAt;
//	
//	@NotNull
//	private LocalDateTime modifiedAt;
	
	
	
}
