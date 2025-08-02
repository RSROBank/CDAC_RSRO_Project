package com.sunbeam.service;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;

import com.sunbeam.custom_exceptions.IOException;
import com.sunbeam.dto.AdminResponseDTO;
import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.EmployeeResponseDTO;
import com.sunbeam.dto.LoanRequestDTO;
import com.sunbeam.dto.LoginDTO;
import com.sunbeam.dto.NotificationResponseDTO;
import com.sunbeam.dto.ProfileResponseDTO;
import com.sunbeam.dto.RegisterDTO;
import com.sunbeam.dto.UpdateProfileRequestDTO;
import com.sunbeam.dto.UserDTO;

public interface UserService {

	UserDTO signIn(LoginDTO dto);
	
	ApiResponse signUp(RegisterDTO dto, MultipartFile img) throws IOException;
	ProfileResponseDTO getProfileByUserId(Long userId);

	ApiResponse updateProfileByUserId(Long userId, UpdateProfileRequestDTO dto);

	EmployeeResponseDTO getEmployeeProfileByUserId(Long userId);

	AdminResponseDTO getAdminProfileByUserId(Long userId);

	ApiResponse saveQuery(LoanRequestDTO dto);

	List<NotificationResponseDTO> getAllLoanQuery(Long userId);

}
