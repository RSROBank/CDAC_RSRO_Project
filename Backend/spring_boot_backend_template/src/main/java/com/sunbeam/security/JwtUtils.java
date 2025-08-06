package com.sunbeam.security;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import com.sunbeam.entity.UserEntity;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JwtUtils {
	
	@Value("${jwt.secret.key}")
	private String jwtSecret;
	
	@Value("${jwt.expiration.time}")
	private int jwtExpirationMs;

	private SecretKey key;
	
	@PostConstruct
	public void init()
	{
		log.info("Key {} Exp Time {}",jwtSecret,jwtExpirationMs);
		
		key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
	}
	
	public String generateJwtToken(Authentication authentication)
	{
		log.info("generate jwt token " + authentication);// contains verified user details
		UserEntity userPrincipal = 
				(UserEntity) authentication.getPrincipal();
		
		return Jwts.builder().subject(userPrincipal.getFullName())
				.issuedAt(new Date()).expiration(new Date((new Date()).getTime()+jwtExpirationMs))
				.claim("authorities", getAuthoritiesInString(userPrincipal.getAuthorities()))
				.claim("id", userPrincipal.getId())
				.signWith(key, Jwts.SIG.HS256).compact();
	}
	
	
	private List<String> getAuthoritiesInString(Collection<? extends GrantedAuthority> authorities) {
		return authorities.stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());
	}
	
	public Authentication populateAuthenticationTokenFromJWT(String jwt)
	{
		if (jwt == null || jwt.isBlank()) {
		    throw new RuntimeException("JWT is missing");
		}
		Claims payloadClaims = validateJwtToken(jwt);
		String email = getUserNameFromJwtToken(payloadClaims);
		List<GrantedAuthority> authorities = getAuthoritiesFromClaims(payloadClaims);
		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(email, null, authorities);
		return token;
	}
	
	public Claims validateJwtToken(String jwtToken) 
	{
		return Jwts.parser().verifyWith(key).build().parseSignedClaims(jwtToken).getPayload();
	}
	
	public String getUserNameFromJwtToken(Claims claims) {
		return claims.getSubject();
	}
	
	public List<GrantedAuthority> getAuthoritiesFromClaims(Claims claims) {

		List<String> authorityNamesFromJwt = (List<String>) claims.get("authorities");
		List<GrantedAuthority> authorities = 
				authorityNamesFromJwt.stream()
				.map(SimpleGrantedAuthority::new)
				.collect(Collectors.toList());		

		authorities.forEach(System.out::println);
		return authorities;
	}
	
}
