package com.sunbeam.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.sunbeam.custom_exceptions.ResourceNotFoundException;
import com.sunbeam.dao.CardDetailDAO;
import com.sunbeam.dao.TransactionDao;
import com.sunbeam.dao.UserDao;
import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.CardDetailResponseDTO;
import com.sunbeam.dto.CardRequestDTO;
import com.sunbeam.dto.CustomerDashboardResponseDTO;
import com.sunbeam.dto.TransactionDTO;
import com.sunbeam.entity.CardDetails;
import com.sunbeam.entity.Transaction;
import com.sunbeam.entity.User;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class TransactionServiceImpl implements TransactionService{
	
	private final ModelMapper modelMapper;
	private final TransactionDao transactionDao;
	private final UserDao userDao;
	private final CardDetailDAO cardDetailDao;
	
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


	@Override
	public CustomerDashboardResponseDTO findUserDetailAndStatementByUserId(String userId) {
		User user = userDao.findById(Long.parseLong(userId)).orElseThrow(()-> new ResourceNotFoundException("User not found"));
		CardDetails card = cardDetailDao.findByUserId(Long.parseLong(userId)).orElseThrow(()-> new ResourceNotFoundException("Card Not found"));
		CardDetailResponseDTO carddto = modelMapper.map(card, CardDetailResponseDTO.class);
		
		List<TransactionDTO> trnasdto = transactionDao.findTop5ByUserIdOrderByCreatedAtDesc(userId).stream()
				.map(transaction -> modelMapper.map(transaction, TransactionDTO.class))
				.collect(Collectors.toList());
		
		CustomerDashboardResponseDTO dto = new CustomerDashboardResponseDTO();
		dto.setFullName(user.getFirstName()+" "+ user.getLastName());
		dto.setEmail(user.getEmail());
		dto.setMobile(user.getPhoneNumber());
		dto.setAccountNo(user.getAccount().getAccountNumber());
		dto.setCard(carddto);
		dto.setTransaction(trnasdto);
		
		return dto;
	}


	public ApiResponse updateCardExpirayByUserId(String userId, CardRequestDTO dto) {
		CardDetails card = cardDetailDao.findByUserId(Long.parseLong(userId)).orElseThrow(()-> new ResourceNotFoundException("card not found"));
		System.out.println(dto.getExpiry());
		card.setExpiry(dto.getExpiry());
		return new ApiResponse("card expiray detail updated successfully");
	}
	
	
	
	
	

}
