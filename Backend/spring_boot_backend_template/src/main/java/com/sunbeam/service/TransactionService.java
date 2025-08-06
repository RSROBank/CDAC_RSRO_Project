package com.sunbeam.service;

import java.util.List;

import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.CardRequestDTO;
import com.sunbeam.dto.CustomerDashboardResponseDTO;
import com.sunbeam.dto.TransactionDTO;

public interface TransactionService {

	ApiResponse saveTransaction(TransactionDTO dto);

	List<TransactionDTO> findByUserId(Long userId);

	CustomerDashboardResponseDTO findUserDetailAndStatementByUserId(Long userId);

	ApiResponse updateCardExpirayByUserId(Long userId, CardRequestDTO dto);

}
