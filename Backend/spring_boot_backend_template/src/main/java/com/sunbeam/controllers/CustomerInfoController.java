package com.sunbeam.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import com.sunbeam.service.CustomerInfoService;

public class CustomerInfoController {
	
	 private CustomerInfoService customerInfoService;

	    @GetMapping("/verified")
	    public ResponseEntity<?> getVerifiedUsers() {
	    	System.out.println("Customer is verified");
	        return ResponseEntity.ok(
	        		customerInfoService.getFindByStatusVerified());
	    }

}

