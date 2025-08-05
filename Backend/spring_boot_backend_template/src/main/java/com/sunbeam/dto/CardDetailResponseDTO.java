package com.sunbeam.dto;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class CardDetailResponseDTO {
	@NotNull
    private String cardNumber;
    @NotNull
    private LocalDate expiry;
    @NotNull
    private Integer cvv;
    @NotNull
    private String type;
}
