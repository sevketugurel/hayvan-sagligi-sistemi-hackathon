package com.hayvansaglik.yonetim.repository;

import com.hayvansaglik.yonetim.model.Asi;
import com.hayvansaglik.yonetim.model.Hayvan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AsiRepository extends JpaRepository<Asi, Integer> {
    
    /**
     * Belirli bir hayvana ait aşıları bulur.
     * 
     * @param hayvan İlgili hayvan
     * @return Hayvana ait aşılar listesi
     */
    List<Asi> findByHayvan(Hayvan hayvan);
    
    /**
     * Aşı adına göre aşıları bulur.
     * 
     * @param asiAdi Aşı adı
     * @return Aşı adına göre eşleşen aşılar
     */
    List<Asi> findByAsiAdiContainingIgnoreCase(String asiAdi);
    
    /**
     * Belirli bir tarih aralığında uygulanan aşıları bulur.
     * 
     * @param baslangicTarihi Başlangıç tarihi
     * @param bitisTarihi Bitiş tarihi
     * @return Tarih aralığında uygulanan aşılar
     */
    List<Asi> findByUygulamaTarihiBetween(LocalDate baslangicTarihi, LocalDate bitisTarihi);
    
    /**
     * Belirli bir tarih aralığında uygulanması gereken aşıları bulur.
     * 
     * @param baslangicTarihi Başlangıç tarihi
     * @param bitisTarihi Bitiş tarihi
     * @return Tarih aralığında uygulanması gereken aşılar
     */
    List<Asi> findBySonrakiUygulamaTarihiBetween(LocalDate baslangicTarihi, LocalDate bitisTarihi);
    
    /**
     * Belirli bir tarihten önce uygulanması gereken aşıları bulur.
     * 
     * @param tarih Tarih
     * @return Belirtilen tarihten önce uygulanması gereken aşılar
     */
    List<Asi> findBySonrakiUygulamaTarihiLessThanEqual(LocalDate tarih);
    
    /**
     * Belirli bir hayvana ait aşı adına göre aşıları bulur.
     * 
     * @param hayvan İlgili hayvan
     * @param asiAdi Aşı adı
     * @return Hayvana ait ve aşı adına göre eşleşen aşılar
     */
    List<Asi> findByHayvanAndAsiAdiContainingIgnoreCase(Hayvan hayvan, String asiAdi);
} 