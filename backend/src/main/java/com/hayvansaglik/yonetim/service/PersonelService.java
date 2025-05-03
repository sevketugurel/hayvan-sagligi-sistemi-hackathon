package com.hayvansaglik.yonetim.service;

import com.hayvansaglik.yonetim.model.Personel;
import com.hayvansaglik.yonetim.repository.PersonelRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class PersonelService {
    
    private final PersonelRepository personelRepository;
    
    @Autowired
    public PersonelService(PersonelRepository personelRepository) {
        this.personelRepository = personelRepository;
    }
    
    public List<Personel> findAll() {
        return personelRepository.findAll();
    }
    
    public Personel findById(Integer id) {
        return personelRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Personel bulunamadı: " + id));
    }
    
    public Optional<Personel> findByEPosta(String ePosta) {
        return personelRepository.findByePosta(ePosta);
    }
    
    public List<Personel> findByAdSoyad(String adSoyad) {
        return personelRepository.findByAdContainingIgnoreCaseOrSoyadContainingIgnoreCase(adSoyad, adSoyad);
    }
    
    public List<Personel> findByAktif(boolean aktif) {
        return personelRepository.findByAktif(aktif);
    }
    
    public List<Personel> findByIseBaslamaTarihiBetween(LocalDate baslangic, LocalDate bitis) {
        return personelRepository.findByIseBaslamaTarihiBetween(baslangic, bitis);
    }
    
    public Personel save(Personel personel) {
        return personelRepository.save(personel);
    }
    
    public Personel update(Integer id, Personel personelDetay) {
        Personel personel = findById(id);
        
        if (personelDetay.getAd() != null) {
            personel.setAd(personelDetay.getAd());
        }
        
        if (personelDetay.getSoyad() != null) {
            personel.setSoyad(personelDetay.getSoyad());
        }
        
        if (personelDetay.getEPosta() != null) {
            personel.setEPosta(personelDetay.getEPosta());
        }
        
        if (personelDetay.getTelefon() != null) {
            personel.setTelefon(personelDetay.getTelefon());
        }
        
        if (personelDetay.getIseBaslamaTarihi() != null) {
            personel.setIseBaslamaTarihi(personelDetay.getIseBaslamaTarihi());
        }
        
        if (personelDetay.getAktif() != null) {
            personel.setAktif(personelDetay.getAktif());
        }
        
        return personelRepository.save(personel);
    }
    
    public void delete(Integer id) {
        Personel personel = findById(id);
        personelRepository.delete(personel);
    }
    
    public Personel pasifYap(Integer id) {
        Personel personel = findById(id);
        personel.setAktif(false);
        return personelRepository.save(personel);
    }
    
    public Personel aktifYap(Integer id) {
        Personel personel = findById(id);
        personel.setAktif(true);
        return personelRepository.save(personel);
    }
} 