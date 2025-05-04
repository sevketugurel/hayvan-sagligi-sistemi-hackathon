package com.hayvansaglik.yonetim.repository;

import com.hayvansaglik.yonetim.model.LabTestleri;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface LabTestleriRepository extends JpaRepository<LabTestleri, Integer> {
    
    List<LabTestleri> findByHayvanId(Integer hayvanId);
    
    List<LabTestleri> findByHayvanIdAndTarihBetween(Integer hayvanId, LocalDate baslangic, LocalDate bitis);
    
    List<LabTestleri> findByTestAdiContainingIgnoreCase(String testAdi);
} 