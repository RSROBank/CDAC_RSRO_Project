package com.sunbeam.service;

import java.util.List;

import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.LoanTransactionDTO;

public interface LoanTransactionService {
    ApiResponse saveTransaction(LoanTransactionDTO dto);
    List<LoanTransactionDTO> getAllTransactions();
}
