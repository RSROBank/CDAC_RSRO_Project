package com.sunbeam.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dto.CardRequestDTO;
import com.sunbeam.dto.CustomerDashboardResponseDTO;
import com.sunbeam.dto.TransactionDTO;
import com.sunbeam.entity.UserEntity;
import com.sunbeam.service.TransactionService;

import lombok.AllArgsConstructor;


@RestController
@RequestMapping("/transactions")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class TransactionController {

	
	private final TransactionService transactionService;

	

    @PostMapping("/pay")
    public ResponseEntity<?> processPayment(@RequestBody TransactionDTO dto) {
        
        transactionService.saveTransaction(dto);
        return ResponseEntity.ok("Payment processed successfully");
    }
    
    
    @GetMapping
    public ResponseEntity<?> getTransactionsByUserId(@AuthenticationPrincipal UserEntity userDetails) {
        List<TransactionDTO> transactions = transactionService.findByUserId(userDetails.getId());
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/dashboard")
    public ResponseEntity<?> getUserDetailAndStatementByUserId(@AuthenticationPrincipal UserEntity userDetails) {
    	System.out.println("in Mehtod");
        CustomerDashboardResponseDTO transactions = transactionService.findUserDetailAndStatementByUserId(userDetails.getId());
        return ResponseEntity.ok(transactions);
    }
    
    @PutMapping("/cardupdate")
    public ResponseEntity<?> updateCardExpirayByUserId(@AuthenticationPrincipal UserEntity userDetails, @RequestBody CardRequestDTO dto) {
        return ResponseEntity.ok(transactionService.updateCardExpirayByUserId(userDetails.getId(), dto));
    }
	    
	
}
