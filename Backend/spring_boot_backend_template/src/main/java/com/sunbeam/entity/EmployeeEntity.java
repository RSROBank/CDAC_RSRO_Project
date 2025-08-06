package com.sunbeam.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Entity
@Table(name= "employee_info")
@NoArgsConstructor
public class EmployeeEntity {

	    @Id
	    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "employee_seq")
	    @SequenceGenerator(name = "employee_seq", sequenceName = "employee_sequence", initialValue = 1000, allocationSize = 1)
	    @Column(name = "employee_id")
	    private Long id;

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

	    @Column(name = "govt_id_type")
	    @Enumerated(EnumType.STRING)
	    private IdType govtIdType;

	    @Column(name = "govt_id", length = 50)
	    private String govtId;

	    @Column(length = 200)
	    private String password;

	    @CreationTimestamp
	    @Column(name = "created_at")
	    private LocalDateTime createdAt;

	    @UpdateTimestamp
	    @Column(name = "modified_at")
	    private LocalDateTime modifiedAt;

	    @Column(length = 20)
	    private Status status;

		public EmployeeEntity(String email, String firstName, String lastName, String phoneNo, LocalDate dob,
				String gender, IdType govtIdType, String govtId, String password, LocalDateTime createdAt,
				LocalDateTime modifiedAt, Status status) {
			super();
			this.email = email;
			this.firstName = firstName;
			this.lastName = lastName;
			this.phoneNo = phoneNo;
			this.dob = dob;
			this.gender = gender;
			this.govtIdType = govtIdType;
			this.govtId = govtId;
			this.password = password;
			this.createdAt = createdAt;
			this.modifiedAt = modifiedAt;
			this.status = status;
		}
	    
	    
		
	    
}
