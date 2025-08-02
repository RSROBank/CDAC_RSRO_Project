package com.sunbeam.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sunbeam.custom_exceptions.ResourceNotFoundException;
import com.sunbeam.dao.CustomerDao;
import com.sunbeam.dao.NotificationDao;
import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.NotificationResolveRequestDTO;
import com.sunbeam.dto.NotificationResponseDTO;
import com.sunbeam.entity.Notification;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

	private final NotificationDao notificationDao;
	private final ModelMapper modelMapper;

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
}
