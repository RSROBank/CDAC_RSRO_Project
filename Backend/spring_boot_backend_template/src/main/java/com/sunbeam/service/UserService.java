package com.sunbeam.service;

import java.io.IOException;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.multipart.MultipartFile;

import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.LoginDTO;
import com.sunbeam.dto.ProfileResponseDTO;
import com.sunbeam.dto.RegisterDTO;
import com.sunbeam.dto.UpdateProfileRequestDTO;
import com.sunbeam.dto.UserDTO;

public interface UserService {

	UserDTO signIn(LoginDTO dto);
	
	ApiResponse signUp(RegisterDTO dto, MultipartFile img) throws IOException;
	ProfileResponseDTO getProfileByUserId(Long userId);

	ApiResponse updateProfileByUserId(Long userId, UpdateProfileRequestDTO dto);

	Object getEmployeeProfileByUserId(Long userId);

	Object getAdminProfileByUserId(Long userId);

	UserDetails loadUserByUsername(String email);

}
