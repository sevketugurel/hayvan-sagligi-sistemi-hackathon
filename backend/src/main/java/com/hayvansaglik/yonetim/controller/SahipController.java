package com.hayvansaglik.yonetim.controller;

import com.hayvansaglik.yonetim.model.Sahip;
import com.hayvansaglik.yonetim.payload.request.SahipRequest;
import com.hayvansaglik.yonetim.payload.response.ApiResponse;
import com.hayvansaglik.yonetim.payload.response.SahipResponse;
import com.hayvansaglik.yonetim.service.SahipService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/sahip")
public class SahipController {
    
    private final SahipService sahipService;
    
    @Autowired
    public SahipController(SahipService sahipService) {
        this.sahipService = sahipService;
    }
    
    // Tüm sahipleri getir
    @GetMapping
    public ResponseEntity<ApiResponse> getAllSahipler() {
        List<Sahip> sahipler = sahipService.findAll();
        List<SahipResponse> sahipResponses = sahipler.stream()
                .map(this::convertToSahipResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(new ApiResponse(true, "Sahipler başarıyla getirildi", sahipResponses));
    }
    
    // ID'ye göre sahip getir
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getSahipById(@PathVariable Integer id) {
        try {
            Sahip sahip = sahipService.findById(id);
            SahipResponse sahipResponse = convertToSahipResponse(sahip);
            
            return ResponseEntity.ok(new ApiResponse(true, "Sahip başarıyla getirildi", sahipResponse));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    // Ad, soyad veya telefona göre sahip ara
    @GetMapping("/search")
    public ResponseEntity<ApiResponse> searchSahipler(
            @RequestParam(required = false) String ad,
            @RequestParam(required = false) String soyad,
            @RequestParam(required = false) String telefon) {
        
        List<Sahip> sahipler;
        
        if (telefon != null && !telefon.isEmpty()) {
            sahipler = sahipService.findByTelefon(telefon);
        } else if (ad != null && !ad.isEmpty() && soyad != null && !soyad.isEmpty()) {
            sahipler = sahipService.findByAdAndSoyad(ad, soyad);
        } else if (ad != null && !ad.isEmpty()) {
            sahipler = sahipService.findByAd(ad);
        } else if (soyad != null && !soyad.isEmpty()) {
            sahipler = sahipService.findBySoyad(soyad);
        } else {
            return ResponseEntity.badRequest().body(
                    new ApiResponse(false, "En az bir arama kriteri belirtilmelidir: ad, soyad veya telefon"));
        }
        
        List<SahipResponse> sahipResponses = sahipler.stream()
                .map(this::convertToSahipResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(new ApiResponse(true, "Sahipler başarıyla getirildi", sahipResponses));
    }
    
    // Yeni sahip oluştur
    @PostMapping
    public ResponseEntity<ApiResponse> createSahip(@Valid @RequestBody SahipRequest sahipRequest) {
        Sahip sahip = convertToSahipEntity(sahipRequest);
        Sahip savedSahip = sahipService.save(sahip);
        
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse(true, "Sahip başarıyla oluşturuldu", 
                        convertToSahipResponse(savedSahip)));
    }
    
    // Sahip güncelle
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateSahip(@PathVariable Integer id, 
                                                @Valid @RequestBody SahipRequest sahipRequest) {
        try {
            Sahip sahipDetails = convertToSahipEntity(sahipRequest);
            Sahip updatedSahip = sahipService.update(id, sahipDetails);
            
            return ResponseEntity.ok(new ApiResponse(true, "Sahip başarıyla güncellendi", 
                    convertToSahipResponse(updatedSahip)));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    // Sahip sil
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteSahip(@PathVariable Integer id) {
        try {
            sahipService.delete(id);
            return ResponseEntity.ok(new ApiResponse(true, "Sahip başarıyla silindi"));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    // Helper methods
    private SahipResponse convertToSahipResponse(Sahip sahip) {
        return new SahipResponse(
                sahip.getId(),
                sahip.getAd(),
                sahip.getSoyad(),
                sahip.getTelefon1(),
                sahip.getTelefon2(),
                sahip.getEPosta(),
                sahip.getAdres(),
                sahip.getTercihEdilenIletisim(),
                sahip.getHayvanlar() != null ? sahip.getHayvanlar().size() : 0
        );
    }
    
    private Sahip convertToSahipEntity(SahipRequest request) {
        Sahip sahip = new Sahip();
        sahip.setAd(request.getAd());
        sahip.setSoyad(request.getSoyad());
        sahip.setTelefon1(request.getTelefon1());
        sahip.setTelefon2(request.getTelefon2());
        sahip.setEPosta(request.getEPosta());
        sahip.setAdres(request.getAdres());
        sahip.setTercihEdilenIletisim(request.getTercihEdilenIletisim());
        
        return sahip;
    }
} 