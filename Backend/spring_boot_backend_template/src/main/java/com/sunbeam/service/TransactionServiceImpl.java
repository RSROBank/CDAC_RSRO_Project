package com.sunbeam.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.sunbeam.dao.TransactionDao;
import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.TransactionDTO;
import com.sunbeam.entity.Transaction;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class TransactionServiceImpl implements TransactionService{
	
	private final ModelMapper modelMapper;
	private final TransactionDao transactionDao;
	
	@Override
	public ApiResponse saveTransaction(TransactionDTO dto) {

		Transaction transaction = modelMapper.map(dto, Transaction.class);
		
		transaction.setUserId(dto.getUserId());
		transaction.setStatus(dto.getStatus());
		transaction.setCreatedAt(LocalDateTime.now());
		transaction.setModifiedAt(LocalDateTime.now());
		
		
		transactionDao.save(transaction);
		
		
		return new ApiResponse("Transaction Successful.");
	} 
	
	
	@Override
    public List<TransactionDTO> findByUserId(String userId) {
        
        return transactionDao.findByUserId(userId)
        		.stream()
        		.map(transaction -> modelMapper.map(transaction, TransactionDTO.class))
        		.collect(Collectors.toList());
    }
	
	
	
	
	

}
