package com.sunbeam.controllers;

import java.util.Map;
import jakarta.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dto.LoginDTO;
import com.sunbeam.dto.RegisterDTO;
import com.sunbeam.dto.UserDTO;
import com.sunbeam.entity.User;
import com.sunbeam.service.FileStorageService;
import com.sunbeam.service.UserService;


import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	
	private UserService userService;
	
	@PostMapping("/login")
	public ResponseEntity<?> userLogin(@RequestBody LoginDTO dto,HttpSession session)
	{
		System.out.println("in Login in "+dto);
		UserDTO user = userService.signIn(dto); // Authenticated user object
		
	    if (user != null) {
	        session.setAttribute("user", user); // Save user to session
	        return ResponseEntity.ok(Map.of("message", "Login successful", "user", user));
	    } else {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
	                .body(Map.of("message", "Invalid credentials"));
	    }
	}
	
	@PostMapping("/signup")
	public ResponseEntity<?> userSignUp(@ModelAttribute RegisterDTO dto)
	{
		System.out.println("in sign up "+ dto);
		
		return ResponseEntity.ok(
				userService.signUp(dto));
	}

}
