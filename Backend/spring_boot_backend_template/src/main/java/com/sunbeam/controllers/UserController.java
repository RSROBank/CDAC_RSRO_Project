package com.sunbeam.controllers;

import java.util.Map;
import jakarta.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sunbeam.custom_exceptions.IOException;
import com.sunbeam.dto.LoginDTO;
import com.sunbeam.dto.RegisterDTO;
import com.sunbeam.dto.UpdateProfileRequestDTO;
import com.sunbeam.dto.UserDTO;
import com.sunbeam.entity.User;
import com.sunbeam.service.FileStorageService;
import com.sunbeam.service.UserService;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {

	private UserService userService;
	private ObjectMapper objectMapper;

	@PostMapping("/login")
	public ResponseEntity<?> userLogin(@RequestBody LoginDTO dto, HttpSession session) {
		System.out.println("in Login in " + dto);
		UserDTO user = userService.signIn(dto); // Authenticated user object

		if (user != null) {
			session.setAttribute("user", user); // Save user to session
			return ResponseEntity.ok(Map.of("message", "Login successful", "user", user));
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid credentials"));
		}
	}

	@PostMapping("/signup")
	public ResponseEntity<?> userSignUp(@RequestParam("image") MultipartFile img,
			@RequestParam("filedata") String filedata)
			throws IOException, JsonMappingException, JsonProcessingException {
		RegisterDTO dto1 = objectMapper.readValue(filedata, RegisterDTO.class);
		return ResponseEntity.ok(userService.signUp(dto1, img));
	}

	@GetMapping("/profile/{userId}")
	public ResponseEntity<?> getCustomerProfile(@PathVariable Long userId) {
		return ResponseEntity.ok(userService.getProfileByUserId(userId));
	}
	
	@PostMapping("/profile/{userId}")
	public ResponseEntity<?> updateCustomerProfile(@PathVariable Long userId, @RequestBody UpdateProfileRequestDTO dto) {
		return ResponseEntity.ok(userService.updateProfileByUserId(userId, dto));
	}

}
