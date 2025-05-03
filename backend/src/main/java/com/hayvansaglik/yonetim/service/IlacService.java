package com.hayvansaglik.yonetim.service;

import com.hayvansaglik.yonetim.model.Ilac;
import com.hayvansaglik.yonetim.repository.IlacRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IlacService {
    
    private final IlacRepository ilacRepository;
    
    @Autowired
    public IlacService(IlacRepository ilacRepository) {
        this.ilacRepository = ilacRepository;
    }
    
    public List<Ilac> findAll() {
        return ilacRepository.findAll();
    }
    
    public Ilac findById(Integer id) {
        return ilacRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("İlaç bulunamadı: " + id));
    }
    
    public List<Ilac> findByIlacAd(String ilacAd) {
        return ilacRepository.findByIlacAdContainingIgnoreCase(ilacAd);
    }
    
    public List<Ilac> findByAktifMadde(String aktifMadde) {
        return ilacRepository.findByAktifMaddeContainingIgnoreCase(aktifMadde);
    }
    
    public List<Ilac> findByKullanimAlani(String kullanimAlani) {
        return ilacRepository.findByKullanimAlaniContainingIgnoreCase(kullanimAlani);
    }
    
    public List<Ilac> findByUygulamaYolu(String uygulamaYolu) {
        return ilacRepository.findByUygulamaYoluContainingIgnoreCase(uygulamaYolu);
    }
    
    public Ilac save(Ilac ilac) {
        return ilacRepository.save(ilac);
    }
    
    public Ilac update(Integer id, Ilac ilacDetay) {
        Ilac ilac = findById(id);
        
        if (ilacDetay.getIlacAd() != null) {
            ilac.setIlacAd(ilacDetay.getIlacAd());
        }
        
        if (ilacDetay.getAktifMadde() != null) {
            ilac.setAktifMadde(ilacDetay.getAktifMadde());
        }
        
        if (ilacDetay.getKullanimAlani() != null) {
            ilac.setKullanimAlani(ilacDetay.getKullanimAlani());
        }
        
        if (ilacDetay.getUygulamaYolu() != null) {
            ilac.setUygulamaYolu(ilacDetay.getUygulamaYolu());
        }
        
        if (ilacDetay.getNotlar() != null) {
            ilac.setNotlar(ilacDetay.getNotlar());
        }
        
        return ilacRepository.save(ilac);
    }
    
    public void delete(Integer id) {
        Ilac ilac = findById(id);
        ilacRepository.delete(ilac);
    }
} 