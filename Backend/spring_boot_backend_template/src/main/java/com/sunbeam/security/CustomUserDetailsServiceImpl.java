package com.sunbeam.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sunbeam.dao.UserDao;

import com.sunbeam.entity.User;
import com.sunbeam.entity.UserEntity;

import lombok.AllArgsConstructor;



@Service //spring bean containing B.L
@Transactional
@AllArgsConstructor
public class CustomUserDetailsServiceImpl implements UserDetailsService {
	
	private final UserDao userDao;

	@Override
	public UserDetails loadUserByUsername(String email) 
			throws UsernameNotFoundException {
		// invoke dao's method
		UserEntity user= userDao.findByEmail(email)
				.orElseThrow(() ->
				new UsernameNotFoundException("Invalid email !!!!"));
		return user;
	}

}
