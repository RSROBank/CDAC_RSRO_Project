package com.sunbeam.service;

import java.util.List;

import com.sunbeam.entity.User;

public interface CustomerInfoService {
	
	List<User> getFindByStatusVerified();

}
