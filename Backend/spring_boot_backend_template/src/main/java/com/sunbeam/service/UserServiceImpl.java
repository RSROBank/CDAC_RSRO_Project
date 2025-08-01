package com.sunbeam.service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Base64;
import java.util.Random;

import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.sunbeam.custom_exceptions.AuthenticationFailureException;
import com.sunbeam.custom_exceptions.ResourceNotFoundException;
import com.sunbeam.dao.AccountDao;
import com.sunbeam.dao.AdminDao;
import com.sunbeam.dao.EmployeeDao;
import com.sunbeam.dao.UserDao;
import com.sunbeam.dto.AdminResponseDTO;
import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.EmployeeResponseDTO;
import com.sunbeam.dto.LoginDTO;
import com.sunbeam.dto.ProfileResponseDTO;
import com.sunbeam.dto.RegisterDTO;
import com.sunbeam.dto.UpdateProfileRequestDTO;
import com.sunbeam.dto.UserDTO;
import com.sunbeam.entity.AccountEntity;
import com.sunbeam.entity.AddressEntity;
import com.sunbeam.entity.Admin;
import com.sunbeam.entity.EmployeeEntity;
import com.sunbeam.entity.User;

import lombok.AllArgsConstructor;

@Transactional
@Service
@AllArgsConstructor
public class UserServiceImpl  implements UserService{

<<<<<<< Updated upstream
	private UserDao userDao;
	private AccountDao accountDao;

=======
	private final UserDao userDao;
	private final EmployeeDao employeeDao;
	private final AdminDao adminDao;
	private final AccountDao accountDao;
	private final PasswordEncoder encoder;
>>>>>>> Stashed changes
	private final ModelMapper modelMapper;

	@Override
	public UserDTO signIn(LoginDTO dto) {
		User entity = userDao.findByEmailAndPassword(dto.getEmail(), dto.getPassword()).orElseThrow(() -> new AuthenticationFailureException("Invalid email or password"));
		return modelMapper.map(entity, UserDTO.class);
	}
	
	private String generate12DigitNumber() {
	    return String.valueOf(100000000000L + new Random().nextLong() % 900000000000L).substring(0, 12);
	}

	@Override
	public ApiResponse signUp(RegisterDTO dto, MultipartFile img) {
	    // Create a new User manually
		User user = new User();

        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());

        // Convert String → LocalDate
        user.setDateOfBirth(LocalDate.parse(dto.getDateOfBirth()));

        user.setGender(dto.getGender());
        user.setNationality(dto.getNationality());
        user.setPhotoId(dto.getPhotoId());
        
        // Convert String → Long
        user.setPhoneNumber(Long.parseLong(dto.getPhoneNumber()));

        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());

        // Set address (already as AddressEntity)
        user.setAddress(dto.getAddress());
        if (img != null && !img.isEmpty()) {
            try {
				user.setPhoto(img.getBytes());
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
        } else {
            return new ApiResponse("Photo is missing or empty.");
        }
	    userDao.save(user);
	    AccountEntity account = new AccountEntity();
	    account.setCustomer(user); // link the saved user
	    account.setAccountNumber(generate12DigitNumber());
	    account.setUpiId(generate12DigitNumber());
	    account.setBalance(0.0);
	    accountDao.save(account);

	    return new ApiResponse("Successfully saved.");
	}
	
	@Override
    public ProfileResponseDTO getProfileByUserId(Long userId) {
        User user = userDao.findById(userId).orElseThrow(()-> new ResourceNotFoundException("User not found"));
        ProfileResponseDTO dto = modelMapper.map(user, ProfileResponseDTO.class);
        dto.setFullName(user.getFirstName()+" "+user.getLastName());
        dto.setAdrLine1(user.getAddress().getAdrLine1());
        dto.setAdrLine2(user.getAddress().getAdrLine2());
        dto.setCity(user.getAddress().getCity());
        dto.setCountry(user.getAddress().getCountry());
        dto.setState(user.getAddress().getState());
        dto.setPincode(user.getAddress().getPinCode());
        String base64Image = Base64.getEncoder().encodeToString(user.getPhoto());
        dto.setPhoto("data:image/jpeg;base64," + base64Image);
        return dto;
    }

	@Override
	public ApiResponse updateProfileByUserId(Long userId, UpdateProfileRequestDTO dto) {
		// TODO Auto-generated method stub
		User user = userDao.findById(userId).orElseThrow(()-> new ResourceNotFoundException("User not found"));
		AddressEntity adr = new AddressEntity(dto.getAdrLine1(), dto.getAdrLine2(), dto.getCity(), dto.getState(), dto.getCountry(), dto.getPincode());
		user.setAddress(adr);
		System.out.println(user.getFirstName());
		user.setPhoneNumber(Long.parseLong(dto.getMobileNo()));
		System.out.println(user.getPhoneNumber());
		return new ApiResponse("Customer data successfully modified");
	}

	@Override
	public EmployeeResponseDTO getEmployeeProfileByUserId(Long userId) {
		EmployeeEntity user = employeeDao.findById(userId).orElseThrow(()-> new ResourceNotFoundException("User not found"));
        EmployeeResponseDTO dto = modelMapper.map(user, EmployeeResponseDTO.class);
        dto.setFullName(user.getFirstName()+" "+user.getLastName());
        return dto;
	}

	@Override
	public AdminResponseDTO getAdminProfileByUserId(Long userId) {
		Admin user = adminDao.findById(userId).orElseThrow(()-> new ResourceNotFoundException("User not found"));
        AdminResponseDTO dto = modelMapper.map(user, AdminResponseDTO.class);
        return dto;
	}

	
}
