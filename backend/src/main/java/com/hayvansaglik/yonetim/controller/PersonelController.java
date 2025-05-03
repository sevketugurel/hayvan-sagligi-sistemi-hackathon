package com.hayvansaglik.yonetim.controller;

import com.hayvansaglik.yonetim.model.Personel;
import com.hayvansaglik.yonetim.model.PersonelRol;
import com.hayvansaglik.yonetim.model.Rol;
import com.hayvansaglik.yonetim.payload.request.PersonelRequest;
import com.hayvansaglik.yonetim.payload.response.ApiResponse;
import com.hayvansaglik.yonetim.payload.response.PersonelResponse;
import com.hayvansaglik.yonetim.payload.response.RolResponse;
import com.hayvansaglik.yonetim.service.PersonelRolService;
import com.hayvansaglik.yonetim.service.PersonelService;
import com.hayvansaglik.yonetim.service.RolService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/personeller")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PersonelController {
    
    private final PersonelService personelService;
    private final RolService rolService;
    private final PersonelRolService personelRolService;
    
    @Autowired
    public PersonelController(PersonelService personelService, RolService rolService, PersonelRolService personelRolService) {
        this.personelService = personelService;
        this.rolService = rolService;
        this.personelRolService = personelRolService;
    }
    
    @GetMapping
    public ResponseEntity<List<PersonelResponse>> tumPersonelleriGetir() {
        List<PersonelResponse> personelResponseList = personelService.findAll()
                .stream()
                .map(this::mapToPersonelResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(personelResponseList);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<PersonelResponse> personelGetir(@PathVariable Integer id) {
        Personel personel = personelService.findById(id);
        return ResponseEntity.ok(mapToPersonelResponse(personel));
    }
    
    @GetMapping("/ara")
    public ResponseEntity<List<PersonelResponse>> personelAra(@RequestParam String adSoyad) {
        List<PersonelResponse> personelResponseList = personelService.findByAdSoyad(adSoyad)
                .stream()
                .map(this::mapToPersonelResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(personelResponseList);
    }
    
    @GetMapping("/aktif/{aktif}")
    public ResponseEntity<List<PersonelResponse>> aktifPersonelleriGetir(@PathVariable boolean aktif) {
        List<PersonelResponse> personelResponseList = personelService.findByAktif(aktif)
                .stream()
                .map(this::mapToPersonelResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(personelResponseList);
    }
    
    @PostMapping
    public ResponseEntity<PersonelResponse> personelOlustur(@Valid @RequestBody PersonelRequest personelRequest) {
        Personel personel = mapToPersonel(personelRequest);
        Personel kaydedilmisPersonel = personelService.save(personel);
        
        // Roller atanıyorsa
        if (personelRequest.getRolIdleri() != null && !personelRequest.getRolIdleri().isEmpty()) {
            personelRequest.getRolIdleri().forEach(rolId -> {
                Rol rol = rolService.findById(rolId);
                personelRolService.ataRol(kaydedilmisPersonel, rol);
            });
        }
        
        return new ResponseEntity<>(mapToPersonelResponse(kaydedilmisPersonel), HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<PersonelResponse> personelGuncelle(@PathVariable Integer id, 
                                                @Valid @RequestBody PersonelRequest personelRequest) {
        Personel personel = new Personel();
        personel.setAd(personelRequest.getAd());
        personel.setSoyad(personelRequest.getSoyad());
        personel.setEPosta(personelRequest.getEPosta());
        personel.setTelefon(personelRequest.getTelefon());
        personel.setIseBaslamaTarihi(personelRequest.getIseBaslamaTarihi());
        personel.setAktif(personelRequest.getAktif());
        
        Personel guncellenmisPersonel = personelService.update(id, personel);
        
        // Roller güncelleniyorsa
        if (personelRequest.getRolIdleri() != null) {
            // Mevcut rolleri temizle
            personelRolService.deleteByPersonel(guncellenmisPersonel);
            
            // Yeni rolleri ata
            personelRequest.getRolIdleri().forEach(rolId -> {
                Rol rol = rolService.findById(rolId);
                personelRolService.ataRol(guncellenmisPersonel, rol);
            });
        }
        
        return ResponseEntity.ok(mapToPersonelResponse(guncellenmisPersonel));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> personelSil(@PathVariable Integer id) {
        personelService.delete(id);
        return ResponseEntity.noContent().build();
    }
    
    @PutMapping("/{id}/pasif-yap")
    public ResponseEntity<PersonelResponse> personelPasifYap(@PathVariable Integer id) {
        Personel pasifPersonel = personelService.pasifYap(id);
        return ResponseEntity.ok(mapToPersonelResponse(pasifPersonel));
    }
    
    @PutMapping("/{id}/aktif-yap")
    public ResponseEntity<PersonelResponse> personelAktifYap(@PathVariable Integer id) {
        Personel aktifPersonel = personelService.aktifYap(id);
        return ResponseEntity.ok(mapToPersonelResponse(aktifPersonel));
    }
    
    // PersonelRequest'ten Personel nesnesine dönüştürme
    private Personel mapToPersonel(PersonelRequest personelRequest) {
        Personel personel = new Personel();
        personel.setAd(personelRequest.getAd());
        personel.setSoyad(personelRequest.getSoyad());
        personel.setEPosta(personelRequest.getEPosta());
        personel.setTelefon(personelRequest.getTelefon());
        personel.setIseBaslamaTarihi(personelRequest.getIseBaslamaTarihi());
        personel.setAktif(personelRequest.getAktif() != null ? personelRequest.getAktif() : true);
        
        return personel;
    }
    
    // Personel nesnesinden PersonelResponse nesnesine dönüştürme
    private PersonelResponse mapToPersonelResponse(Personel personel) {
        PersonelResponse response = new PersonelResponse();
        
        response.setId(personel.getId());
        response.setAd(personel.getAd());
        response.setSoyad(personel.getSoyad());
        response.setEPosta(personel.getEPosta());
        response.setTelefon(personel.getTelefon());
        response.setIseBaslamaTarihi(personel.getIseBaslamaTarihi());
        response.setAktif(personel.getAktif());
        
        // Personelin rollerini al
        Set<Integer> rolIdleri = personelRolService.findByPersonel(personel)
                .stream()
                .map(pr -> pr.getRol().getId())
                .collect(Collectors.toSet());
        
        Set<String> rolAdlari = personelRolService.findByPersonel(personel)
                .stream()
                .map(pr -> pr.getRol().getAd())
                .collect(Collectors.toSet());
        
        response.setRolIdleri(rolIdleri);
        response.setRolAdlari(rolAdlari);
        
        return response;
    }
} 