package com.hayvansaglik.yonetim.repository;

import com.hayvansaglik.yonetim.model.HastalikGecmisi;
import com.hayvansaglik.yonetim.model.Hayvan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface HastalikGecmisiRepository extends JpaRepository<HastalikGecmisi, Integer> {
    
    List<HastalikGecmisi> findByHayvan(Hayvan hayvan);
    
    List<HastalikGecmisi> findByHastalikAdiContainingIgnoreCase(String hastalikAdi);
    
    List<HastalikGecmisi> findByTaniTarihiBetween(LocalDate baslangic, LocalDate bitis);
    
    List<HastalikGecmisi> findByIyilesmeTarihiIsNull();
    
    List<HastalikGecmisi> findByIyilesmeTarihiIsNotNull();
    
    List<HastalikGecmisi> findByHayvanAndHastalikAdiContainingIgnoreCase(Hayvan hayvan, String hastalikAdi);
} 