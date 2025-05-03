package com.hayvansaglik.yonetim.controller;

import com.hayvansaglik.yonetim.model.Irk;
import com.hayvansaglik.yonetim.model.Tur;
import com.hayvansaglik.yonetim.payload.request.IrkRequest;
import com.hayvansaglik.yonetim.payload.response.ApiResponse;
import com.hayvansaglik.yonetim.payload.response.IrkResponse;
import com.hayvansaglik.yonetim.payload.response.TurResponse;
import com.hayvansaglik.yonetim.service.IrkService;
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
@RequestMapping("/api/irk")
public class IrkController {
    
    private final IrkService irkService;
    private final TurService turService;
    
    @Autowired
    public IrkController(IrkService irkService, TurService turService) {
        this.irkService = irkService;
        this.turService = turService;
    }
    
    // Tüm ırkları getir
    @GetMapping
    public ResponseEntity<ApiResponse> getAllIrklar() {
        List<Irk> irklar = irkService.findAll();
        List<IrkResponse> irkResponses = irklar.stream()
                .map(this::convertToIrkResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(new ApiResponse(true, "Irklar başarıyla getirildi", irkResponses));
    }
    
    // ID'ye göre ırk getir
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getIrkById(@PathVariable Integer id) {
        try {
            Irk irk = irkService.findById(id);
            IrkResponse irkResponse = convertToIrkResponse(irk);
            return ResponseEntity.ok(new ApiResponse(true, "Irk başarıyla getirildi", irkResponse));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    // Türe göre ırkları getir
    @GetMapping("/tur/{turId}")
    public ResponseEntity<ApiResponse> getIrksByTur(@PathVariable Integer turId) {
        try {
            Tur tur = turService.findById(turId);
            List<Irk> irklar = irkService.findByTur(tur);
            List<IrkResponse> irkResponses = irklar.stream()
                    .map(this::convertToIrkResponse)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(new ApiResponse(true, "Irklar başarıyla getirildi", irkResponses));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    // Yeni ırk oluştur
    @PostMapping
    public ResponseEntity<ApiResponse> createIrk(@Valid @RequestBody IrkRequest irkRequest) {
        try {
            Tur tur = turService.findById(irkRequest.getTurId());
            
            Irk irk = new Irk();
            irk.setIsim(irkRequest.getIsim());
            irk.setTur(tur);
            
            Irk savedIrk = irkService.save(irk);
            IrkResponse irkResponse = convertToIrkResponse(savedIrk);
            
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse(true, "Irk başarıyla oluşturuldu", irkResponse));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    // Irk güncelle
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateIrk(@PathVariable Integer id, 
                                               @Valid @RequestBody IrkRequest irkRequest) {
        try {
            Tur tur = turService.findById(irkRequest.getTurId());
            
            Irk irkDetails = new Irk();
            irkDetails.setIsim(irkRequest.getIsim());
            irkDetails.setTur(tur);
            
            Irk updatedIrk = irkService.update(id, irkDetails);
            IrkResponse irkResponse = convertToIrkResponse(updatedIrk);
            
            return ResponseEntity.ok(new ApiResponse(true, "Irk başarıyla güncellendi", irkResponse));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    // Irk sil
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteIrk(@PathVariable Integer id) {
        try {
            irkService.delete(id);
            return ResponseEntity.ok(new ApiResponse(true, "Irk başarıyla silindi"));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    // Helper method
    private IrkResponse convertToIrkResponse(Irk irk) {
        TurResponse turResponse = new TurResponse(
                irk.getTur().getId(),
                irk.getTur().getIsim()
        );
        
        return new IrkResponse(
                irk.getId(),
                irk.getIsim(),
                turResponse
        );
    }
} 