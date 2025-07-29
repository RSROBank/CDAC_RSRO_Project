package com.sunbeam.controllers;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dto.StatementResponseDTO;
import com.sunbeam.service.StatementService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/user/statements")
@CrossOrigin
@AllArgsConstructor
public class StatementController {
	private StatementService statementService;

    @GetMapping
    public ResponseEntity<?> getStatement(
        @RequestParam String accountNo,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fromDate,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate toDate,
        @RequestParam(required = false) String type
    ) {
        StatementResponseDTO result = statementService.getStatement(accountNo, fromDate, toDate, type);
        return ResponseEntity.ok(result);
    }
}
