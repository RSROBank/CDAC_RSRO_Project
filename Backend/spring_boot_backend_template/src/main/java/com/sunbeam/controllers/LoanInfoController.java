package com.sunbeam.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sunbeam.dto.LoanInfoDTO;
import com.sunbeam.service.LoanInfoService;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@RestController
@RequestMapping("/api/loans")
@AllArgsConstructor
public class LoanInfoController {

    private final LoanInfoService loanInfoService;

   

    @PostMapping("/saveLoan")
    public ResponseEntity<?> savedLoan(@RequestBody LoanInfoDTO dto) {
    	System.out.println("save loan"+dto);
        return ResponseEntity.ok(loanInfoService.saveLoanInfo(dto));
    }

    @GetMapping
    public ResponseEntity<?> getAllLoans() {
        System.out.println("get all loans");
        return ResponseEntity.ok(loanInfoService.getAllLoans());
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getLoanById(@PathVariable Long id) {
        System.out.println("get loan by id: " + id);
        return ResponseEntity.ok(loanInfoService.getLoanById(id));
    }
}

