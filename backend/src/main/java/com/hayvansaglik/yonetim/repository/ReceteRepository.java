package com.hayvansaglik.yonetim.repository;

import com.hayvansaglik.yonetim.model.KlinikInceleme;
import com.hayvansaglik.yonetim.model.Recete;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReceteRepository extends JpaRepository<Recete, Integer> {
    
    List<Recete> findByKlinikInceleme(KlinikInceleme klinikInceleme);
    
    List<Recete> findByIlacContainingIgnoreCase(String ilac);
    
    List<Recete> findByDozContainingIgnoreCase(String doz);
} 