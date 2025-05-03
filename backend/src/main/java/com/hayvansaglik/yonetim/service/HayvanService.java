package com.hayvansaglik.yonetim.service;

import com.hayvansaglik.yonetim.model.Hayvan;
import com.hayvansaglik.yonetim.model.Irk;
import com.hayvansaglik.yonetim.model.Sahip;
import com.hayvansaglik.yonetim.model.Tur;
import com.hayvansaglik.yonetim.repository.HayvanRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HayvanService {
    
    private final HayvanRepository hayvanRepository;
    
    @Autowired
    public HayvanService(HayvanRepository hayvanRepository) {
        this.hayvanRepository = hayvanRepository;
    }
    
    public List<Hayvan> findAll() {
        return hayvanRepository.findAll();
    }
    
    public Hayvan findById(Integer id) {
        return hayvanRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Hayvan bulunamadı: " + id));
    }
    
    public List<Hayvan> findBySahip(Sahip sahip) {
        return hayvanRepository.findBySahip(sahip);
    }
    
    public List<Hayvan> findByAd(String ad) {
        return hayvanRepository.findByAdContainingIgnoreCase(ad);
    }
    
    public List<Hayvan> findByTur(Tur tur) {
        return hayvanRepository.findByTur(tur);
    }
    
    public List<Hayvan> findByIrk(Irk irk) {
        return hayvanRepository.findByIrk(irk);
    }
    
    public List<Hayvan> findByMikrocipNo(String mikrocipNo) {
        return hayvanRepository.findByMikrocipNo(mikrocipNo);
    }
    
    public Hayvan save(Hayvan hayvan) {
        return hayvanRepository.save(hayvan);
    }
    
    public Hayvan update(Integer id, Hayvan hayvanDetails) {
        Hayvan hayvan = findById(id);
        
        hayvan.setAd(hayvanDetails.getAd());
        
        if (hayvanDetails.getSahip() != null) {
            hayvan.setSahip(hayvanDetails.getSahip());
        }
        
        if (hayvanDetails.getTur() != null) {
            hayvan.setTur(hayvanDetails.getTur());
        }
        
        if (hayvanDetails.getIrk() != null) {
            hayvan.setIrk(hayvanDetails.getIrk());
        }
        
        hayvan.setCinsiyet(hayvanDetails.getCinsiyet());
        hayvan.setDogumTarihi(hayvanDetails.getDogumTarihi());
        hayvan.setKilo(hayvanDetails.getKilo());
        hayvan.setRenk(hayvanDetails.getRenk());
        hayvan.setMikrocipNo(hayvanDetails.getMikrocipNo());
        hayvan.setAlerjiler(hayvanDetails.getAlerjiler());
        hayvan.setKronikHastaliklar(hayvanDetails.getKronikHastaliklar());
        
        return hayvanRepository.save(hayvan);
    }
    
    public void delete(Integer id) {
        Hayvan hayvan = findById(id);
        hayvanRepository.delete(hayvan);
    }
} 