package com.hayvansaglik.yonetim.repository;

import com.hayvansaglik.yonetim.model.Hayvan;
import com.hayvansaglik.yonetim.model.RaporTakvimi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface RaporTakvimiRepository extends JpaRepository<RaporTakvimi, Integer> {
    
    /**
     * Belirli bir hayvana ait rapor takvimlerini bulur.
     * 
     * @param hayvan İlgili hayvan
     * @return Hayvana ait rapor takvimleri listesi
     */
    List<RaporTakvimi> findByHayvan(Hayvan hayvan);
    
    /**
     * Belirli bir tarih aralığındaki rapor takvimlerini bulur.
     * 
     * @param baslangicTarihi Başlangıç tarihi
     * @param bitisTarihi Bitiş tarihi
     * @return Tarih aralığındaki rapor takvimleri
     */
    List<RaporTakvimi> findByTarihBetween(LocalDate baslangicTarihi, LocalDate bitisTarihi);
    
    /**
     * Belirli bir tarihte ve sonrasındaki rapor takvimlerini bulur.
     * 
     * @param tarih Başlangıç tarihi
     * @return Tarihten sonraki rapor takvimleri
     */
    List<RaporTakvimi> findByTarihGreaterThanEqual(LocalDate tarih);
    
    /**
     * Tamamlanmış veya tamamlanmamış rapor takvimlerini bulur.
     * 
     * @param tamamlandi Tamamlanma durumu
     * @return Tamamlanma durumuna göre rapor takvimleri
     */
    List<RaporTakvimi> findByTamamlandi(boolean tamamlandi);
    
    /**
     * Belirli bir hayvana ait ve belirli bir tarih aralığındaki rapor takvimlerini bulur.
     * 
     * @param hayvan İlgili hayvan
     * @param baslangicTarihi Başlangıç tarihi
     * @param bitisTarihi Bitiş tarihi
     * @return Hayvana ait ve tarih aralığındaki rapor takvimleri
     */
    List<RaporTakvimi> findByHayvanAndTarihBetween(Hayvan hayvan, LocalDate baslangicTarihi, LocalDate bitisTarihi);
} 