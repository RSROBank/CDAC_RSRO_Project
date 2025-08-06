package com.sunbeam.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dto.CardRequestDTO;
import com.sunbeam.dto.CustomerDashboardResponseDTO;
import com.sunbeam.dto.TransactionDTO;
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
    
    
    @GetMapping("/{userId}")
    public ResponseEntity<?> getTransactionsByUserId(@PathVariable String userId) {
        List<TransactionDTO> transactions = transactionService.findByUserId(userId);
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/dashboard/{userId}")
    public ResponseEntity<?> getUserDetailAndStatementByUserId(@PathVariable String userId) {
        CustomerDashboardResponseDTO transactions = transactionService.findUserDetailAndStatementByUserId(userId);
        return ResponseEntity.ok(transactions);
    }
    
    @PutMapping("/cardupdate/{userId}")
    public ResponseEntity<?> updateCardExpirayByUserId(@PathVariable String userId, @RequestBody CardRequestDTO dto) {
        return ResponseEntity.ok(transactionService.updateCardExpirayByUserId(userId, dto));
    }
	    
	
}
