package com.sunbeam.service;

import java.util.List;

import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.TransactionDTO;

public interface TransactionService {

	ApiResponse saveTransaction(TransactionDTO dto);

	List<TransactionDTO> findByUserId(String userId);

}
