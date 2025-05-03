package com.hayvansaglik.yonetim.repository;

import com.hayvansaglik.yonetim.model.Tur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TurRepository extends JpaRepository<Tur, Integer> {
    Optional<Tur> findByIsim(String isim);
} 