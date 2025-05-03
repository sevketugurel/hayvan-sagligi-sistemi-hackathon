package com.hayvansaglik.yonetim.service;

import com.hayvansaglik.yonetim.model.HastalikGecmisi;
import com.hayvansaglik.yonetim.model.Hayvan;
import com.hayvansaglik.yonetim.repository.HastalikGecmisiRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class HastalikGecmisiService {
    
    private final HastalikGecmisiRepository hastalikGecmisiRepository;
    
    @Autowired
    public HastalikGecmisiService(HastalikGecmisiRepository hastalikGecmisiRepository) {
        this.hastalikGecmisiRepository = hastalikGecmisiRepository;
    }
    
    public List<HastalikGecmisi> findAll() {
        return hastalikGecmisiRepository.findAll();
    }
    
    public HastalikGecmisi findById(Integer id) {
        return hastalikGecmisiRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Hastalık geçmişi bulunamadı: " + id));
    }
    
    public List<HastalikGecmisi> findByHayvan(Hayvan hayvan) {
        return hastalikGecmisiRepository.findByHayvan(hayvan);
    }
    
    public List<HastalikGecmisi> findByHastalikAdi(String hastalikAdi) {
        return hastalikGecmisiRepository.findByHastalikAdiContainingIgnoreCase(hastalikAdi);
    }
    
    public List<HastalikGecmisi> findByTaniTarihiBetween(LocalDate baslangic, LocalDate bitis) {
        return hastalikGecmisiRepository.findByTaniTarihiBetween(baslangic, bitis);
    }
    
    public List<HastalikGecmisi> findAktifHastaliklar() {
        return hastalikGecmisiRepository.findByIyilesmeTarihiIsNull();
    }
    
    public List<HastalikGecmisi> findIyilesmisTedaviler() {
        return hastalikGecmisiRepository.findByIyilesmeTarihiIsNotNull();
    }
    
    public List<HastalikGecmisi> findByHayvanAndHastalikAdi(Hayvan hayvan, String hastalikAdi) {
        return hastalikGecmisiRepository.findByHayvanAndHastalikAdiContainingIgnoreCase(hayvan, hastalikAdi);
    }
    
    public HastalikGecmisi save(HastalikGecmisi hastalikGecmisi) {
        return hastalikGecmisiRepository.save(hastalikGecmisi);
    }
    
    public HastalikGecmisi update(Integer id, HastalikGecmisi hastalikGecmisiDetay) {
        HastalikGecmisi hastalikGecmisi = findById(id);
        
        if (hastalikGecmisiDetay.getHayvan() != null) {
            hastalikGecmisi.setHayvan(hastalikGecmisiDetay.getHayvan());
        }
        
        if (hastalikGecmisiDetay.getHastalikAdi() != null) {
            hastalikGecmisi.setHastalikAdi(hastalikGecmisiDetay.getHastalikAdi());
        }
        
        if (hastalikGecmisiDetay.getTaniTarihi() != null) {
            hastalikGecmisi.setTaniTarihi(hastalikGecmisiDetay.getTaniTarihi());
        }
        
        if (hastalikGecmisiDetay.getIyilesmeTarihi() != null) {
            hastalikGecmisi.setIyilesmeTarihi(hastalikGecmisiDetay.getIyilesmeTarihi());
        }
        
        if (hastalikGecmisiDetay.getAciklama() != null) {
            hastalikGecmisi.setAciklama(hastalikGecmisiDetay.getAciklama());
        }
        
        return hastalikGecmisiRepository.save(hastalikGecmisi);
    }
    
    public HastalikGecmisi tedaviyiTamamla(Integer id, LocalDate iyilesmeTarihi) {
        HastalikGecmisi hastalikGecmisi = findById(id);
        hastalikGecmisi.setIyilesmeTarihi(iyilesmeTarihi);
        return hastalikGecmisiRepository.save(hastalikGecmisi);
    }
    
    public void delete(Integer id) {
        HastalikGecmisi hastalikGecmisi = findById(id);
        hastalikGecmisiRepository.delete(hastalikGecmisi);
    }
} 