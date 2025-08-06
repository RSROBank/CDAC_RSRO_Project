package com.sunbeam.dto;

import java.time.LocalDate;

import com.sunbeam.entity.Status;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerInfoDTO {

    @NotNull(message = "First name is required")
    private String firstName;
    
    @NotNull(message = "Last Name is Required")
    private String lastName;
    
    @NotNull(message = "Date Of Birth is required")
    @Past(message = "Date of birth must be in the past")
    private LocalDate dob;
    
    @NotBlank(message = "Gender is required")
    @Pattern(regexp = "^(Male|Female|Other)$", message = "Gender must be Male, Female or Other")
    private String gender;
    
    @NotNull(message = "nationality is required")
    private String nationality;
    
    @NotNull(message = "photoid is required")
    private String photoId;
    
    @NotNull(message = "accReferenceId is required") 
    private Integer accReferenceId;
    
    @NotNull(message = "Address is required")
    private String address;
    
    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[0-9]{10,15}$", message = "Invalid phone number format")
    private String phoneNumber;
    
    @NotNull(message = "Email is required")
    @Email(message = "Email is required")
    private String email;
    
    @NotNull(message = "password is Required")
    private String password; 
    
   @NotNull(message = "userId is required")
    private String userId;
   
   @NotBlank(message = "Status is required")
   @Pattern(regexp = "^(Active|Inactive|Pending)$", message = "Status must be Active, Inactive or Pending")
   private Status status;
}
