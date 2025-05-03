package com.hayvansaglik.yonetim.config;

import com.hayvansaglik.yonetim.model.Role;
import com.hayvansaglik.yonetim.model.Role.ERole;
import com.hayvansaglik.yonetim.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        // Roller zaten veritabanında mevcutsa ekleme yapmayacak
        if (roleRepository.count() == 0) {
            // Rolleri oluştur ve kaydet - manuel olarak yapılandırıyoruz
            addRoleIfNotExists(ERole.ROLE_ADMIN);
            addRoleIfNotExists(ERole.ROLE_VETERINER);
            addRoleIfNotExists(ERole.ROLE_LABORANT);
            addRoleIfNotExists(ERole.ROLE_HEMSIRE);
            addRoleIfNotExists(ERole.ROLE_MUHASEBE);
            addRoleIfNotExists(ERole.ROLE_SAHIP);
        }
    }
    
    private void addRoleIfNotExists(ERole roleName) {
        Role role = new Role();
        role.setName(roleName);
        roleRepository.save(role);
    }
} 