package com.sunbeam.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sunbeam.dto.LoanTransactionDTO;
import com.sunbeam.service.LoanTransactionService;

import lombok.AllArgsConstructor;


@RestController
@RequestMapping("/user/transactions")
@AllArgsConstructor
@CrossOrigin
public class LoanTranasactionControllers {
    @Autowired
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
