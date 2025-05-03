package com.hayvansaglik.yonetim.service;

import com.hayvansaglik.yonetim.model.KlinikInceleme;
import com.hayvansaglik.yonetim.model.Randevu;
import com.hayvansaglik.yonetim.repository.KlinikIncelemeRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class KlinikIncelemeService {
    
    private final KlinikIncelemeRepository klinikIncelemeRepository;
    
    @Autowired
    public KlinikIncelemeService(KlinikIncelemeRepository klinikIncelemeRepository) {
        this.klinikIncelemeRepository = klinikIncelemeRepository;
    }
    
    public List<KlinikInceleme> findAll() {
        return klinikIncelemeRepository.findAll();
    }
    
    public KlinikInceleme findById(Integer id) {
        return klinikIncelemeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Klinik inceleme bulunamadı: " + id));
    }
    
    public Optional<KlinikInceleme> findByRandevu(Randevu randevu) {
        return klinikIncelemeRepository.findByRandevu(randevu);
    }
    
    public List<KlinikInceleme> findByBirincilTani(String birincilTani) {
        return klinikIncelemeRepository.findByBirincilTaniContainingIgnoreCase(birincilTani);
    }
    
    public List<KlinikInceleme> findByIkincilTani(String ikincilTani) {
        return klinikIncelemeRepository.findByIkincilTaniContainingIgnoreCase(ikincilTani);
    }
    
    public KlinikInceleme save(KlinikInceleme klinikInceleme) {
        return klinikIncelemeRepository.save(klinikInceleme);
    }
    
    public KlinikInceleme update(Integer id, KlinikInceleme klinikIncelemeDetay) {
        KlinikInceleme klinikInceleme = findById(id);
        
        if (klinikIncelemeDetay.getRandevu() != null) {
            klinikInceleme.setRandevu(klinikIncelemeDetay.getRandevu());
        }
        
        if (klinikIncelemeDetay.getSikayetler() != null) {
            klinikInceleme.setSikayetler(klinikIncelemeDetay.getSikayetler());
        }
        
        if (klinikIncelemeDetay.getAnamnez() != null) {
            klinikInceleme.setAnamnez(klinikIncelemeDetay.getAnamnez());
        }
        
        if (klinikIncelemeDetay.getBulgular() != null) {
            klinikInceleme.setBulgular(klinikIncelemeDetay.getBulgular());
        }
        
        if (klinikIncelemeDetay.getBirincilTani() != null) {
            klinikInceleme.setBirincilTani(klinikIncelemeDetay.getBirincilTani());
        }
        
        if (klinikIncelemeDetay.getIkincilTani() != null) {
            klinikInceleme.setIkincilTani(klinikIncelemeDetay.getIkincilTani());
        }
        
        if (klinikIncelemeDetay.getIslemler() != null) {
            klinikInceleme.setIslemler(klinikIncelemeDetay.getIslemler());
        }
        
        if (klinikIncelemeDetay.getNotlar() != null) {
            klinikInceleme.setNotlar(klinikIncelemeDetay.getNotlar());
        }
        
        return klinikIncelemeRepository.save(klinikInceleme);
    }
    
    public void delete(Integer id) {
        KlinikInceleme klinikInceleme = findById(id);
        klinikIncelemeRepository.delete(klinikInceleme);
    }
} 