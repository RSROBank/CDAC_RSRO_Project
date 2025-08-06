package com.sunbeam.controllers;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.pojo.BankRates;
import com.sunbeam.service.BankRateService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/admin")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

	private final BankRateService bankRateService;
	
	 @GetMapping("/rates")
	    public ResponseEntity<BankRates> getRates() throws IOException {
	        return ResponseEntity.ok(bankRateService.getRates());
	    }

	 @PutMapping("/rates")
	    public ResponseEntity<String> updateRates(@RequestBody BankRates updatedRates) throws IOException {
	        bankRateService.updateRates(updatedRates);
	        return ResponseEntity.ok("Rates updated successfully");
	    }
}
