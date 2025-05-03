package com.hayvansaglik.yonetim.repository;

import com.hayvansaglik.yonetim.model.Role;
import com.hayvansaglik.yonetim.model.Role.ERole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
} 