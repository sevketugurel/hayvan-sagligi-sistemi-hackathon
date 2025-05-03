package com.hayvansaglik.yonetim.service;

import com.hayvansaglik.yonetim.model.Hayvan;
import com.hayvansaglik.yonetim.model.RaporTakvimi;
import com.hayvansaglik.yonetim.repository.RaporTakvimiRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class RaporTakvimiService {
    
    private final RaporTakvimiRepository raporTakvimiRepository;
    
    @Autowired
    public RaporTakvimiService(RaporTakvimiRepository raporTakvimiRepository) {
        this.raporTakvimiRepository = raporTakvimiRepository;
    }
    
    /**
     * Tüm rapor takvimlerini getirir.
     * 
     * @return Tüm rapor takvimlerinin listesi
     */
    public List<RaporTakvimi> findAll() {
        return raporTakvimiRepository.findAll();
    }
    
    /**
     * ID'ye göre rapor takvimi getirir.
     * 
     * @param id Rapor takvimi ID'si
     * @return Bulunan rapor takvimi
     * @throws EntityNotFoundException Rapor takvimi bulunamazsa
     */
    public RaporTakvimi findById(Integer id) {
        return raporTakvimiRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Rapor takvimi bulunamadı: " + id));
    }
    
    /**
     * Belirli bir hayvana ait rapor takvimlerini getirir.
     * 
     * @param hayvan İlgili hayvan
     * @return Hayvana ait rapor takvimleri
     */
    public List<RaporTakvimi> findByHayvan(Hayvan hayvan) {
        return raporTakvimiRepository.findByHayvan(hayvan);
    }
    
    /**
     * Belirli bir tarih aralığındaki rapor takvimlerini getirir.
     * 
     * @param baslangicTarihi Başlangıç tarihi
     * @param bitisTarihi Bitiş tarihi
     * @return Tarih aralığındaki rapor takvimleri
     */
    public List<RaporTakvimi> findByTarihBetween(LocalDate baslangicTarihi, LocalDate bitisTarihi) {
        return raporTakvimiRepository.findByTarihBetween(baslangicTarihi, bitisTarihi);
    }
    
    /**
     * Belirli bir tarihten sonraki rapor takvimlerini getirir.
     * 
     * @param tarih Başlangıç tarihi
     * @return Tarihten sonraki rapor takvimleri
     */
    public List<RaporTakvimi> findByTarihAfter(LocalDate tarih) {
        return raporTakvimiRepository.findByTarihGreaterThanEqual(tarih);
    }
    
    /**
     * Tamamlanma durumuna göre rapor takvimlerini getirir.
     * 
     * @param tamamlandi Tamamlanma durumu
     * @return Tamamlanma durumuna göre rapor takvimleri
     */
    public List<RaporTakvimi> findByTamamlandi(boolean tamamlandi) {
        return raporTakvimiRepository.findByTamamlandi(tamamlandi);
    }
    
    /**
     * Belirli bir hayvana ait ve belirli bir tarih aralığındaki rapor takvimlerini getirir.
     * 
     * @param hayvan İlgili hayvan
     * @param baslangicTarihi Başlangıç tarihi
     * @param bitisTarihi Bitiş tarihi
     * @return Hayvana ait ve tarih aralığındaki rapor takvimleri
     */
    public List<RaporTakvimi> findByHayvanAndTarihBetween(Hayvan hayvan, LocalDate baslangicTarihi, LocalDate bitisTarihi) {
        return raporTakvimiRepository.findByHayvanAndTarihBetween(hayvan, baslangicTarihi, bitisTarihi);
    }
    
    /**
     * Yeni bir rapor takvimi oluşturur.
     * 
     * @param raporTakvimi Oluşturulacak rapor takvimi
     * @return Oluşturulan rapor takvimi
     */
    public RaporTakvimi save(RaporTakvimi raporTakvimi) {
        return raporTakvimiRepository.save(raporTakvimi);
    }
    
    /**
     * Rapor takvimini günceller.
     * 
     * @param id Güncellenecek rapor takvimi ID'si
     * @param raporTakvimiDetails Güncellenmiş rapor takvimi bilgileri
     * @return Güncellenmiş rapor takvimi
     * @throws EntityNotFoundException Rapor takvimi bulunamazsa
     */
    public RaporTakvimi update(Integer id, RaporTakvimi raporTakvimiDetails) {
        RaporTakvimi raporTakvimi = findById(id);
        
        if (raporTakvimiDetails.getHayvan() != null) {
            raporTakvimi.setHayvan(raporTakvimiDetails.getHayvan());
        }
        
        raporTakvimi.setRaporTipi(raporTakvimiDetails.getRaporTipi());
        raporTakvimi.setTarih(raporTakvimiDetails.getTarih());
        raporTakvimi.setAciklama(raporTakvimiDetails.getAciklama());
        raporTakvimi.setTamamlandi(raporTakvimiDetails.isTamamlandi());
        
        return raporTakvimiRepository.save(raporTakvimi);
    }
    
    /**
     * Rapor takviminin tamamlanma durumunu günceller.
     * 
     * @param id Güncellenecek rapor takvimi ID'si
     * @param tamamlandi Yeni tamamlanma durumu
     * @return Güncellenmiş rapor takvimi
     * @throws EntityNotFoundException Rapor takvimi bulunamazsa
     */
    public RaporTakvimi updateTamamlandiBilgisi(Integer id, boolean tamamlandi) {
        RaporTakvimi raporTakvimi = findById(id);
        raporTakvimi.setTamamlandi(tamamlandi);
        return raporTakvimiRepository.save(raporTakvimi);
    }
    
    /**
     * Rapor takvimini siler.
     * 
     * @param id Silinecek rapor takvimi ID'si
     * @throws EntityNotFoundException Rapor takvimi bulunamazsa
     */
    public void delete(Integer id) {
        RaporTakvimi raporTakvimi = findById(id);
        raporTakvimiRepository.delete(raporTakvimi);
    }
} 