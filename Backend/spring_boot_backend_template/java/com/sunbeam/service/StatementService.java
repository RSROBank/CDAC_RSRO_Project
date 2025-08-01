package com.sunbeam.service;

import java.time.LocalDate;

import com.sunbeam.dto.StatementResponseDTO;

public interface StatementService {

	public StatementResponseDTO getStatement(String accountNo, LocalDate fromDate, LocalDate toDate, String type);
}
