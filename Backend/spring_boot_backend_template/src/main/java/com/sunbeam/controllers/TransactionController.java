package com.sunbeam.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dto.StatementRequestDTO;
import com.sunbeam.dto.TransactionDTO;
import com.sunbeam.entity.Transaction;
import com.sunbeam.service.StatementService;
import com.sunbeam.service.TransactionService;

import lombok.AllArgsConstructor;


@RestController
@RequestMapping("/transactions")
@CrossOrigin
@AllArgsConstructor
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

    
	    
	
}
