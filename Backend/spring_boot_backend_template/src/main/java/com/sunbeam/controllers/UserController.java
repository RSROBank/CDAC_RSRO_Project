package com.sunbeam.controllers;

import java.util.Map;
import jakarta.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sunbeam.custom_exceptions.IOException;
import com.sunbeam.dto.AuthResp;
import com.sunbeam.dto.LoanRequestDTO;
import com.sunbeam.dto.LoginDTO;
import com.sunbeam.dto.RegisterDTO;
import com.sunbeam.dto.UpdateProfileRequestDTO;
import com.sunbeam.dto.UserDTO;
import com.sunbeam.entity.User;
import com.sunbeam.security.JwtUtils;

import com.sunbeam.service.UserService;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {	
	private final UserService userService;
	private ObjectMapper objectMapper;
	private AuthenticationManager authenticationManager;
	private JwtUtils jwtUtils;
	
	@PostMapping("/login")
	public ResponseEntity<?> userLogin(@RequestBody LoginDTO dto,HttpSession session)
	{
		Authentication authToken=	new UsernamePasswordAuthenticationToken(dto.getEmail(),dto.getPassword());
		
		Authentication validAuth = authenticationManager.authenticate(authToken);
		
		
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(new AuthResp("Succesful login !",
						jwtUtils.generateJwtToken(validAuth)));
	}

	@PostMapping("/signup")
	public ResponseEntity<?> userSignUp(@RequestParam("image") MultipartFile img,
			@RequestParam("filedata") String filedata)
			throws IOException, java.io.IOException {
		RegisterDTO dto1 = objectMapper.readValue(filedata, RegisterDTO.class);
		return ResponseEntity.ok(userService.signUp(dto1, img));
	}

	@GetMapping("/profile/{userId}")
	public ResponseEntity<?> getCustomerProfile(@PathVariable Long userId) {
		return ResponseEntity.ok(userService.getProfileByUserId(userId));
	}
	
	@GetMapping("/employeeprofile/{userId}")
	public ResponseEntity<?> getEmployeeProfile(@PathVariable Long userId) {
		return ResponseEntity.ok(userService.getEmployeeProfileByUserId(userId));
	}
	
	@GetMapping("/adminprofile/{userId}")
	public ResponseEntity<?> getAdminProfile(@PathVariable Long userId) {
		return ResponseEntity.ok(userService.getAdminProfileByUserId(userId));
	}
	
	@PutMapping("/profile/{userId}")
	public ResponseEntity<?> updateCustomerProfile(@PathVariable Long userId, @RequestBody UpdateProfileRequestDTO dto) {
		System.out.println(dto.toString());
		return ResponseEntity.ok(userService.updateProfileByUserId(userId, dto));
	}
	
	@PostMapping("/loanquery")
	public ResponseEntity<?> createLoanQuery(@RequestBody LoanRequestDTO dto){
		System.out.println(dto.toString());
		return ResponseEntity.ok(userService.saveQuery(dto));
	}
	
	@GetMapping("/loanquery/{userId}")
	public ResponseEntity<?> getAllLoanQuery(@PathVariable Long userId){
		System.out.println(userId);
		return ResponseEntity.ok(userService.getAllLoanQuery(userId));
	}

}
