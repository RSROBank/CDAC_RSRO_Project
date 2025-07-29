package com.sunbeam.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;



@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
@Table(name="addresses")
public class AddressEntity {
	    
	
		@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	    private String city;
	    private String state;
	    private String country;
	    private String pinCode;
	    
		public AddressEntity(String city, String state, String country, String pinCode) {
			super();
			this.city = city;
			this.state = state;
			this.country = country;
			this.pinCode = pinCode;
		}
	    
		    
	}

