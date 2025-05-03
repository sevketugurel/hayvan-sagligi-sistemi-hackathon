package com.hayvansaglik.yonetim.controller;

import com.hayvansaglik.yonetim.model.Tur;
import com.hayvansaglik.yonetim.payload.request.TurRequest;
import com.hayvansaglik.yonetim.payload.response.ApiResponse;
import com.hayvansaglik.yonetim.payload.response.TurResponse;
import com.hayvansaglik.yonetim.service.TurService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tur")
public class TurController {
    
    private final TurService turService;
    
    @Autowired
    public TurController(TurService turService) {
        this.turService = turService;
    }
    
    // Tüm türleri getir
    @GetMapping
    public ResponseEntity<ApiResponse> getAllTurler() {
        List<Tur> turler = turService.findAll();
        List<TurResponse> turResponses = turler.stream()
                .map(tur -> new TurResponse(tur.getId(), tur.getIsim()))
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(new ApiResponse(true, "Türler başarıyla getirildi", turResponses));
    }
    
    // ID'ye göre tür getir
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getTurById(@PathVariable Integer id) {
        try {
            Tur tur = turService.findById(id);
            TurResponse turResponse = new TurResponse(tur.getId(), tur.getIsim());
            return ResponseEntity.ok(new ApiResponse(true, "Tür başarıyla getirildi", turResponse));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    // İsime göre tür getir
    @GetMapping("/isim/{isim}")
    public ResponseEntity<ApiResponse> getTurByIsim(@PathVariable String isim) {
        try {
            Tur tur = turService.findByIsim(isim);
            TurResponse turResponse = new TurResponse(tur.getId(), tur.getIsim());
            return ResponseEntity.ok(new ApiResponse(true, "Tür başarıyla getirildi", turResponse));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    // Yeni tür oluştur
    @PostMapping
    public ResponseEntity<ApiResponse> createTur(@Valid @RequestBody TurRequest turRequest) {
        Tur tur = new Tur();
        tur.setIsim(turRequest.getIsim());
        
        Tur savedTur = turService.save(tur);
        TurResponse turResponse = new TurResponse(savedTur.getId(), savedTur.getIsim());
        
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse(true, "Tür başarıyla oluşturuldu", turResponse));
    }
    
    // Tür güncelle
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateTur(@PathVariable Integer id, 
                                               @Valid @RequestBody TurRequest turRequest) {
        try {
            Tur turDetails = new Tur();
            turDetails.setIsim(turRequest.getIsim());
            
            Tur updatedTur = turService.update(id, turDetails);
            TurResponse turResponse = new TurResponse(updatedTur.getId(), updatedTur.getIsim());
            
            return ResponseEntity.ok(new ApiResponse(true, "Tür başarıyla güncellendi", turResponse));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    // Tür sil
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteTur(@PathVariable Integer id) {
        try {
            turService.delete(id);
            return ResponseEntity.ok(new ApiResponse(true, "Tür başarıyla silindi"));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
} 