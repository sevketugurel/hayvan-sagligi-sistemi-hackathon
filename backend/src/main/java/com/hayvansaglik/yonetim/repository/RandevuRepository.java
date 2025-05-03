package com.hayvansaglik.yonetim.repository;

import com.hayvansaglik.yonetim.model.Hayvan;
import com.hayvansaglik.yonetim.model.Personel;
import com.hayvansaglik.yonetim.model.Randevu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface RandevuRepository extends JpaRepository<Randevu, Integer> {
    
    List<Randevu> findByHayvan(Hayvan hayvan);
    
    List<Randevu> findByVeteriner(Personel veteriner);
    
    List<Randevu> findByDurum(String durum);
    
    List<Randevu> findByRandevuZamaniBetween(LocalDateTime baslangic, LocalDateTime bitis);
    
    List<Randevu> findByHayvanAndDurum(Hayvan hayvan, String durum);
    
    List<Randevu> findByVeterinerAndRandevuZamaniBetween(Personel veteriner, LocalDateTime baslangic, LocalDateTime bitis);
    
    List<Randevu> findByTur(String tur);
} 