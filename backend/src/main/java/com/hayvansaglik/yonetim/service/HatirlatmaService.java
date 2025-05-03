package com.hayvansaglik.yonetim.service;

import com.hayvansaglik.yonetim.model.Hatirlatma;
import com.hayvansaglik.yonetim.model.Randevu;
import com.hayvansaglik.yonetim.repository.HatirlatmaRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class HatirlatmaService {
    
    private final HatirlatmaRepository hatirlatmaRepository;
    
    @Autowired
    public HatirlatmaService(HatirlatmaRepository hatirlatmaRepository) {
        this.hatirlatmaRepository = hatirlatmaRepository;
    }
    
    public List<Hatirlatma> findAll() {
        return hatirlatmaRepository.findAll();
    }
    
    public Hatirlatma findById(Integer id) {
        return hatirlatmaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Hatırlatma bulunamadı: " + id));
    }
    
    public List<Hatirlatma> findByRandevu(Randevu randevu) {
        return hatirlatmaRepository.findByRandevu(randevu);
    }
    
    public List<Hatirlatma> findByKanal(String kanal) {
        return hatirlatmaRepository.findByKanal(kanal);
    }
    
    public List<Hatirlatma> findByDurum(String durum) {
        return hatirlatmaRepository.findByDurum(durum);
    }
    
    public List<Hatirlatma> findByGonderimZamaniBetween(LocalDateTime baslangic, LocalDateTime bitis) {
        return hatirlatmaRepository.findByGonderimZamaniBetween(baslangic, bitis);
    }
    
    public List<Hatirlatma> findByGonderilecekHatirlatmalar(LocalDateTime zaman) {
        return hatirlatmaRepository.findByGonderimZamaniLessThanEqualAndDurum(zaman, "BEKLEMEDE");
    }
    
    public Hatirlatma save(Hatirlatma hatirlatma) {
        return hatirlatmaRepository.save(hatirlatma);
    }
    
    public Hatirlatma update(Integer id, Hatirlatma hatirlatmaDetay) {
        Hatirlatma hatirlatma = findById(id);
        
        if (hatirlatmaDetay.getRandevu() != null) {
            hatirlatma.setRandevu(hatirlatmaDetay.getRandevu());
        }
        
        if (hatirlatmaDetay.getGonderimZamani() != null) {
            hatirlatma.setGonderimZamani(hatirlatmaDetay.getGonderimZamani());
        }
        
        if (hatirlatmaDetay.getKanal() != null) {
            hatirlatma.setKanal(hatirlatmaDetay.getKanal());
        }
        
        if (hatirlatmaDetay.getDurum() != null) {
            hatirlatma.setDurum(hatirlatmaDetay.getDurum());
        }
        
        return hatirlatmaRepository.save(hatirlatma);
    }
    
    public void delete(Integer id) {
        Hatirlatma hatirlatma = findById(id);
        hatirlatmaRepository.delete(hatirlatma);
    }
    
    public Hatirlatma gonderildi(Integer id) {
        Hatirlatma hatirlatma = findById(id);
        hatirlatma.setDurum("GONDERILDI");
        return hatirlatmaRepository.save(hatirlatma);
    }
    
    public Hatirlatma iptalEt(Integer id) {
        Hatirlatma hatirlatma = findById(id);
        hatirlatma.setDurum("IPTAL");
        return hatirlatmaRepository.save(hatirlatma);
    }
} 