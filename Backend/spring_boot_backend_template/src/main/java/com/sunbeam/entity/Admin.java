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
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "admin")
public class Admin {

		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
		@Column(length = 100)
	    private String email;
		@Column( length = 100)
	    private String password;
		@Column( name = "phone_number")
	    private String phoneNumber;
		@Column(name= "created_at")
		@CreationTimestamp
	    private LocalDateTime createdAt;
		@UpdateTimestamp
		@Column(name = "modified_at")
	    private LocalDateTime modifiedAt;
		
		
		public Admin(String email, String password, String phoneNumber, LocalDateTime createdAt,
				LocalDateTime modifiedAt) {
			super();
			this.email = email;
			this.password = password;
			this.phoneNumber = phoneNumber;
			this.createdAt = createdAt;
			this.modifiedAt = modifiedAt;
		}
		
		
		
		
}
