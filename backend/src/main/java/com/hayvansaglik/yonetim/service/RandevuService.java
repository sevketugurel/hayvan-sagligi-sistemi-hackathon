package com.hayvansaglik.yonetim.service;

import com.hayvansaglik.yonetim.model.Hayvan;
import com.hayvansaglik.yonetim.model.Personel;
import com.hayvansaglik.yonetim.model.Randevu;
import com.hayvansaglik.yonetim.repository.RandevuRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RandevuService {
    
    private final RandevuRepository randevuRepository;
    
    @Autowired
    public RandevuService(RandevuRepository randevuRepository) {
        this.randevuRepository = randevuRepository;
    }
    
    public List<Randevu> findAll() {
        return randevuRepository.findAll();
    }
    
    public Randevu findById(Integer id) {
        return randevuRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Randevu bulunamadı: " + id));
    }
    
    public List<Randevu> findByHayvan(Hayvan hayvan) {
        return randevuRepository.findByHayvan(hayvan);
    }
    
    public List<Randevu> findByVeteriner(Personel veteriner) {
        return randevuRepository.findByVeteriner(veteriner);
    }
    
    public List<Randevu> findByDurum(String durum) {
        return randevuRepository.findByDurum(durum);
    }
    
    public List<Randevu> findByTarihAraligi(LocalDateTime baslangic, LocalDateTime bitis) {
        return randevuRepository.findByRandevuZamaniBetween(baslangic, bitis);
    }
    
    public List<Randevu> findByVeterinerAndTarihAraligi(Personel veteriner, LocalDateTime baslangic, LocalDateTime bitis) {
        return randevuRepository.findByVeterinerAndRandevuZamaniBetween(veteriner, baslangic, bitis);
    }
    
    public List<Randevu> findByHayvanAndDurum(Hayvan hayvan, String durum) {
        return randevuRepository.findByHayvanAndDurum(hayvan, durum);
    }
    
    public List<Randevu> findByTur(String tur) {
        return randevuRepository.findByTur(tur);
    }
    
    public Randevu save(Randevu randevu) {
        return randevuRepository.save(randevu);
    }
    
    public Randevu update(Integer id, Randevu randevuDetay) {
        Randevu randevu = findById(id);
        
        // Ana değerleri güncelle
        if (randevuDetay.getHayvan() != null) {
            randevu.setHayvan(randevuDetay.getHayvan());
        }
        
        if (randevuDetay.getVeteriner() != null) {
            randevu.setVeteriner(randevuDetay.getVeteriner());
        }
        
        if (randevuDetay.getRandevuZamani() != null) {
            randevu.setRandevuZamani(randevuDetay.getRandevuZamani());
        }
        
        if (randevuDetay.getSureDk() != null) {
            randevu.setSureDk(randevuDetay.getSureDk());
        }
        
        if (randevuDetay.getTur() != null) {
            randevu.setTur(randevuDetay.getTur());
        }
        
        if (randevuDetay.getDurum() != null) {
            randevu.setDurum(randevuDetay.getDurum());
        }
        
        if (randevuDetay.getIptalNotu() != null) {
            randevu.setIptalNotu(randevuDetay.getIptalNotu());
        }
        
        return randevuRepository.save(randevu);
    }
    
    public void delete(Integer id) {
        Randevu randevu = findById(id);
        randevuRepository.delete(randevu);
    }
    
    public Randevu iptalEt(Integer id, String iptalNotu) {
        Randevu randevu = findById(id);
        randevu.setDurum("İPTAL");
        randevu.setIptalNotu(iptalNotu);
        return randevuRepository.save(randevu);
    }
    
    public Randevu onayla(Integer id) {
        Randevu randevu = findById(id);
        randevu.setDurum("ONAYLANDI");
        return randevuRepository.save(randevu);
    }
} 