package com.sunbeam.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dto.LoanInfoDTO;
import com.sunbeam.entity.Status;
import com.sunbeam.service.LoanInfoService;

import lombok.AllArgsConstructor;



@RestController
@RequestMapping("/user/loans")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class LoanInfoController {

    private final LoanInfoService loanInfoService;
  
    @PostMapping("/saveloan")
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
    
    @GetMapping("/pending")
    public ResponseEntity<?> getPendingLoan() {
        return ResponseEntity.ok(loanInfoService.getPendingLoan());
    }
    
    @PutMapping("/change/{id}")
    public ResponseEntity<?> changeStatusVerified(@PathVariable Long name,@RequestBody Status status) {
        
        return ResponseEntity.ok(loanInfoService.statusChange(name, status));
    }
    
    
}

