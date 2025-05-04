package com.hayvansaglik.yonetim.repository;

import com.hayvansaglik.yonetim.model.AlerjiKronik;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AlerjiKronikRepository extends JpaRepository<AlerjiKronik, Integer> {
    
    List<AlerjiKronik> findByHayvanId(Integer hayvanId);
    
    List<AlerjiKronik> findByTipi(String tipi);
    
    List<AlerjiKronik> findByHayvanIdAndTipi(Integer hayvanId, String tipi);
    
    List<AlerjiKronik> findByAllerjenVeyaHastalikContainingIgnoreCase(String allerjenVeyaHastalik);
    
    List<AlerjiKronik> findByTaniTarihiBetween(LocalDate baslangic, LocalDate bitis);
    
    List<AlerjiKronik> findByDurum(String durum);
} 