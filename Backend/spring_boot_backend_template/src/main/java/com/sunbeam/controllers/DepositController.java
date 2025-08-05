package com.sunbeam.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sunbeam.dto.DepositDTO;
import com.sunbeam.service.FdInfoService;

import lombok.AllArgsConstructor;


@RestController
@RequestMapping("/user/deposit")
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class DepositController {

	    private FdInfoService fdInfoService;

		@PostMapping("/savedeposit")
		public ResponseEntity<?> saveDepositEntity(@RequestBody DepositDTO dto)
		{
			System.out.println("save deposit Entity "+dto);
			return ResponseEntity.ok(
					fdInfoService.saveDepositEntity(dto));
		}
		

		@GetMapping("/getDeposit/{id}")
		public ResponseEntity<?> getDepositEntityByid(@PathVariable Long id)
		{
			//System.out.println("get deposit entity "+dto);
			return ResponseEntity.ok(
					fdInfoService.getDepositEntityById(id));
		}
		
		@GetMapping("getAllDepositByUserId/{id}")
		public ResponseEntity<?> FDInfoByUserId(@PathVariable Long id)
		{
			//System.out.println("information about user id "+dto);
			return ResponseEntity.ok(
					fdInfoService.getFDInfoByUserId(id));
		}
	} 
