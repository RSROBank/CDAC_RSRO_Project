package com.sunbeam.service;

import java.util.List;

import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.NotificationResolveRequestDTO;
import com.sunbeam.dto.NotificationResponseDTO;
import com.sunbeam.dto.TransactionDTO;

public interface EmployeeService {

	List<NotificationResponseDTO> getAllQuery(Long employeeId);

	ApiResponse resolveQuery(Long queryId, NotificationResolveRequestDTO dto);

	List<TransactionDTO> getAllTransaction();

}
