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
    @Column(name = "Id", length = 50)
	@GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;

    @Column(name = "Full_Name", length = 100)
    private String fullName;

    @Column(name = "Dob")
    private LocalDate dateOfBirth;

    @Column(name = "Gender", length = 10)
    private String gender;

    @Column(name = "Nationality", length = 50)
    private String nationality;

    @Column(name = "govtId", length = 50)
    private String photoId;

    @Column(name = "Acc_Reference_Id")
    private Integer accReferenceId = null;

    @Column(name = "Address", columnDefinition = "TEXT")
    private String address;

    @Column(name = "Mobile", length = 15)
    private String mobileNo;

    @Column(name = "Email", length = 100)
    private String email;

    @Column(name = "Password", length = 100)
    private String password;
    
    @CreationTimestamp
    @Column(name = "Created_At")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "Modify_At")
    private LocalDateTime modifyAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "Status")
    private Status status = Status.PENDING;
    
    @Lob
    @Column(name = "Photo", columnDefinition = "MEDIUMBLOB")
    private byte[] photo;

}
 enum Status {
    VERIFY,
    PENDING,
    REJECTED
}
