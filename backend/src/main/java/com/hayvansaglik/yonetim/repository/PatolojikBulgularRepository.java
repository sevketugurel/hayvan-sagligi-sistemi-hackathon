package com.hayvansaglik.yonetim.repository;

import com.hayvansaglik.yonetim.model.PatolojikBulgular;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PatolojikBulgularRepository extends JpaRepository<PatolojikBulgular, Integer> {
    
    List<PatolojikBulgular> findByHayvanId(Integer hayvanId);
    
    List<PatolojikBulgular> findByTarihBetween(LocalDate baslangic, LocalDate bitis);
    
    List<PatolojikBulgular> findByRaporNo(String raporNo);
    
    List<PatolojikBulgular> findByOrnekTipiContainingIgnoreCase(String ornekTipi);
    
    List<PatolojikBulgular> findByTaniContainingIgnoreCase(String tani);
    
    List<PatolojikBulgular> findByDerece(String derece);
} 