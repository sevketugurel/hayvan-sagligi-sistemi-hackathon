package com.hayvansaglik.yonetim.service;

import com.hayvansaglik.yonetim.model.Kullanici;
import com.hayvansaglik.yonetim.model.Personel;
import com.hayvansaglik.yonetim.repository.KullaniciRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class KullaniciService {
    
    private final KullaniciRepository kullaniciRepository;
    private final PasswordEncoder passwordEncoder;
    
    @Autowired
    public KullaniciService(KullaniciRepository kullaniciRepository, PasswordEncoder passwordEncoder) {
        this.kullaniciRepository = kullaniciRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    public List<Kullanici> findAll() {
        return kullaniciRepository.findAll();
    }
    
    public Kullanici findById(Integer id) {
        return kullaniciRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Kullanıcı bulunamadı: " + id));
    }
    
    public Optional<Kullanici> findByKullaniciAdi(String kullaniciAdi) {
        return kullaniciRepository.findByKullaniciAdi(kullaniciAdi);
    }
    
    public Optional<Kullanici> findByPersonel(Personel personel) {
        return kullaniciRepository.findByPersonel(personel);
    }
    
    public boolean existsByKullaniciAdi(String kullaniciAdi) {
        return kullaniciRepository.existsByKullaniciAdi(kullaniciAdi);
    }
    
    public Kullanici save(Kullanici kullanici) {
        // Şifre şifreleme
        if (kullanici.getParolaHash() != null && !kullanici.getParolaHash().startsWith("$2a$")) {
            kullanici.setParolaHash(passwordEncoder.encode(kullanici.getParolaHash()));
        }
        
        // Oluşturma tarihi ekleme
        if (kullanici.getOlusturmaTarihi() == null) {
            kullanici.setOlusturmaTarihi(LocalDateTime.now());
        }
        
        return kullaniciRepository.save(kullanici);
    }
    
    public Kullanici update(Integer id, Kullanici kullaniciDetay) {
        Kullanici kullanici = findById(id);
        
        if (kullaniciDetay.getPersonel() != null) {
            kullanici.setPersonel(kullaniciDetay.getPersonel());
        }
        
        if (kullaniciDetay.getKullaniciAdi() != null) {
            kullanici.setKullaniciAdi(kullaniciDetay.getKullaniciAdi());
        }
        
        // Şifre güncelleme 
        if (kullaniciDetay.getParolaHash() != null && !kullaniciDetay.getParolaHash().startsWith("$2a$")) {
            kullanici.setParolaHash(passwordEncoder.encode(kullaniciDetay.getParolaHash()));
        }
        
        if (kullaniciDetay.getSalt() != null) {
            kullanici.setSalt(kullaniciDetay.getSalt());
        }
        
        if (kullaniciDetay.getSonGiris() != null) {
            kullanici.setSonGiris(kullaniciDetay.getSonGiris());
        }
        
        return kullaniciRepository.save(kullanici);
    }
    
    public void delete(Integer id) {
        Kullanici kullanici = findById(id);
        kullaniciRepository.delete(kullanici);
    }
    
    public Kullanici girisYap(String kullaniciAdi, String parola) {
        Kullanici kullanici = findByKullaniciAdi(kullaniciAdi)
                .orElseThrow(() -> new EntityNotFoundException("Kullanıcı bulunamadı: " + kullaniciAdi));
        
        if (passwordEncoder.matches(parola, kullanici.getParolaHash())) {
            kullanici.setSonGiris(LocalDateTime.now());
            return kullaniciRepository.save(kullanici);
        } else {
            throw new SecurityException("Hatalı şifre");
        }
    }
    
    public boolean validatePassword(Kullanici kullanici, String parola) {
        return passwordEncoder.matches(parola, kullanici.getParolaHash());
    }
    
    public Kullanici changePassword(Integer id, String eskiParola, String yeniParola) {
        Kullanici kullanici = findById(id);
        
        if (passwordEncoder.matches(eskiParola, kullanici.getParolaHash())) {
            kullanici.setParolaHash(passwordEncoder.encode(yeniParola));
            return kullaniciRepository.save(kullanici);
        } else {
            throw new SecurityException("Eski şifre hatalı");
        }
    }
} 