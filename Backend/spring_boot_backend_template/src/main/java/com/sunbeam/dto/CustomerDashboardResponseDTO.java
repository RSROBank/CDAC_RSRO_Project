package com.sunbeam.dto;


import java.util.List;
import jakarta.validation.constraints.NotEmpty;
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
public class CustomerDashboardResponseDTO {
	@NotNull
	private String fullName;
	@NotNull
	private String email;
	@NotNull
	private Long mobile;
	@NotNull 
	private String accountNo;
	@NotNull
	private CardDetailResponseDTO card;
	@NotEmpty
	private List<TransactionDTO> transaction;
}
