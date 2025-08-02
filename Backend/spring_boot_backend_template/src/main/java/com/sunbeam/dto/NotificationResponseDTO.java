package com.sunbeam.dto;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class NotificationResponseDTO {
	@NotBlank(message = "Email cannot be blank")
    private String email;

	@NotNull(message = "Query Id cannot be blank")
    private long id;
	
    @NotNull(message = "User ID cannot be null")
    private Long userId;

    @NotBlank(message = "Title cannot be blank")
    private String title;

    @NotBlank(message = "Message cannot be blank")
    @Size(max = 500, message = "Message must be less than 500 characters")
    private String message;

    @Size(max = 500, message = "Response must be less than 500 characters")
    private String response;

    @NotBlank(message = "Notification type cannot be blank")
    private String notificationType;

    private LocalDateTime expiresAt;

    @NotNull(message = "Read status cannot be null")
    private boolean isRead;
}
