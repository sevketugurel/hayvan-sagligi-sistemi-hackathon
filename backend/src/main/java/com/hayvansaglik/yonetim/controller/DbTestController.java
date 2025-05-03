package com.hayvansaglik.yonetim.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hayvansaglik.yonetim.repository.RoleRepository;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/noauth")
public class DbTestController {
    
    @Autowired
    private RoleRepository roleRepository;
    
    @GetMapping("/db-test")
    public Map<String, Object> dbTest() {
        Map<String, Object> response = new HashMap<>();
        try {
            long roleCount = roleRepository.count();
            response.put("success", true);
            response.put("message", "Veritabanı bağlantısı başarılı!");
            response.put("roleCount", roleCount);
            response.put("databaseName", "hayvansaglikdb");
            response.put("note", "Bu endpoint güvenlik yapılandırmasını bypass eder");
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Veritabanı bağlantı hatası: " + e.getMessage());
            response.put("error", e.getClass().getName());
        }
        return response;
    }
} 