package com.sunbeam.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "notification")
public class Notification {
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int id;
	
		@Column(length = 100)
	    private String email;
		@Column(length = 100)
	    private String title;
		@Column(length = 300)
	    private String message;
		@Column( name = "notification_type",length = 50)
	    private String notificationType;
		@Column(name = "expires_at")
	    private LocalDateTime expiresAt;
		@Column(name = "is_read")
	    private boolean isRead;
		@CreationTimestamp
		@Column(name="created_at")
	    private LocalDateTime createdAt;
		public Notification(String email, String title, String message, String notificationType,
				LocalDateTime expiresAt, boolean isRead, LocalDateTime createdAt) {
			super();
			this.email = email;
			this.title = title;
			this.message = message;
			this.notificationType = notificationType;
			this.expiresAt = expiresAt;
			this.isRead = isRead;
			this.createdAt = createdAt;
		}
		
		
}

