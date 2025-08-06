package com.sunbeam.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.sunbeam.dao.NotificationDao;
import com.sunbeam.dto.EmployeeResponseDTO;
import com.sunbeam.dto.NotificationResolveRequestDTO;
import com.sunbeam.service.EmployeeService;

import lombok.AllArgsConstructor;


@RestController
@RequestMapping("/employees")
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class EmployeeController 
{
	
	private final EmployeeService employeeService;

	
	@PostMapping("/employeeCreate")
	ResponseEntity<?> createEmployee(@RequestBody EmployeeResponseDTO dto)
	{
		//System.out.println("employee created" +dto);
		return ResponseEntity.ok(
				employeeService.createEmployee(dto));
	}
	
	@GetMapping("/{id}")
	ResponseEntity<?> getEmployeeById(@PathVariable Long id)
	{
		System.out.println("get Employee" + id);
		return ResponseEntity.ok(
				employeeService.getEmployeeById(id));
	}
	
	@GetMapping
	ResponseEntity<?> getAllEmployees()
	{
		System.out.println("get all employee"); 
		return ResponseEntity.ok(
				employeeService.getAllEmployees());
	}
	
	@PutMapping("/{id}")
    ResponseEntity<?> updateEmployee(@PathVariable Long id, @RequestBody EmployeeResponseDTO dto)
	{
		System.out.println("update employee");
        return ResponseEntity.ok(
        		employeeService.updateEmployee(id, dto));
    }
	
	@DeleteMapping("/{id}")
	ResponseEntity<?> deleteEmployee(@PathVariable Long id)
	{
		System.out.println("delete employee");
		return ResponseEntity.ok(employeeService.deleteEmployee(id));       
	}

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
