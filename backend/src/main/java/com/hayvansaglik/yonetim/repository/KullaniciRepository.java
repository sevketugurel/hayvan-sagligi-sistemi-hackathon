package com.hayvansaglik.yonetim.repository;

import com.hayvansaglik.yonetim.model.Kullanici;
import com.hayvansaglik.yonetim.model.Personel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface KullaniciRepository extends JpaRepository<Kullanici, Integer> {
    
    Optional<Kullanici> findByKullaniciAdi(String kullaniciAdi);
    
    Optional<Kullanici> findByPersonel(Personel personel);
    
    boolean existsByKullaniciAdi(String kullaniciAdi);
} 