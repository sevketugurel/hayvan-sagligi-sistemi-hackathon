package com.hayvansaglik.yonetim.repository;

import com.hayvansaglik.yonetim.model.LabTestDetaylari;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LabTestDetaylariRepository extends JpaRepository<LabTestDetaylari, Integer> {
    
    List<LabTestDetaylari> findByLabTestiId(Integer testId);
    
    List<LabTestDetaylari> findByParametreContainingIgnoreCase(String parametre);
    
    List<LabTestDetaylari> findByDurum(String durum);
} 