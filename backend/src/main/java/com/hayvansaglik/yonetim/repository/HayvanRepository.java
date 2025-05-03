package com.hayvansaglik.yonetim.repository;

import com.hayvansaglik.yonetim.model.Hayvan;
import com.hayvansaglik.yonetim.model.Irk;
import com.hayvansaglik.yonetim.model.Sahip;
import com.hayvansaglik.yonetim.model.Tur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HayvanRepository extends JpaRepository<Hayvan, Integer> {
    
    /**
     * Sahibe göre hayvanları getirir.
     * 
     * @param sahip Hayvan sahibi
     * @return Sahibin hayvanlarının listesi
     */
    List<Hayvan> findBySahip(Sahip sahip);
    
    /**
     * Ada göre hayvanları getirir (büyük-küçük harf duyarsız).
     * 
     * @param ad Hayvan adı
     * @return Ada göre eşleşen hayvanların listesi
     */
    List<Hayvan> findByAdContainingIgnoreCase(String ad);
    
    /**
     * Mikroçip numarasına göre hayvanları getirir.
     * 
     * @param mikrocipNo Mikroçip numarası
     * @return Mikroçip numarasına göre eşleşen hayvanların listesi
     */
    List<Hayvan> findByMikrocipNo(String mikrocipNo);
    
    /**
     * Türe göre hayvanları getirir.
     * 
     * @param tur Hayvan türü
     * @return Türe göre eşleşen hayvanların listesi
     */
    List<Hayvan> findByTur(Tur tur);
    
    /**
     * Irka göre hayvanları getirir.
     * 
     * @param irk Hayvan ırkı
     * @return Irka göre eşleşen hayvanların listesi
     */
    List<Hayvan> findByIrk(Irk irk);
} 