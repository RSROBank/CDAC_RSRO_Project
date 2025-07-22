package com.sunbeam.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.entity.User;

public interface UserDao extends JpaRepository<User, Long> {

}
