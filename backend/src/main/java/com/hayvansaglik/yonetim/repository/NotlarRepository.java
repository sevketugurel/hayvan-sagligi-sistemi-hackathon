package com.hayvansaglik.yonetim.repository;

import com.hayvansaglik.yonetim.model.Notlar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface NotlarRepository extends JpaRepository<Notlar, Integer> {
    
    List<Notlar> findByHayvanId(Integer hayvanId);
    
    List<Notlar> findByTarihBetween(LocalDate baslangic, LocalDate bitis);
    
    List<Notlar> findByYazarContainingIgnoreCase(String yazar);
    
    List<Notlar> findByIcerikContainingIgnoreCase(String icerik);
    
    List<Notlar> findByHayvanIdAndTarihBetween(Integer hayvanId, LocalDate baslangic, LocalDate bitis);
} 