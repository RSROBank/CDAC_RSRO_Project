package com.sunbeam.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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
	private Long id;
	
	@Column(name = "Email", length = 100, nullable = false, unique = true)
	private String email;

	@Column(name = "Password", length = 100, nullable = false)
	private String password;

}
