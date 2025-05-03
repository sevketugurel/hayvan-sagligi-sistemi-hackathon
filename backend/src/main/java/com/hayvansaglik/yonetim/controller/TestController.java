package com.hayvansaglik.yonetim.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hayvansaglik.yonetim.repository.RoleRepository;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {
    
    @Autowired
    private RoleRepository roleRepository;
    
    @GetMapping("/all")
    public String allAccess() {
        return "Herkese açık içerik.";
    }

    @GetMapping("/sahip")
    @PreAuthorize("hasRole('SAHIP') or hasRole('ADMIN')")
    public String sahipAccess() {
        return "Sahip içeriği.";
    }

    @GetMapping("/veteriner")
    @PreAuthorize("hasRole('VETERINER') or hasRole('ADMIN')")
    public String veterinerAccess() {
        return "Veteriner içeriği.";
    }

    @GetMapping("/laborant")
    @PreAuthorize("hasRole('LABORANT') or hasRole('ADMIN')")
    public String laborantAccess() {
        return "Laborant içeriği.";
    }

    @GetMapping("/hemsire")
    @PreAuthorize("hasRole('HEMSIRE') or hasRole('ADMIN')")
    public String hemsireAccess() {
        return "Hemşire içeriği.";
    }

    @GetMapping("/muhasebe")
    @PreAuthorize("hasRole('MUHASEBE') or hasRole('ADMIN')")
    public String muhasebeAccess() {
        return "Muhasebe içeriği.";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminAccess() {
        return "Admin paneli.";
    }
    
    @GetMapping("/db-test")
    public Map<String, Object> dbTest() {
        Map<String, Object> response = new HashMap<>();
        try {
            long roleCount = roleRepository.count();
            response.put("success", true);
            response.put("message", "Veritabanı bağlantısı başarılı!");
            response.put("roleCount", roleCount);
            response.put("databaseName", "hayvansaglikdb");
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Veritabanı bağlantı hatası: " + e.getMessage());
            response.put("error", e.getClass().getName());
        }
        return response;
    }
    
    @GetMapping("/public-db-test")
    public Map<String, Object> publicDbTest() {
        Map<String, Object> response = new HashMap<>();
        try {
            long roleCount = roleRepository.count();
            response.put("success", true);
            response.put("message", "Veritabanı bağlantısı başarılı!");
            response.put("roleCount", roleCount);
            response.put("databaseName", "hayvansaglikdb");
            response.put("note", "Bu endpoint herkese açıktır (güvenlik kısıtlaması olmadan)");
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Veritabanı bağlantı hatası: " + e.getMessage());
            response.put("error", e.getClass().getName());
        }
        return response;
    }
}