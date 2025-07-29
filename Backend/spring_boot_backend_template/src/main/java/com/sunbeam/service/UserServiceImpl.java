package com.sunbeam.service;

import java.io.IOException;
import java.time.LocalDate;

import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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
	public ApiResponse signUp(RegisterDTO dto, MultipartFile img) {
	    // Create a new User manually
		User user = new User();

        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());

        // Convert String → LocalDate
        user.setDateOfBirth(LocalDate.parse(dto.getDateOfBirth()));

        user.setGender(dto.getGender());
        user.setNationality(dto.getNationality());
        user.setPhotoId(dto.getPhotoId());
        
        // Convert String → Long
        user.setPhoneNumber(Long.parseLong(dto.getPhoneNumber()));

        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());

        // Set address (already as AddressEntity)
        user.setAddress(dto.getAddress());
        if (img != null && !img.isEmpty()) {
            try {
				user.setPhoto(img.getBytes());
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
        } else {
            return new ApiResponse("Photo is missing or empty.");
        }
	    userDao.save(user);
	    return new ApiResponse("Successfully saved.");
	}

	
}
