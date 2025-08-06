package com.sunbeam.service;

import java.util.List;

import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.LoanInfoDTO;
import com.sunbeam.entity.Status;

public interface LoanInfoService {
    ApiResponse saveLoanInfo(LoanInfoDTO dto);
    List<LoanInfoDTO> getAllLoans();
    LoanInfoDTO getLoanById(Long id);

	List<LoanInfoDTO> getPendingLoan();
	ApiResponse statusChange(Long name, Status status);


	List<LoanInfoDTO> getLoanByuserId(Long id);

}
