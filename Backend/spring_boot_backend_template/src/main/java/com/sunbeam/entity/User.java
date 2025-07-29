package com.sunbeam.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "users")
@ToString
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name", length = 50)
    private String firstName;
    
    @Column(name = "last_name", length = 50)
    private String lastName;

    @Column(name = "dob")
    private LocalDate dateOfBirth;

    @Column( length = 10)
    private String gender;

    @Column( length = 50)
    private String nationality;

    @Column(name = "govt_id", length = 50)
    private String photoId;

    @OneToOne(mappedBy = "customer", cascade = CascadeType.ALL)
    private AccountEntity account;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="address_id")
    private AddressEntity address;

    @Column(name = "phone_number")
    private Long phoneNumber;

    @Column(length = 100)
    private String email;

    @Column( length = 100)
    private String password;
    
    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "modified_at")
    private LocalDateTime modifiedAt;

    @Enumerated(EnumType.STRING)
    private Status status = Status.PENDING;
    
    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private byte[] photo;

	public User(String firstName, String lastName, LocalDate dateOfBirth, String gender, String nationality,
			String photoId, AccountEntity account, AddressEntity address, Long mobileNo, String email, String password,
			LocalDateTime createdAt, LocalDateTime modifiedAt, Status status, byte[] photo) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.dateOfBirth = dateOfBirth;
		this.gender = gender;
		this.nationality = nationality;
		this.photoId = photoId;
		this.account = account;
		this.address = address;
		this.phoneNumber = mobileNo;
		this.email = email;
		this.password = password;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
		this.status = status;
		this.photo = photo;
	}

	public String getFullName() {
		// TODO Auto-generated method stub
		return firstName +" "+ lastName;
	}
    

}
