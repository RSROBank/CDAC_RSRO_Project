package com.sunbeam.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dto.LoginDTO;
import com.sunbeam.dto.RegisterDTO;
import com.sunbeam.entity.User;
import com.sunbeam.service.FileStorageService;
import com.sunbeam.service.UserService;


import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	
	private UserService userService;
	
	@PostMapping("/login")
	public ResponseEntity<?> userLogin(@RequestBody LoginDTO dto)
	{
		System.out.println("in sign in "+dto);
		return ResponseEntity.ok(
				userService.signIn(dto));
	}
	
	@PostMapping("/signup")
	public ResponseEntity<?> userSignUp(@ModelAttribute RegisterDTO dto)
	{
		System.out.println("in sign up "+ dto);
		
		return ResponseEntity.ok(
				userService.signUp(dto));
	}

}
