package com.hayvansaglik.yonetim.controller;

import com.hayvansaglik.yonetim.model.Asi;
import com.hayvansaglik.yonetim.model.Hayvan;
import com.hayvansaglik.yonetim.payload.request.AsiRequest;
import com.hayvansaglik.yonetim.payload.response.ApiResponse;
import com.hayvansaglik.yonetim.payload.response.AsiResponse;
import com.hayvansaglik.yonetim.service.AsiService;
import com.hayvansaglik.yonetim.service.HayvanService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/asi")
public class AsiController {
    
    private final AsiService asiService;
    private final HayvanService hayvanService;
    
    @Autowired
    public AsiController(AsiService asiService, HayvanService hayvanService) {
        this.asiService = asiService;
        this.hayvanService = hayvanService;
    }
    
    // Tüm aşıları getir
    @GetMapping
    public ResponseEntity<ApiResponse> getAllAsilar() {
        List<Asi> asilar = asiService.findAll();
        List<AsiResponse> responses = asilar.stream()
                .map(this::convertToAsiResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(new ApiResponse(true, "Aşılar başarıyla getirildi", responses));
    }
    
    // ID'ye göre aşı getir
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getAsiById(@PathVariable Integer id) {
        try {
            Asi asi = asiService.findById(id);
            AsiResponse response = convertToAsiResponse(asi);
            
            return ResponseEntity.ok(new ApiResponse(true, "Aşı başarıyla getirildi", response));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    // Hayvana göre aşıları getir
    @GetMapping("/hayvan/{hayvanId}")
    public ResponseEntity<ApiResponse> getAsilarByHayvan(@PathVariable Integer hayvanId) {
        try {
            Hayvan hayvan = hayvanService.findById(hayvanId);
            List<Asi> asilar = asiService.findByHayvan(hayvan);
            List<AsiResponse> responses = asilar.stream()
                    .map(this::convertToAsiResponse)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(new ApiResponse(true, "Aşılar başarıyla getirildi", responses));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    // Aşı adına göre ara
    @GetMapping("/search")
    public ResponseEntity<ApiResponse> searchAsiByAd(@RequestParam String asiAdi) {
        List<Asi> asilar = asiService.findByAsiAdi(asiAdi);
        List<AsiResponse> responses = asilar.stream()
                .map(this::convertToAsiResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(new ApiResponse(true, "Aşılar başarıyla getirildi", responses));
    }
    
    // Uygulama tarihi aralığına göre aşıları getir
    @GetMapping("/uygulama-tarihi")
    public ResponseEntity<ApiResponse> getAsilarByUygulamaTarihi(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate baslangicTarihi,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate bitisTarihi) {
        
        List<Asi> asilar = asiService.findByUygulamaTarihiBetween(baslangicTarihi, bitisTarihi);
        List<AsiResponse> responses = asilar.stream()
                .map(this::convertToAsiResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(new ApiResponse(true, "Aşılar başarıyla getirildi", responses));
    }
    
    // Sonraki uygulama tarihi aralığına göre aşıları getir
    @GetMapping("/sonraki-uygulama-tarihi")
    public ResponseEntity<ApiResponse> getAsilarBySonrakiUygulamaTarihi(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate baslangicTarihi,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate bitisTarihi) {
        
        List<Asi> asilar = asiService.findBySonrakiUygulamaTarihiBetween(baslangicTarihi, bitisTarihi);
        List<AsiResponse> responses = asilar.stream()
                .map(this::convertToAsiResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(new ApiResponse(true, "Aşılar başarıyla getirildi", responses));
    }
    
    // Zamanı gelmiş aşıları getir
    @GetMapping("/due")
    public ResponseEntity<ApiResponse> getDueVaccines() {
        List<Asi> asilar = asiService.findDueVaccines();
        List<AsiResponse> responses = asilar.stream()
                .map(this::convertToAsiResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(new ApiResponse(true, "Zamanı gelmiş aşılar başarıyla getirildi", responses));
    }
    
    // Yeni aşı oluştur
    @PostMapping
    public ResponseEntity<ApiResponse> createAsi(@Valid @RequestBody AsiRequest request) {
        try {
            Asi asi = convertToAsiEntity(request);
            Asi savedAsi = asiService.save(asi);
            
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse(true, "Aşı başarıyla oluşturuldu", 
                            convertToAsiResponse(savedAsi)));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    // Aşı güncelle
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateAsi(
            @PathVariable Integer id, 
            @Valid @RequestBody AsiRequest request) {
        try {
            Asi asiDetails = convertToAsiEntity(request);
            Asi updatedAsi = asiService.update(id, asiDetails);
            
            return ResponseEntity.ok(new ApiResponse(true, "Aşı başarıyla güncellendi", 
                    convertToAsiResponse(updatedAsi)));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    // Aşı sil
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteAsi(@PathVariable Integer id) {
        try {
            asiService.delete(id);
            return ResponseEntity.ok(new ApiResponse(true, "Aşı başarıyla silindi"));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    // Helper methods
    private AsiResponse convertToAsiResponse(Asi asi) {
        boolean zamanGeldi = false;
        if (asi.getSonrakiUygulamaTarihi() != null) {
            LocalDate today = LocalDate.now();
            zamanGeldi = !asi.getSonrakiUygulamaTarihi().isAfter(today);
        }
        
        return new AsiResponse(
                asi.getId(),
                asi.getHayvan().getId(),
                asi.getHayvan().getAd(),
                asi.getAsiAdi(),
                asi.getUygulamaTarihi(),
                asi.getSonrakiUygulamaTarihi(),
                asi.getDoz(),
                asi.getUygulayanVeteriner(),
                asi.getAciklama(),
                asi.getBatchNo(),
                zamanGeldi
        );
    }
    
    private Asi convertToAsiEntity(AsiRequest request) {
        Hayvan hayvan = hayvanService.findById(request.getHayvanId());
        
        Asi asi = new Asi();
        asi.setHayvan(hayvan);
        asi.setAsiAdi(request.getAsiAdi());
        asi.setUygulamaTarihi(request.getUygulamaTarihi());
        asi.setSonrakiUygulamaTarihi(request.getSonrakiUygulamaTarihi());
        asi.setDoz(request.getDoz());
        asi.setUygulayanVeteriner(request.getUygulayanVeteriner());
        asi.setAciklama(request.getAciklama());
        asi.setBatchNo(request.getBatchNo());
        
        return asi;
    }
} 