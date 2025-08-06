package com.sunbeam.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.entity.CardDetails;

public interface CardDetailDAO extends JpaRepository<CardDetails, Long> {
	CardDetails findByUserId(Long userId);
}