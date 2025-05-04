package com.hayvansaglik.yonetim.repository;

import com.hayvansaglik.yonetim.model.AlerjiKronikTedavi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlerjiKronikTedaviRepository extends JpaRepository<AlerjiKronikTedavi, Integer> {
    
    List<AlerjiKronikTedavi> findByAlerjiId(Integer alerjiId);
    
    List<AlerjiKronikTedavi> findByTedaviContainingIgnoreCase(String tedavi);
} 