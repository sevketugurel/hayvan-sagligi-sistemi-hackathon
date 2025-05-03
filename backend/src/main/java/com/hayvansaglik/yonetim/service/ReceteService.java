package com.hayvansaglik.yonetim.service;

import com.hayvansaglik.yonetim.model.KlinikInceleme;
import com.hayvansaglik.yonetim.model.Recete;
import com.hayvansaglik.yonetim.repository.ReceteRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReceteService {
    
    private final ReceteRepository receteRepository;
    
    @Autowired
    public ReceteService(ReceteRepository receteRepository) {
        this.receteRepository = receteRepository;
    }
    
    public List<Recete> findAll() {
        return receteRepository.findAll();
    }
    
    public Recete findById(Integer id) {
        return receteRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Reçete bulunamadı: " + id));
    }
    
    public List<Recete> findByKlinikInceleme(KlinikInceleme klinikInceleme) {
        return receteRepository.findByKlinikInceleme(klinikInceleme);
    }
    
    public List<Recete> findByIlac(String ilac) {
        return receteRepository.findByIlacContainingIgnoreCase(ilac);
    }
    
    public List<Recete> findByDoz(String doz) {
        return receteRepository.findByDozContainingIgnoreCase(doz);
    }
    
    public Recete save(Recete recete) {
        return receteRepository.save(recete);
    }
    
    public Recete update(Integer id, Recete receteDetay) {
        Recete recete = findById(id);
        
        if (receteDetay.getKlinikInceleme() != null) {
            recete.setKlinikInceleme(receteDetay.getKlinikInceleme());
        }
        
        if (receteDetay.getIlac() != null) {
            recete.setIlac(receteDetay.getIlac());
        }
        
        if (receteDetay.getDoz() != null) {
            recete.setDoz(receteDetay.getDoz());
        }
        
        if (receteDetay.getTalimatlar() != null) {
            recete.setTalimatlar(receteDetay.getTalimatlar());
        }
        
        return receteRepository.save(recete);
    }
    
    public void delete(Integer id) {
        Recete recete = findById(id);
        receteRepository.delete(recete);
    }
} 