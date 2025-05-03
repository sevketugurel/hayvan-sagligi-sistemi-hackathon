package com.hayvansaglik.yonetim.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class BasicDbTestController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/basic-db-test")
    public Map<String, Object> testDb() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Basit bir SQL sorgusu çalıştır
            String dbName = jdbcTemplate.queryForObject("SELECT DB_NAME()", String.class);
            
            response.put("success", true);
            response.put("message", "Veritabanı bağlantısı başarılı!");
            response.put("databaseName", dbName);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Veritabanı bağlantı hatası: " + e.getMessage());
            response.put("error", e.getClass().getName());
        }
        
        return response;
    }
} 