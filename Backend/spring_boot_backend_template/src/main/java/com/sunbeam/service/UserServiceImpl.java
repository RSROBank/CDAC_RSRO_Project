package com.sunbeam.service;

import java.io.IOException;

import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sunbeam.custom_exceptions.AuthenticationFailureException;
import com.sunbeam.dao.UserDao;
import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.LoginDTO;
import com.sunbeam.dto.RegisterDTO;
import com.sunbeam.dto.UserDTO;
import com.sunbeam.entity.User;

import lombok.AllArgsConstructor;

@Transactional
@Service
@AllArgsConstructor
public class UserServiceImpl  implements UserService{

	private UserDao userDao;
	private final ModelMapper modelMapper;

	@Override
	public UserDTO signIn(LoginDTO dto) {
		User entity = userDao.findByEmailAndPassword(dto.getEmail(), dto.getPassword()).orElseThrow(() -> new AuthenticationFailureException("Invalid email or password"));
		return modelMapper.map(entity, UserDTO.class);
	}

	@Override
	public ApiResponse signUp(RegisterDTO dto)  {
		// TODO Auto-generated method stub

		User user = modelMapper.map(dto, User.class);
		if (dto.getPhoto() != null && !dto.getPhoto().isEmpty()) {
            try {
				user.setPhoto(dto.getPhoto().getBytes());
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

		userDao.save(user);
		return new ApiResponse("Successfully save.");
	}
	
}
