package com.sunbeam.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "user_session")
public class UserSession {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	@Column(length = 100)
    private String email;
	@Column(name = "login_timestamp")
	@CreationTimestamp
    private LocalDateTime loginTimestamp;
	@Column( name = "logout_timestamp")
    private LocalDateTime logoutTimestamp;
	@Column(name = "ip_address")
    private Long ipAddress;
	@Column(name = "device_info")
    private String deviceInfo;
	
	public UserSession(String email, LocalDateTime loginTimestamp, LocalDateTime logoutTimestamp, Long ipAddress,
			String deviceInfo) {
		super();
		this.email = email;
		this.loginTimestamp = loginTimestamp;
		this.logoutTimestamp = logoutTimestamp;
		this.ipAddress = ipAddress;
		this.deviceInfo = deviceInfo;
	}
	

}
