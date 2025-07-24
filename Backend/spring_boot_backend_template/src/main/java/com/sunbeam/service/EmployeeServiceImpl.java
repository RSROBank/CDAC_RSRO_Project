package com.sunbeam.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sunbeam.dao.CustomerDao;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

	private final CustomerDao customerDao;
}
