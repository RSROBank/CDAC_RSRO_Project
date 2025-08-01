package com.sunbeam.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.entity.User;
import com.sunbeam.entity.UserEntity;

public interface UserDao extends JpaRepository<User, Long> {

	Optional<User> findByEmailAndPassword(String email, String password);

	Optional<UserEntity> findByEmail(String email);

}
