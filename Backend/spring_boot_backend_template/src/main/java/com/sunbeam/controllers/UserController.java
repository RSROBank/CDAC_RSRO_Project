package com.sunbeam.controllers;

import java.util.Map;
import jakarta.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
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
import com.sunbeam.dto.AuthResp;
import com.sunbeam.dto.LoginDTO;
import com.sunbeam.dto.RegisterDTO;
import com.sunbeam.dto.UserDTO;
import com.sunbeam.entity.User;
import com.sunbeam.security.JwtUtils;
import com.sunbeam.service.FileStorageService;
import com.sunbeam.service.UserService;


import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
@CrossOrigin(origins = "*")
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
	public ResponseEntity<?> userSignUp(@RequestParam("image") MultipartFile img , @RequestParam("filedata") String filedata) throws IOException, JsonMappingException, JsonProcessingException
	{
		RegisterDTO dto1 = objectMapper.readValue(filedata, RegisterDTO.class);
		return ResponseEntity.ok(userService.signUp(dto1, img));
	}

}
