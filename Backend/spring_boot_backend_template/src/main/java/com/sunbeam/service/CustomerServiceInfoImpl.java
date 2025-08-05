package com.sunbeam.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sunbeam.dao.CustomerInfoDao;
import com.sunbeam.entity.Status;
import com.sunbeam.entity.User;

@Service
public class CustomerServiceInfoImpl implements CustomerInfoService {

	@Autowired
	private CustomerInfoDao customerInfodao;
	
	public List<User> getFindByStatusVerified() {
	return customerInfodao.findByStatus(Status.VERIFIED);
	}

}
	
	
