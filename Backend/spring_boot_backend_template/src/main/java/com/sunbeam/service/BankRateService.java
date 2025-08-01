package com.sunbeam.service;

import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sunbeam.pojo.BankRates;



@Service
public class BankRateService {

	private final ObjectMapper objectMapper;
    private final Path filePath = Paths.get("src/main/resources/data/rates.json");

    public BankRateService() {
        this.objectMapper = new ObjectMapper();
    }

    public BankRates getRates() throws IOException, StreamReadException, DatabindException {
        try (InputStream is = Files.newInputStream(filePath)) {
            return objectMapper.readValue(is, BankRates.class);
        }
    }

    public void updateRates(BankRates updatedRates) throws IOException {
        try (BufferedWriter writer = Files.newBufferedWriter(filePath)) {
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(writer, updatedRates);
        }
    }
}
