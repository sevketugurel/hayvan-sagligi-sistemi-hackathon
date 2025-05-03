package com.hayvansaglik.yonetim.repository;

import com.hayvansaglik.yonetim.model.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RolRepository extends JpaRepository<Rol, Integer> {
    Optional<Rol> findByAd(String ad);
} 