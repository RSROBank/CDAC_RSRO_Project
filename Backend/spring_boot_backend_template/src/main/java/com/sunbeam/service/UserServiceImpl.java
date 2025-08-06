package com.sunbeam.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.sunbeam.custom_exceptions.AuthenticationFailureException;
import com.sunbeam.custom_exceptions.InvalidInputException;
import com.sunbeam.custom_exceptions.ResourceNotFoundException;
import com.sunbeam.dao.AccountDao;
import com.sunbeam.dao.AdminDao;
import com.sunbeam.dao.EmployeeDao;
import com.sunbeam.dao.NotificationDao;
import com.sunbeam.dao.UserDao;
import com.sunbeam.dto.AdminResponseDTO;
import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.EmployeeResponseDTO;
import com.sunbeam.dto.LoanRequestDTO;
import com.sunbeam.dto.LoginDTO;
import com.sunbeam.dto.NotificationResponseDTO;
import com.sunbeam.dto.ProfileResponseDTO;
import com.sunbeam.dto.RegisterDTO;
import com.sunbeam.dto.UpdateProfileRequestDTO;
import com.sunbeam.dto.UserDTO;
import com.sunbeam.dto.UserResponseDTO;
import com.sunbeam.entity.AccountEntity;
import com.sunbeam.entity.AddressEntity;
import com.sunbeam.entity.Admin;
import com.sunbeam.entity.EmployeeEntity;
import com.sunbeam.entity.Notification;
import com.sunbeam.entity.Status;
import com.sunbeam.entity.User;
import lombok.AllArgsConstructor;

@Transactional
@Service
@AllArgsConstructor
public class UserServiceImpl  implements UserService{

    private final UserDao userDao;
	private final AccountDao accountDao;
	private final NotificationDao notificationDao;
	private final PasswordEncoder encoder;
	private final EmployeeDao employeeDao;
	private final AdminDao adminDao;
	private final ModelMapper modelMapper;

	@Override
	public UserDTO signIn(LoginDTO dto) {
		User entity = userDao.findByEmailAndPassword(dto.getEmail(), dto.getPassword()).orElseThrow(() -> new AuthenticationFailureException("Invalid email or password"));
		return modelMapper.map(entity, UserDTO.class);
	}
	
	
	private String generate12DigitNumber(RegisterDTO dto) {
		StringBuilder string = new StringBuilder();
		string.append(dto.getFirstName().substring(0, 2)) ;
		string.append(dto.getDateOfBirth().substring(2, 4)) ;
		string.append(dto.getLastName().substring(0, 2));
		string.append(dto.getDateOfBirth().substring(8, 10));
		
		if(dto.getGender().equals("male"))
		{
			string.append("1M");
		} 
		else
		{
			string.append("0M");
		}
		string.append(dto.getPhoneNumber().substring(7, 9));
		string.append(dto.getEmail().substring(3, 6));
		string.append(dto.getPhoneNumber().substring(2, 5));
		return string.toString();
	}
	
	private String generate12DigitNumber() {
		
	    return String.valueOf(100000000000L + new Random().nextLong() % 900000000000L).substring(0, 12);
	}

	@Override
	public ApiResponse signUp(RegisterDTO dto, MultipartFile img) throws Exception {
	    // Create a new User manually

		User user = new User();

        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());

        
        user.setDateOfBirth(LocalDate.parse(dto.getDateOfBirth()));

        user.setGender(dto.getGender());
        user.setNationality(dto.getNationality());
        user.setPhotoId(dto.getPhotoId());
        
       
        user.setPhoneNumber(Long.parseLong(dto.getPhoneNumber()));

        user.setEmail(dto.getEmail());
        user.setPassword(encoder.encode(dto.getPassword()));

        
        user.setAddress(dto.getAddress());

//        if (img != null && !img.isEmpty()) {
//            try {
//				user.setPhoto(img.getBytes());
//			} catch (IOException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//        } else {
//            return new ApiResponse("Photo is missing or empty.");
//        }
        
        user.setPhoto(img.getBytes());
	    userDao.save(user);
	    AccountEntity account = new AccountEntity();
	    account.setCustomer(user); 
	    account.setAccountNumber(generate12DigitNumber());
	    account.setUpiId(generate12DigitNumber());
	    account.setBalance(0.0);
	    accountDao.save(account);
	    System.out.println("Date : "+ dto.getDateOfBirth());
	    System.out.println("Date : "+ dto.getGender());

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
        dto.setPhoto(user.getPhoto());
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
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getFirstName());
        return dto;
	}

	@Override
	public AdminResponseDTO getAdminProfileByUserId(Long userId) {
		Admin user = adminDao.findById(userId).orElseThrow(()-> new ResourceNotFoundException("User not found"));
        AdminResponseDTO dto = modelMapper.map(user, AdminResponseDTO.class);
        return dto;
	}


	@Override
	public ApiResponse saveQuery(LoanRequestDTO dto) {
		Notification notification = modelMapper.map(dto, Notification.class);
		notification.setExpiresAt(LocalDateTime.now().plusDays(1));
		notification.setEmployeeId(1);
		notificationDao.save(notification);
		return new ApiResponse("query saved successfully");
	}

	@Override
	public List<NotificationResponseDTO> getAllLoanQuery(Long userId) {
		List<Notification> notificationList = notificationDao.findByUserId(userId);
		List<NotificationResponseDTO> notificationDtos = notificationList.stream()
			    .map((Notification notification) -> modelMapper.map(notification, NotificationResponseDTO.class))
			    .collect(Collectors.toList());
		return notificationDtos;
	}


	   @Override
	    public UserDTO getUserByEmail(String email) {
	        Optional<User> optionalUser = userDao.findByEmail(email);
	        return optionalUser.map(user -> modelMapper.map(user, UserDTO.class)).orElse(null);
	    }

	    @Override
	    public UserDTO getUserByAccountNumber(String accountNumber) {
	    	AccountEntity account = accountDao.findByAccountNumber(accountNumber).orElseThrow(() -> new InvalidInputException("Account Number Invalid"));
	        User user = userDao.findByAccount(account).orElseThrow(() -> new InvalidInputException(accountNumber));
	        return modelMapper.map(user, UserDTO.class);
	    }
	
	    public List<UserResponseDTO> getFindByStatusVerified() {
	        List<UserResponseDTO> dto = userDao.findByStatus(Status.VERIFIED)
	        		.stream()
	        		.map((User u)-> modelMapper.map(u, UserResponseDTO.class))
	        		.toList();
	        return dto;
		}
	


	
}
