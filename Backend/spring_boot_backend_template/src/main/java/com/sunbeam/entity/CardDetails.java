package com.sunbeam.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity

public class CardDetails {
	
	    @Id
	    private Long cardId;

	    private Long cardNumber;
	    private LocalDate expiry;
	    private String cvv;
	    private String type;
	    private String userId;
	    private LocalDateTime createdAt;
	    private LocalDateTime modifyAt;

}
