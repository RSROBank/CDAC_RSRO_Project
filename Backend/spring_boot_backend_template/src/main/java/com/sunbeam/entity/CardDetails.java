package com.sunbeam.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "card_details")
public class CardDetails {
	
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    
	    @Column(name = "card_number",length = 16,unique = true, nullable = false)
	    private String cardNumber;
	    
	    private LocalDate expiry;
	    
	    private Integer cvv;
	    private String type = "DEBIT";
	    @Column(name = "user_id")
	    private Long userId;
	    @CreationTimestamp
	    @Column(name = "created_at")
	    private LocalDateTime createdAt;
	    @UpdateTimestamp
	    @Column(name = "modified_at")
	    private LocalDateTime modifiedAt;
	    
	    
		public CardDetails(String cardNumber, LocalDate expiry, Integer cvv, String type, Long userId,
				LocalDateTime createdAt, LocalDateTime modifiedAt) {
			super();
			this.cardNumber = cardNumber;
			this.expiry = expiry;
			this.cvv = cvv;
			this.type = type;
			this.userId = userId;
			this.createdAt = createdAt;
			this.modifiedAt = modifiedAt;
		}
	    
	    

}
