package com.sunbeam.service;

import java.util.List;

import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.DepositDTO;
import com.sunbeam.dto.LoginDTO;

public interface FdInfoService {
   
    List<DepositDTO> getFDInfoByUserId(Long userId);
	ApiResponse saveDepositEntity(DepositDTO DepositDTO);
	DepositDTO getDepositEntityById(Long fdId);
}