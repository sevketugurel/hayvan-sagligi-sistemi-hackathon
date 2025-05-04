package com.hayvansaglik.yonetim.repository;

import com.hayvansaglik.yonetim.model.Hayvan;
import com.hayvansaglik.yonetim.model.KlinikInceleme;
import com.hayvansaglik.yonetim.model.Personel;
import com.hayvansaglik.yonetim.model.Recete;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReceteRepository extends JpaRepository<Recete, Integer> {
    
    List<Recete> findByHayvanId(Integer hayvanId);
    
    List<Recete> findByHayvan(Hayvan hayvan);
    
    List<Recete> findByTarihBetween(LocalDate baslangic, LocalDate bitis);
    
    List<Recete> findByVeteriner(Personel veteriner);
    
    List<Recete> findByVeterinerId(Integer veterinerId);
    
    List<Recete> findByVeterinerKlinigiContainingIgnoreCase(String veterinerKlinigi);
    
    List<Recete> findByKlinikInceleme(KlinikInceleme klinikInceleme);
    
    List<Recete> findByKlinikIncelemeId(Integer incelemeId);
    
    List<Recete> findByHayvanIdAndTarihBetween(Integer hayvanId, LocalDate startDate, LocalDate endDate);
    
    List<Recete> findByIlacContainingIgnoreCase(String ilac);
    
    List<Recete> findByDozContainingIgnoreCase(String doz);
    
    List<Recete> findByTalimatlarContainingIgnoreCase(String talimatlar);
} 