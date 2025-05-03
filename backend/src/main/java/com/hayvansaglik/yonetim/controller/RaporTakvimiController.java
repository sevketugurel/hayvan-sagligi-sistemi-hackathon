package com.hayvansaglik.yonetim.controller;

import com.hayvansaglik.yonetim.model.Hayvan;
import com.hayvansaglik.yonetim.model.RaporTakvimi;
import com.hayvansaglik.yonetim.payload.request.RaporTakvimiRequest;
import com.hayvansaglik.yonetim.payload.response.ApiResponse;
import com.hayvansaglik.yonetim.payload.response.RaporTakvimiResponse;
import com.hayvansaglik.yonetim.service.HayvanService;
import com.hayvansaglik.yonetim.service.RaporTakvimiService;
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
@RequestMapping("/api/rapor-takvimi")
public class RaporTakvimiController {
    
    private final RaporTakvimiService raporTakvimiService;
    private final HayvanService hayvanService;
    
    @Autowired
    public RaporTakvimiController(RaporTakvimiService raporTakvimiService, HayvanService hayvanService) {
        this.raporTakvimiService = raporTakvimiService;
        this.hayvanService = hayvanService;
    }
    
    // Tüm rapor takvimlerini getir
    @GetMapping
    public ResponseEntity<ApiResponse> getAllRaporTakvimleri() {
        List<RaporTakvimi> raporTakvimleri = raporTakvimiService.findAll();
        List<RaporTakvimiResponse> responses = raporTakvimleri.stream()
                .map(this::convertToRaporTakvimiResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(new ApiResponse(true, "Rapor takvimleri başarıyla getirildi", responses));
    }
    
    // ID'ye göre rapor takvimi getir
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getRaporTakvimiById(@PathVariable Integer id) {
        try {
            RaporTakvimi raporTakvimi = raporTakvimiService.findById(id);
            RaporTakvimiResponse response = convertToRaporTakvimiResponse(raporTakvimi);
            
            return ResponseEntity.ok(new ApiResponse(true, "Rapor takvimi başarıyla getirildi", response));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    // Hayvana göre rapor takvimleri getir
    @GetMapping("/hayvan/{hayvanId}")
    public ResponseEntity<ApiResponse> getRaporTakvimleriByHayvan(@PathVariable Integer hayvanId) {
        try {
            Hayvan hayvan = hayvanService.findById(hayvanId);
            List<RaporTakvimi> raporTakvimleri = raporTakvimiService.findByHayvan(hayvan);
            List<RaporTakvimiResponse> responses = raporTakvimleri.stream()
                    .map(this::convertToRaporTakvimiResponse)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(new ApiResponse(true, "Rapor takvimleri başarıyla getirildi", responses));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    // Tarih aralığına göre rapor takvimleri getir
    @GetMapping("/tarih-aralik")
    public ResponseEntity<ApiResponse> getRaporTakvimleriByTarihAralik(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate baslangicTarihi,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate bitisTarihi) {
        
        List<RaporTakvimi> raporTakvimleri = raporTakvimiService.findByTarihBetween(baslangicTarihi, bitisTarihi);
        List<RaporTakvimiResponse> responses = raporTakvimleri.stream()
                .map(this::convertToRaporTakvimiResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(new ApiResponse(true, "Rapor takvimleri başarıyla getirildi", responses));
    }
    
    // Yeni rapor takvimi oluştur
    @PostMapping
    public ResponseEntity<ApiResponse> createRaporTakvimi(@Valid @RequestBody RaporTakvimiRequest request) {
        try {
            RaporTakvimi raporTakvimi = convertToRaporTakvimiEntity(request);
            RaporTakvimi savedRaporTakvimi = raporTakvimiService.save(raporTakvimi);
            
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse(true, "Rapor takvimi başarıyla oluşturuldu", 
                            convertToRaporTakvimiResponse(savedRaporTakvimi)));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    // Rapor takvimi güncelle
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateRaporTakvimi(
            @PathVariable Integer id, 
            @Valid @RequestBody RaporTakvimiRequest request) {
        try {
            RaporTakvimi raporTakvimiDetails = convertToRaporTakvimiEntity(request);
            RaporTakvimi updatedRaporTakvimi = raporTakvimiService.update(id, raporTakvimiDetails);
            
            return ResponseEntity.ok(new ApiResponse(true, "Rapor takvimi başarıyla güncellendi", 
                    convertToRaporTakvimiResponse(updatedRaporTakvimi)));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    // Rapor takvimi sil
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteRaporTakvimi(@PathVariable Integer id) {
        try {
            raporTakvimiService.delete(id);
            return ResponseEntity.ok(new ApiResponse(true, "Rapor takvimi başarıyla silindi"));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    // Tamamlama durumunu güncelle
    @PatchMapping("/{id}/tamamla")
    public ResponseEntity<ApiResponse> updateTamamlandiBilgisi(
            @PathVariable Integer id,
            @RequestParam boolean tamamlandi) {
        try {
            RaporTakvimi updatedRaporTakvimi = raporTakvimiService.updateTamamlandiBilgisi(id, tamamlandi);
            
            return ResponseEntity.ok(new ApiResponse(true, "Tamamlama durumu başarıyla güncellendi", 
                    convertToRaporTakvimiResponse(updatedRaporTakvimi)));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    // Helper methods
    private RaporTakvimiResponse convertToRaporTakvimiResponse(RaporTakvimi raporTakvimi) {
        return new RaporTakvimiResponse(
                raporTakvimi.getId(),
                raporTakvimi.getHayvan().getId(),
                raporTakvimi.getHayvan().getAd(),
                raporTakvimi.getRaporTipi(),
                raporTakvimi.getTarih(),
                raporTakvimi.getAciklama(),
                raporTakvimi.isTamamlandi()
        );
    }
    
    private RaporTakvimi convertToRaporTakvimiEntity(RaporTakvimiRequest request) {
        Hayvan hayvan = hayvanService.findById(request.getHayvanId());
        
        RaporTakvimi raporTakvimi = new RaporTakvimi();
        raporTakvimi.setHayvan(hayvan);
        raporTakvimi.setRaporTipi(request.getRaporTipi());
        raporTakvimi.setTarih(request.getTarih());
        raporTakvimi.setAciklama(request.getAciklama());
        raporTakvimi.setTamamlandi(request.isTamamlandi());
        
        return raporTakvimi;
    }
} 