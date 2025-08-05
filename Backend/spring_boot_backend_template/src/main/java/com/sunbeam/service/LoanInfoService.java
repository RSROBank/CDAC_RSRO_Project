package com.sunbeam.service;

import java.util.List;

import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.LoanInfoDTO;

public interface LoanInfoService {
    ApiResponse saveLoanInfo(LoanInfoDTO dto);
    List<LoanInfoDTO> getAllLoans();
    LoanInfoDTO getLoanById(Long id);
	List<LoanInfoDTO> getPendingLoan();
}
