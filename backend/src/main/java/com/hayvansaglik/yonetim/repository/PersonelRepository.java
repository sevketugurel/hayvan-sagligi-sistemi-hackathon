package com.hayvansaglik.yonetim.repository;

import com.hayvansaglik.yonetim.model.Personel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface PersonelRepository extends JpaRepository<Personel, Integer> {
    
    Optional<Personel> findByePosta(String ePosta);
    
    List<Personel> findByAdContainingIgnoreCaseOrSoyadContainingIgnoreCase(String ad, String soyad);
    
    List<Personel> findByAktif(boolean aktif);
    
    List<Personel> findByIseBaslamaTarihiBetween(LocalDate baslangic, LocalDate bitis);
} 