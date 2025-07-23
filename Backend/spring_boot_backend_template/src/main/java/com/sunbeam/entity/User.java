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
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {
	@Id
    @Column(name = "customer_id", length = 50)
	@GeneratedValue(strategy = GenerationType.AUTO)
    private Long customerId;

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

    @Column(name = "acc_reference_id")
    private Integer accReferenceId = null;

    @Column(name = "address", columnDefinition = "TEXT")
    private String address;

    @Column(name = "mobile_no", length = 15)
    private String mobileNo;

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

}
