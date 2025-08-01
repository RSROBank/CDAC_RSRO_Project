package com.sunbeam.service;
import com.sunbeam.custom_exceptions.InvalidInputException;
import com.sunbeam.dao.*;
import com.sunbeam.dto.*;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sunbeam.dto.DepositDTO;
import com.sunbeam.entity.DepositEntity;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class FdInfoServiceImpl implements FdInfoService {

    private final FdInfoDAO fdInfoDAO;
    private final ModelMapper modelMapper;

   
     
    @Override
    public ApiResponse saveDepositEntity(DepositDTO DepositDTO) {
        DepositEntity depositEntity = modelMapper.map(DepositDTO, DepositEntity.class);
       fdInfoDAO.save(depositEntity);
        return new ApiResponse("FD has been created!!");
    }

    @Override
    public DepositDTO getDepositEntityById(Long Id) {
    	DepositEntity depositEntity = fdInfoDAO.findById(Id).orElseThrow(() -> new InvalidInputException("Invalid FD Id!!") );
        return modelMapper.map(depositEntity, DepositDTO.class);
    }
    

	@Override
	public List<DepositDTO> getFDInfoByUserId(Long userId) {
		return fdInfoDAO.findByUserId(userId)
				.stream()
				.map(DepositEntity -> modelMapper.map(DepositEntity, DepositDTO.class))
				.toList();
	}

}