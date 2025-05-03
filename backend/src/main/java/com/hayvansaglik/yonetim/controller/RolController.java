package com.hayvansaglik.yonetim.controller;

import com.hayvansaglik.yonetim.model.Rol;
import com.hayvansaglik.yonetim.payload.request.RolRequest;
import com.hayvansaglik.yonetim.payload.response.ApiResponse;
import com.hayvansaglik.yonetim.payload.response.RolResponse;
import com.hayvansaglik.yonetim.service.RolService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/rol")
public class RolController {
    
    private final RolService rolService;
    
    @Autowired
    public RolController(RolService rolService) {
        this.rolService = rolService;
    }
    
    // Tüm rolleri getir
    @GetMapping
    public ResponseEntity<ApiResponse> getAllRoller() {
        List<Rol> roller = rolService.findAll();
        List<RolResponse> rolResponses = roller.stream()
                .map(rol -> new RolResponse(rol.getId(), rol.getAd()))
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(new ApiResponse(true, "Roller başarıyla getirildi", rolResponses));
    }
    
    // ID'ye göre rol getir
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getRolById(@PathVariable Integer id) {
        try {
            Rol rol = rolService.findById(id);
            RolResponse rolResponse = new RolResponse(rol.getId(), rol.getAd());
            return ResponseEntity.ok(new ApiResponse(true, "Rol başarıyla getirildi", rolResponse));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    // Yeni rol oluştur
    @PostMapping
    public ResponseEntity<ApiResponse> createRol(@Valid @RequestBody RolRequest rolRequest) {
        Rol rol = new Rol();
        rol.setAd(rolRequest.getAd());
        
        Rol savedRol = rolService.save(rol);
        RolResponse rolResponse = new RolResponse(savedRol.getId(), savedRol.getAd());
        
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse(true, "Rol başarıyla oluşturuldu", rolResponse));
    }
    
    // Rol güncelle
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateRol(@PathVariable Integer id, 
                                                @Valid @RequestBody RolRequest rolRequest) {
        try {
            Rol rolDetails = new Rol();
            rolDetails.setAd(rolRequest.getAd());
            
            Rol updatedRol = rolService.update(id, rolDetails);
            RolResponse rolResponse = new RolResponse(updatedRol.getId(), updatedRol.getAd());
            
            return ResponseEntity.ok(new ApiResponse(true, "Rol başarıyla güncellendi", rolResponse));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    // Rol sil
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteRol(@PathVariable Integer id) {
        try {
            rolService.delete(id);
            return ResponseEntity.ok(new ApiResponse(true, "Rol başarıyla silindi"));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
} 