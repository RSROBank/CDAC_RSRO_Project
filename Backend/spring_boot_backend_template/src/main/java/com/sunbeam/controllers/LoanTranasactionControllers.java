package com.sunbeam.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dto.LoanTransactionDTO;
import com.sunbeam.service.LoanTransactionService;

import lombok.AllArgsConstructor;


@RestController
@RequestMapping("/user/transactions")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class LoanTranasactionControllers {
	
    private LoanTransactionService transactionService;

    @PostMapping("/savedtransaction")
    public ResponseEntity<?> createTransaction(@RequestBody LoanTransactionDTO dto) {
        return ResponseEntity.ok (transactionService.saveTransaction(dto));
    }

    @GetMapping("/")
    public ResponseEntity<?> getAllTransactions() {
        return ResponseEntity.ok(transactionService.getAllTransactions());
    }
}
