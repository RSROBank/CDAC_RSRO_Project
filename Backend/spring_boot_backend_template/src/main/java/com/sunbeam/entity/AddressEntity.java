package com.sunbeam.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;



@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString(callSuper = true)
@Table(name="addresses")
public class AddressEntity {
	    
	
		@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
		
		@Column(name="adr_line1",length=100)
		private String adrLine1;
		@Column(name="adr_line2",length=100)
		private String adrLine2;
		@Column(length=20)
	    private String city;
		@Column(length=20)
	    private String state;
		@Column(length=20)
	    private String country;
	    @Column(name = "pin_code")
	    private long pinCode;
	    
		public AddressEntity(String adrLine1, String adrLine2, String city, String state, String country,
				long pinCode) {
			super();
			this.adrLine1 = adrLine1;
			this.adrLine2 = adrLine2;
			this.city = city;
			this.state = state;
			this.country = country;
			this.pinCode = pinCode;
		}
	    
		
	    
		    
	}

