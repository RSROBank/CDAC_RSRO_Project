package com.sunbeam.service;

import java.util.List;

import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.CardRequestDTO;
import com.sunbeam.dto.CustomerDashboardResponseDTO;
import com.sunbeam.dto.TransactionDTO;

public interface TransactionService {

	ApiResponse saveTransaction(TransactionDTO dto);

	List<TransactionDTO> findByUserId(String userId);

	CustomerDashboardResponseDTO findUserDetailAndStatementByUserId(String userId);

	ApiResponse updateCardExpirayByUserId(String userId, CardRequestDTO dto);

}
