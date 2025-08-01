package com.sunbeam.pojo;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BankRates {
	
	private double savingsInterestRate;
    private Map<String, Double> fdRates;
    private double loanInterestRate;

}
