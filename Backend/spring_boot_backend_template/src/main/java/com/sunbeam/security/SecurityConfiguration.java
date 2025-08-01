package com.sunbeam.security;

import java.util.List;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.AllArgsConstructor;

@Configuration 
@EnableWebSecurity 
@EnableMethodSecurity 
@AllArgsConstructor
public class SecurityConfiguration {
	
	private final PasswordEncoder encoder;
	private final CustomJwtFilter customJwtFilter;
	private JwtAuthEntryPoint jwtAuthEntryPoint;

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
		
		http.csrf(csrf -> csrf.disable());
		
		http.authorizeHttpRequests(request -> 
		
		request.requestMatchers("/swagger-ui/**","/v**/api-docs/**",
				"/users/login","/users/signup", "/**").permitAll());
		
		http.sessionManagement(session -> 
		session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		
		http.addFilterBefore(customJwtFilter
				, UsernamePasswordAuthenticationFilter.class);
		
		http.exceptionHandling
		(ex -> ex.authenticationEntryPoint(jwtAuthEntryPoint));
		return http.build();
	}
	
	@Bean
	AuthenticationManager authenticationManager
	(AuthenticationConfiguration mgr) throws Exception {
		return mgr.getAuthenticationManager();
	}
	
	
}
