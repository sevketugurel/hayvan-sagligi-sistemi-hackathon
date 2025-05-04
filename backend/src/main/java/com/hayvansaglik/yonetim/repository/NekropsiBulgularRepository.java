package com.hayvansaglik.yonetim.repository;

import com.hayvansaglik.yonetim.model.NekropsiBulgular;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface NekropsiBulgularRepository extends JpaRepository<NekropsiBulgular, Integer> {
    
    List<NekropsiBulgular> findByHayvanId(Integer hayvanId);
    
    List<NekropsiBulgular> findByTarihBetween(LocalDate baslangic, LocalDate bitis);
    
    List<NekropsiBulgular> findByRaporNo(String raporNo);
    
    List<NekropsiBulgular> findByVeterinerContainingIgnoreCase(String veteriner);
    
    List<NekropsiBulgular> findByTur(String tur);
    
    List<NekropsiBulgular> findByIrk(String irk);
    
    List<NekropsiBulgular> findByKimlikNo(String kimlikNo);
} 