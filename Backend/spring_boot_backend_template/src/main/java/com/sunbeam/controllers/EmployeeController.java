package com.sunbeam.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.service.EmployeeService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/employee")
@AllArgsConstructor
public class EmployeeController {
	
	private final EmployeeService employeeService;

}
