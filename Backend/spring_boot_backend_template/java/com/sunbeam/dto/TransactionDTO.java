package com.sunbeam.dto;

import java.time.LocalDateTime;

import com.sunbeam.entity.Status;


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

	
	@NotNull
	@NotBlank
	private long id;
	
	@NotNull
	@NotBlank
	private String userId;
	
	@NotBlank
	@NotNull
	private Long toAccount;
	
	@NotBlank
	@Min(1)
	private Float amount;
	
	@NotNull
	private Status status;
	
	
	private String description;
	
	@NotBlank
	@NotNull
	private String transactionMode;
	
	@NotBlank
	@NotNull
	private String transactionType;
	
	@NotBlank
	@NotNull
	private LocalDateTime createdAt;
	
	@NotBlank
	@NotNull
	private LocalDateTime modifiedAt;
	
	
	
}
