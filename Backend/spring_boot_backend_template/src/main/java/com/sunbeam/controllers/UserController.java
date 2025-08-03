package com.sunbeam.controllers;

import java.util.Map;
import jakarta.servlet.http.HttpSession;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
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
import com.sunbeam.dto.LoginDTO;
import com.sunbeam.dto.OtpRequest;
import com.sunbeam.dto.RegisterDTO;
import com.sunbeam.dto.UpdateProfileRequestDTO;
import com.sunbeam.dto.UserDTO;
import com.sunbeam.entity.User;
import com.sunbeam.entity.UserEntity;
import com.sunbeam.security.CustomUserDetailsServiceImpl;
import com.sunbeam.security.JwtUtils;
import com.sunbeam.service.EmailService;
import com.sunbeam.service.OtpService;
import com.sunbeam.service.UserService;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {	
	private final UserService userService;
	private final ObjectMapper objectMapper;
	private final AuthenticationManager authenticationManager;
	private final JwtUtils jwtUtils;
	private final OtpService otpService;
	private final EmailService emailService;
	private final ModelMapper modelMapper;
	private final CustomUserDetailsServiceImpl customUserDetailsService;
	
	@PostMapping("/login")
	public ResponseEntity<?> userLogin(@RequestBody LoginDTO dto,HttpSession session)
	{
		
		Authentication authToken = new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword());
        Authentication validAuth = authenticationManager.authenticate(authToken);
		
		String otp = otpService.generateOtp(dto.getEmail());
		
		emailService.sendOtpEmail(dto.getEmail(), otp);
		
		session.setAttribute("email", dto.getEmail());
		
		return ResponseEntity.ok().body(Map.of(
                "message", "Login successful. OTP sent to your email.",
                "requireOtp", true
        ));
		
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
	
	@PostMapping("/verifyOtp")
	public ResponseEntity<?> verifyOtp(@RequestBody OtpRequest dto, HttpSession session) {
		
		 String sessionEmail = (String) session.getAttribute("email");

		    if (sessionEmail == null || !sessionEmail.equals(dto.getEmail())) {
		        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
		                             .body(Map.of("message", "Session expired or email mismatch"));
		    }
		 

		    boolean isValidOtp = otpService.validateOtp(sessionEmail, dto.getOtp());
		    if (!isValidOtp) {
		        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
		                             .body(Map.of("message", "Invalid or expired OTP"));
		    }

		    UserDetails userDetails = customUserDetailsService.loadUserByUsername(sessionEmail);
		    Authentication auth = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

		    SecurityContextHolder.getContext().setAuthentication(auth);
	
		    return ResponseEntity.ok().body(new AuthResp("Successful login!", jwtUtils.generateJwtToken(auth)));
	}


}
