package com.sunbeam.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.sunbeam.custom_exceptions.InvalidInputException;
import com.sunbeam.dao.LoanInfoDAO;
import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.LoanInfoDTO;
import com.sunbeam.entity.LoanInfo;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class LoanInfoServiceImpl implements LoanInfoService {
	

	private final ModelMapper modelMapper;
    private final LoanInfoDAO loanInfoDAO;
    @Override
    public ApiResponse saveLoanInfo(LoanInfoDTO dto) {
        LoanInfo loanInfo = modelMapper.map(dto, LoanInfo.class);
        loanInfo.setStatus(dto.getStatus());
        loanInfo.setCreatedAt(LocalDateTime.now());
        loanInfo.setModifiedAt(LocalDateTime.now());
        loanInfoDAO.save(loanInfo);
        System.out.println(loanInfo);
        return new ApiResponse("loan is saved");
    }
    
    @Override
    public List<LoanInfoDTO> getAllLoans() {
        return loanInfoDAO.findAll()
                .stream()
                .map(loanInfo -> modelMapper.map(loanInfo, LoanInfoDTO.class))
                .collect(Collectors.toList());
    }
    
    @Override
    public LoanInfoDTO getLoanById(Long Id) {
    	LoanInfo loanInfo = loanInfoDAO.findById(Id).orElseThrow(() -> new InvalidInputException("Invalid loan by Id!!") );
        return modelMapper.map(loanInfo, LoanInfoDTO.class);
    }

	@Override
	public List<LoanInfoDTO> getLoanByuserId(Long id) {
		List<LoanInfoDTO> loanInfo = loanInfoDAO.findByUserId(id).stream()
				.map(loan -> modelMapper.map(loan, LoanInfoDTO.class))
				.collect(Collectors.toList());
		
        return loanInfo;
	}
}
    
