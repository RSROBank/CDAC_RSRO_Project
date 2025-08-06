package com.sunbeam.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dao.NotificationDao;
import com.sunbeam.dto.NotificationResolveRequestDTO;
import com.sunbeam.service.EmployeeService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/employee")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {
	
	private final EmployeeService employeeService;

	@GetMapping("/loanquery/{employeeId}")
	public ResponseEntity<?> getAllQuery(@PathVariable Long employeeId){
		
		return ResponseEntity.ok(employeeService.getAllQuery(employeeId));
	}
	
	@PutMapping("/loanquery/{queryId}")
	public ResponseEntity<?> resolveQuery(@PathVariable Long queryId, @RequestBody NotificationResolveRequestDTO dto){
		
		return ResponseEntity.ok(employeeService.resolveQuery(queryId, dto));
	}
	
	@GetMapping("/alltransactions")
	public ResponseEntity<?> getAllTransaction(){
		return ResponseEntity.ok(employeeService.getAllTransaction());
	}
}
