package com.sunbeam.service;

import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.LoginDTO;
import com.sunbeam.dto.RegisterDTO;
import com.sunbeam.dto.UserDTO;

public interface UserService {

	UserDTO signIn(LoginDTO dto);
	
	ApiResponse signUp(RegisterDTO dto);

}
