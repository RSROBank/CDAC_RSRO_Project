package com.sunbeam.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dto.EmployeeResponseDTO;
import com.sunbeam.dto.NotificationResolveRequestDTO;
import com.sunbeam.entity.UserEntity;
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
	
	@GetMapping("/")
	ResponseEntity<?> getEmployeeById(@AuthenticationPrincipal UserEntity userDetails)
	{
//		System.out.println("get Employee" + id);
		return ResponseEntity.ok(
				employeeService.getEmployeeById(userDetails.getId()));
	}
	
	@GetMapping
	ResponseEntity<?> getAllEmployees()
	{
		System.out.println("get all employee"); 
		return ResponseEntity.ok(
				employeeService.getAllEmployees());
	}
	
	@PutMapping("/")
    ResponseEntity<?> updateEmployee(@AuthenticationPrincipal UserEntity userDetails, @RequestBody EmployeeResponseDTO dto)
	{
		System.out.println("update employee");
        return ResponseEntity.ok(
        		employeeService.updateEmployee(userDetails.getId(), dto));
    }
	
	@DeleteMapping("/")
	ResponseEntity<?> deleteEmployee(@AuthenticationPrincipal UserEntity userDetails)
	{
		System.out.println("delete employee");
		return ResponseEntity.ok(employeeService.deleteEmployee(userDetails.getId()));       
	}

	@GetMapping("/loanquery")
	public ResponseEntity<?> getAllQuery(@AuthenticationPrincipal UserEntity userDetails){
		
		return ResponseEntity.ok(employeeService.getAllQuery(userDetails.getId()));
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
