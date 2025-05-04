package com.hayvansaglik.yonetim.repository;

import com.hayvansaglik.yonetim.model.ReceteIlaclari;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReceteIlaclariRepository extends JpaRepository<ReceteIlaclari, Integer> {
    
    List<ReceteIlaclari> findByReceteId(Integer receteId);
    
    List<ReceteIlaclari> findByIlacAdiContainingIgnoreCase(String ilacAdi);
} 