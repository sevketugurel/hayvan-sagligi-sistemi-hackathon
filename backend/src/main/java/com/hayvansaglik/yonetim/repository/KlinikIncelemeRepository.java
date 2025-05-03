package com.hayvansaglik.yonetim.repository;

import com.hayvansaglik.yonetim.model.KlinikInceleme;
import com.hayvansaglik.yonetim.model.Randevu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface KlinikIncelemeRepository extends JpaRepository<KlinikInceleme, Integer> {
    
    Optional<KlinikInceleme> findByRandevu(Randevu randevu);
    
    List<KlinikInceleme> findByBirincilTaniContainingIgnoreCase(String birincilTani);
    
    List<KlinikInceleme> findByIkincilTaniContainingIgnoreCase(String ikincilTani);
} 