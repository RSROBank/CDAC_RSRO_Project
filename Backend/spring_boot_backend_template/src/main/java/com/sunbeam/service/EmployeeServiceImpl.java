package com.sunbeam.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.sunbeam.custom_exceptions.InvalidInputException;
import com.sunbeam.dao.EmployeeDao;
import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.EmployeeResponseDTO;
import com.sunbeam.entity.EmployeeEntity;

import com.sunbeam.custom_exceptions.ResourceNotFoundException;
import com.sunbeam.dao.CustomerDao;
import com.sunbeam.dao.NotificationDao;
import com.sunbeam.dao.TransactionDao;
import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.NotificationResolveRequestDTO;
import com.sunbeam.dto.NotificationResponseDTO;
import com.sunbeam.dto.TransactionDTO;
import com.sunbeam.entity.Notification;
import com.sunbeam.entity.Transaction;


import lombok.AllArgsConstructor;


@Service
@Transactional
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

	private final NotificationDao notificationDao;
	private final TransactionDao transactiondao;

    private final EmployeeDao employeeDao;
	private final ModelMapper modelMapper;

	 @Override
	    public EmployeeResponseDTO createEmployee(EmployeeResponseDTO employeeResponseDTO) {
	        if (employeeDao.existsByEmail(employeeResponseDTO.getEmail())) {
	            throw new RuntimeException("Email already exists");
	        }
	        EmployeeEntity entity = modelMapper.map(employeeResponseDTO, EmployeeEntity.class);
	        employeeDao.save(entity);
	        return modelMapper.map(entity, EmployeeResponseDTO.class);
	    }
	@Override
	public EmployeeResponseDTO getEmployeeById(Long id) {
		EmployeeEntity employeeEntity = employeeDao.findById(id).orElseThrow(() -> new InvalidInputException("invalid employee id"));
				return modelMapper.map(employeeEntity, EmployeeResponseDTO.class);
	}

	@Override
	public List<EmployeeResponseDTO> getAllEmployees() {
		return employeeDao.findAll()
				.stream()
				.map(employeeEntity -> modelMapper.map(employeeEntity, EmployeeResponseDTO.class))
				.collect(Collectors.toList());
		
	}

	@Override
	public EmployeeResponseDTO updateEmployee(Long id, EmployeeResponseDTO employeeDTO) {
		if(!employeeDao.existsById(id))
		{
			throw new InvalidInputException("Employee does not exists");
			
		}
	    EmployeeEntity updated = modelMapper.map(employeeDTO, EmployeeEntity.class);
	    updated.setId(id);
	    employeeDao.save(updated);
        return modelMapper.map(updated, EmployeeResponseDTO.class);
    }

    @Override
    public ApiResponse deleteEmployee(Long id) {
        if (!employeeDao.existsById(id)) {
            throw new RuntimeException("Employee not found with id: " + id);
        }
        employeeDao.deleteById(id);
        
        return new ApiResponse("Employee deleted successfully!!");
    }
    

	

	@Override
	public List<NotificationResponseDTO> getAllQuery(Long employeeId) {
		List<Notification> notificationList = notificationDao.findByEmployeeId(employeeId);
		System.out.println(notificationList.getFirst().toString());
		List<NotificationResponseDTO> notificationDtos = notificationList.stream()
			    .map((Notification notification) -> modelMapper.map(notification, NotificationResponseDTO.class))
			    .collect(Collectors.toList());
		System.out.println(notificationDtos.getFirst().toString());
		return notificationDtos;
	}

	@Override
	public ApiResponse resolveQuery(Long queryId, NotificationResolveRequestDTO dto) {
		Notification notification = notificationDao.findById(queryId).orElseThrow(()-> new ResourceNotFoundException("Query not found"));
		notification.setResponse(dto.getResponse());
		notification.setRead(true);
		return new ApiResponse("Query resolved");
	}

	@Override
	public List<TransactionDTO> getAllTransaction() {
		List<Transaction> transaction = transactiondao.findAll();
		List<TransactionDTO> transactionList = transaction.stream()
				.map(tx-> modelMapper.map(tx, TransactionDTO.class))
				.collect(Collectors.toList());
		return transactionList;
	}
}
