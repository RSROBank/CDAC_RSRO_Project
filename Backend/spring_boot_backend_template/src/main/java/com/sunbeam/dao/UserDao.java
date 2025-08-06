package com.sunbeam.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.entity.AccountEntity;
import com.sunbeam.entity.Status;
import com.sunbeam.entity.User;
import com.sunbeam.entity.UserEntity;

public interface UserDao extends JpaRepository<User, Long> {

	Optional<User> findByEmailAndPassword(String email, String password);

	Optional<User> findByEmail(String email);

	Optional<User> findById(Long userId);
	

	Optional<User> findByAccount(AccountEntity account);

	List<User> findByStatus(Status verified);


}
