package com.sunbeam.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

import jakarta.persistence.Transient;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name= "employee_info")
@NoArgsConstructor
public class EmployeeEntity {

	    @Id
	    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "employee_seq")
	    @SequenceGenerator(name = "employee_seq", sequenceName = "employee_sequence", initialValue = 1000, allocationSize = 1)
	    @Column(name = "employee_id")
	    private Long employeeId;

	    @Column(length = 100, unique = true)
	    private String email;

	    @Column(length = 50, name = "first_name")
	    private String firstName;
	    
	    @Column(length = 50, name = "last_name")
	    private String lastName;

	    @Column(name = "phone_no", length = 15)
	    private String phoneNo;


	    private LocalDate dob;

	    @Column(length = 10)
	    private String gender;

	    @Column(name = "govt_id", length = 50)
	    private String govtId;

	    @Column(name = "photo_id", length = 50)
	    private String photoId;

	    @Column(length = 100)
	    private String password;

	    @Column(name = "created_at")
	    private LocalDateTime createdAt;

	    @Column(name = "modified_at")
	    private LocalDateTime modifiedAt;

	    @Column(length = 20)
	    private String status;

	    
		public EmployeeEntity(String email, String firstName, String lastName, String phoneNo, LocalDate dob,
				String gender, String govtId, String photoId, String password,
				LocalDateTime createdAt, LocalDateTime modifiedAt, String status) {
			super();
			this.email = email;
			this.firstName = firstName;
			this.lastName = lastName;
			this.phoneNo = phoneNo;
			this.dob = dob;
			this.gender = gender;
			this.govtId = govtId;
			this.photoId = photoId;
			this.password = password;
			
			this.createdAt = createdAt;
			this.modifiedAt = modifiedAt;
			this.status = status;
		}
	    
}
