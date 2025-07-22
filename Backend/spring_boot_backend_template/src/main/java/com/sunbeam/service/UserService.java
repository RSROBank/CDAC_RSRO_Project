package com.sunbeam.service;

import com.sunbeam.dto.LoginDTO;
import com.sunbeam.dto.UserDTO;

public interface UserService {

	UserDTO signIn(LoginDTO dto);

}
