package com.hayvansaglik.yonetim.repository;

import com.hayvansaglik.yonetim.model.Hatirlatma;
import com.hayvansaglik.yonetim.model.Randevu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface HatirlatmaRepository extends JpaRepository<Hatirlatma, Integer> {
    
    List<Hatirlatma> findByRandevu(Randevu randevu);
    
    List<Hatirlatma> findByKanal(String kanal);
    
    List<Hatirlatma> findByDurum(String durum);
    
    List<Hatirlatma> findByGonderimZamaniBetween(LocalDateTime baslangic, LocalDateTime bitis);
    
    List<Hatirlatma> findByGonderimZamaniLessThanEqualAndDurum(LocalDateTime zaman, String durum);
} 