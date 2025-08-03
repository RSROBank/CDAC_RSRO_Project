package com.sunbeam.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;



@Service
@Transactional
@AllArgsConstructor
public class EmailService {
	
	private JavaMailSender mailSender;

    public void sendOtpEmail(String to, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Your OTP Code");
        message.setText("Your OTP is: " + otp + ". It is valid for 5 minutes.");
        try {
            mailSender.send(message);
        } catch (Exception e) {
            
            System.err.println("Failed to send OTP: " + e.getMessage());
        }
    }

}
