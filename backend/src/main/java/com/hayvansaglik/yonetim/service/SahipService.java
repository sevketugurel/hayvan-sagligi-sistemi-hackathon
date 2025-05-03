package com.hayvansaglik.yonetim.service;

import com.hayvansaglik.yonetim.model.Sahip;
import com.hayvansaglik.yonetim.repository.SahipRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SahipService {
    
    private final SahipRepository sahipRepository;
    
    @Autowired
    public SahipService(SahipRepository sahipRepository) {
        this.sahipRepository = sahipRepository;
    }
    
    public List<Sahip> findAll() {
        return sahipRepository.findAll();
    }
    
    public Sahip findById(Integer id) {
        return sahipRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Sahip bulunamadı: " + id));
    }
    
    public List<Sahip> findByAd(String ad) {
        return sahipRepository.findByAdContainingIgnoreCase(ad);
    }
    
    public List<Sahip> findBySoyad(String soyad) {
        return sahipRepository.findBySoyadContainingIgnoreCase(soyad);
    }
    
    public List<Sahip> findByTelefon(String telefon) {
        return sahipRepository.findByTelefon1ContainingOrTelefon2Containing(telefon, telefon);
    }
    
    public List<Sahip> findByEPosta(String ePosta) {
        return sahipRepository.findByEPostaContainingIgnoreCase(ePosta);
    }
    
    /**
     * Ada ve soyada göre sahipleri getirir.
     * 
     * @param ad Sahip adı
     * @param soyad Sahip soyadı
     * @return Ada ve soyada göre eşleşen sahiplerin listesi
     */
    public List<Sahip> findByAdAndSoyad(String ad, String soyad) {
        return sahipRepository.findByAdContainingIgnoreCaseAndSoyadContainingIgnoreCase(ad, soyad);
    }
    
    public Sahip save(Sahip sahip) {
        return sahipRepository.save(sahip);
    }
    
    public Sahip update(Integer id, Sahip sahipDetails) {
        Sahip sahip = findById(id);
        
        sahip.setAd(sahipDetails.getAd());
        sahip.setSoyad(sahipDetails.getSoyad());
        sahip.setTelefon1(sahipDetails.getTelefon1());
        sahip.setTelefon2(sahipDetails.getTelefon2());
        sahip.setEPosta(sahipDetails.getEPosta());
        sahip.setAdres(sahipDetails.getAdres());
        sahip.setTercihEdilenIletisim(sahipDetails.getTercihEdilenIletisim());
        
        return sahipRepository.save(sahip);
    }
    
    public void delete(Integer id) {
        Sahip sahip = findById(id);
        sahipRepository.delete(sahip);
    }
} 