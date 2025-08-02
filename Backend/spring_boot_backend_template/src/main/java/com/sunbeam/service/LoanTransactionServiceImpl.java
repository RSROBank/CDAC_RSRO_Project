package com.sunbeam.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.LoanTransactionDTO;
import com.sunbeam.entity.LoanTransaction;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

import com.sunbeam.dao.LoanTransactionDAO;

@Transactional
@Service
@AllArgsConstructor
public class LoanTransactionServiceImpl implements LoanTransactionService {

    @Autowired
    private ModelMapper modelMapper;
    private LoanTransactionDAO transactionDao;

    @Override
    public ApiResponse saveTransaction(LoanTransactionDTO dto) {
        LoanTransaction loanTransaction = modelMapper.map(dto, LoanTransaction.class);
        transactionDao.save(loanTransaction);
        return new ApiResponse("Loan transaction saved successfully.");
    }

    @Override
    public List<LoanTransactionDTO> getAllTransactions() {
        return transactionDao.findAll().stream()
                .map(entity -> modelMapper.map(entity, LoanTransactionDTO.class))
                .collect(Collectors.toList());
    }
}
