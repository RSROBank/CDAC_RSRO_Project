package com.sunbeam.dto;

import com.sunbeam.entity.Status;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString

public class UserDTO {
	
	private Long customerId;
	 private String firstName;
	 private String lastName;
	 private String address;
	 private String mobileNo;
	 private String email;
	

}
