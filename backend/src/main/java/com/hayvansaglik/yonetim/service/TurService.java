package com.hayvansaglik.yonetim.service;

import com.hayvansaglik.yonetim.model.Tur;
import com.hayvansaglik.yonetim.repository.TurRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TurService {
    
    private final TurRepository turRepository;
    
    @Autowired
    public TurService(TurRepository turRepository) {
        this.turRepository = turRepository;
    }
    
    public List<Tur> findAll() {
        return turRepository.findAll();
    }
    
    public Tur findById(Integer id) {
        return turRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tür bulunamadı: " + id));
    }
    
    public Tur findByIsim(String isim) {
        return turRepository.findByIsim(isim)
                .orElseThrow(() -> new EntityNotFoundException("Tür bulunamadı: " + isim));
    }
    
    public Tur save(Tur tur) {
        return turRepository.save(tur);
    }
    
    public Tur update(Integer id, Tur turDetails) {
        Tur tur = findById(id);
        tur.setIsim(turDetails.getIsim());
        return turRepository.save(tur);
    }
    
    public void delete(Integer id) {
        Tur tur = findById(id);
        turRepository.delete(tur);
    }
} 