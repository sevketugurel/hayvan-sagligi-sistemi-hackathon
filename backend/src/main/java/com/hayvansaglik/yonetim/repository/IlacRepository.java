package com.hayvansaglik.yonetim.repository;

import com.hayvansaglik.yonetim.model.Ilac;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IlacRepository extends JpaRepository<Ilac, Integer> {
    
    List<Ilac> findByIlacAdContainingIgnoreCase(String ilacAd);
    
    List<Ilac> findByAktifMaddeContainingIgnoreCase(String aktifMadde);
    
    List<Ilac> findByKullanimAlaniContainingIgnoreCase(String kullanimAlani);
    
    List<Ilac> findByUygulamaYoluContainingIgnoreCase(String uygulamaYolu);
} 