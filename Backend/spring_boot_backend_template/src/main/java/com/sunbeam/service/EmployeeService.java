package com.sunbeam.service;

import java.util.List;

import com.sunbeam.dto.ApiResponse;

import com.sunbeam.dto.NotificationResolveRequestDTO;
import com.sunbeam.dto.NotificationResponseDTO;
import com.sunbeam.dto.TransactionDTO;
import com.sunbeam.dto.EmployeeResponseDTO;

public interface EmployeeService {
    EmployeeResponseDTO createEmployee(EmployeeResponseDTO employeeResponseDTO);
    EmployeeResponseDTO getEmployeeById(Long id);
    List<EmployeeResponseDTO> getAllEmployees();
    EmployeeResponseDTO updateEmployee(Long id, EmployeeResponseDTO employeeDTO);
    ApiResponse deleteEmployee(Long id);
  	List<NotificationResponseDTO> getAllQuery(Long employeeId);
  	ApiResponse resolveQuery(Long queryId, NotificationResolveRequestDTO dto);

	List<TransactionDTO> getAllTransaction();

}
