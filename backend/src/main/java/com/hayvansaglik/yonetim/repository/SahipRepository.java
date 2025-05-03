package com.hayvansaglik.yonetim.repository;

import com.hayvansaglik.yonetim.model.Sahip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SahipRepository extends JpaRepository<Sahip, Integer> {
    List<Sahip> findByAdContainingIgnoreCase(String ad);
    List<Sahip> findBySoyadContainingIgnoreCase(String soyad);
    List<Sahip> findByAdContainingIgnoreCaseAndSoyadContainingIgnoreCase(String ad, String soyad);
    List<Sahip> findByTelefon1(String telefon);
    List<Sahip> findByTelefon1ContainingOrTelefon2Containing(String telefon, String telefon2);
    List<Sahip> findByEpostaContainingIgnoreCase(String eposta);
} 