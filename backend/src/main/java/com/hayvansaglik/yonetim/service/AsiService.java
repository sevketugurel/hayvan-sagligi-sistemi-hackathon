package com.hayvansaglik.yonetim.service;

import com.hayvansaglik.yonetim.model.Asi;
import com.hayvansaglik.yonetim.model.Hayvan;
import com.hayvansaglik.yonetim.repository.AsiRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AsiService {
    
    private final AsiRepository asiRepository;
    
    @Autowired
    public AsiService(AsiRepository asiRepository) {
        this.asiRepository = asiRepository;
    }
    
    /**
     * Tüm aşıları getirir.
     * 
     * @return Tüm aşıların listesi
     */
    public List<Asi> findAll() {
        return asiRepository.findAll();
    }
    
    /**
     * ID'ye göre aşı getirir.
     * 
     * @param id Aşı ID'si
     * @return Bulunan aşı
     * @throws EntityNotFoundException Aşı bulunamazsa
     */
    public Asi findById(Integer id) {
        return asiRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Aşı bulunamadı: " + id));
    }
    
    /**
     * Belirli bir hayvana ait aşıları getirir.
     * 
     * @param hayvan İlgili hayvan
     * @return Hayvana ait aşılar
     */
    public List<Asi> findByHayvan(Hayvan hayvan) {
        return asiRepository.findByHayvan(hayvan);
    }
    
    /**
     * Aşı adına göre aşıları getirir.
     * 
     * @param asiAdi Aşı adı
     * @return Aşı adına göre eşleşen aşılar
     */
    public List<Asi> findByAsiAdi(String asiAdi) {
        return asiRepository.findByAsiAdiContainingIgnoreCase(asiAdi);
    }
    
    /**
     * Belirli bir tarih aralığında uygulanan aşıları getirir.
     * 
     * @param baslangicTarihi Başlangıç tarihi
     * @param bitisTarihi Bitiş tarihi
     * @return Tarih aralığında uygulanan aşılar
     */
    public List<Asi> findByUygulamaTarihiBetween(LocalDate baslangicTarihi, LocalDate bitisTarihi) {
        return asiRepository.findByUygulamaTarihiBetween(baslangicTarihi, bitisTarihi);
    }
    
    /**
     * Belirli bir tarih aralığında uygulanması gereken aşıları getirir.
     * 
     * @param baslangicTarihi Başlangıç tarihi
     * @param bitisTarihi Bitiş tarihi
     * @return Tarih aralığında uygulanması gereken aşılar
     */
    public List<Asi> findBySonrakiUygulamaTarihiBetween(LocalDate baslangicTarihi, LocalDate bitisTarihi) {
        return asiRepository.findBySonrakiUygulamaTarihiBetween(baslangicTarihi, bitisTarihi);
    }
    
    /**
     * Zamanı gelmiş aşıları getirir (bugün ve öncesinde yapılması gereken).
     * 
     * @return Zamanı gelmiş aşılar
     */
    public List<Asi> findDueVaccines() {
        LocalDate today = LocalDate.now();
        return asiRepository.findBySonrakiUygulamaTarihiLessThanEqual(today);
    }
    
    /**
     * Belirli bir hayvana ait ve belirli bir aşı adına göre aşıları getirir.
     * 
     * @param hayvan İlgili hayvan
     * @param asiAdi Aşı adı
     * @return Hayvana ait ve aşı adına göre eşleşen aşılar
     */
    public List<Asi> findByHayvanAndAsiAdi(Hayvan hayvan, String asiAdi) {
        return asiRepository.findByHayvanAndAsiAdiContainingIgnoreCase(hayvan, asiAdi);
    }
    
    /**
     * Yeni bir aşı oluşturur.
     * 
     * @param asi Oluşturulacak aşı
     * @return Oluşturulan aşı
     */
    public Asi save(Asi asi) {
        return asiRepository.save(asi);
    }
    
    /**
     * Aşı günceller.
     * 
     * @param id Güncellenecek aşı ID'si
     * @param asiDetails Güncellenmiş aşı bilgileri
     * @return Güncellenmiş aşı
     * @throws EntityNotFoundException Aşı bulunamazsa
     */
    public Asi update(Integer id, Asi asiDetails) {
        Asi asi = findById(id);
        
        if (asiDetails.getHayvan() != null) {
            asi.setHayvan(asiDetails.getHayvan());
        }
        
        asi.setAsiAdi(asiDetails.getAsiAdi());
        asi.setUygulamaTarihi(asiDetails.getUygulamaTarihi());
        asi.setSonrakiUygulamaTarihi(asiDetails.getSonrakiUygulamaTarihi());
        asi.setDoz(asiDetails.getDoz());
        asi.setUygulayanVeteriner(asiDetails.getUygulayanVeteriner());
        asi.setAciklama(asiDetails.getAciklama());
        asi.setBatchNo(asiDetails.getBatchNo());
        
        return asiRepository.save(asi);
    }
    
    /**
     * Aşı siler.
     * 
     * @param id Silinecek aşı ID'si
     * @throws EntityNotFoundException Aşı bulunamazsa
     */
    public void delete(Integer id) {
        Asi asi = findById(id);
        asiRepository.delete(asi);
    }
} 