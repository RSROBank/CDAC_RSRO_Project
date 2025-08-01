package com.sunbeam.dao;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.entity.DepositEntity;


public interface FdInfoDAO extends JpaRepository<DepositEntity, Long> {

	Optional<DepositEntity> findAllDepositEntityById(Long fdId);

	List<DepositEntity> findByUserId(Long userId);
	


}