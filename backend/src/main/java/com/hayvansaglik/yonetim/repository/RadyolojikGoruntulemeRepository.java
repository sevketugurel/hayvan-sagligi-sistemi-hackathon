package com.hayvansaglik.yonetim.repository;

import com.hayvansaglik.yonetim.model.RadyolojikGoruntuleme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface RadyolojikGoruntulemeRepository extends JpaRepository<RadyolojikGoruntuleme, Integer> {
    
    List<RadyolojikGoruntuleme> findByHayvanId(Integer hayvanId);
    
    List<RadyolojikGoruntuleme> findByHayvanIdAndTipiBetween(Integer hayvanId, String tipi, LocalDate baslangic, LocalDate bitis);
    
    List<RadyolojikGoruntuleme> findByTipi(String tipi);
} 