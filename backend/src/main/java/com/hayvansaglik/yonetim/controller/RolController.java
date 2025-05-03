package com.hayvansaglik.yonetim.controller;

import com.hayvansaglik.yonetim.model.Rol;
import com.hayvansaglik.yonetim.payload.request.RolRequest;
import com.hayvansaglik.yonetim.payload.response.RolResponse;
import com.hayvansaglik.yonetim.service.RolService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/roller")
@CrossOrigin(origins = "*", maxAge = 3600)
public class RolController {
    
    private final RolService rolService;
    
    @Autowired
    public RolController(RolService rolService) {
        this.rolService = rolService;
    }
    
    @GetMapping
    public ResponseEntity<List<RolResponse>> tumRolleriGetir() {
        List<RolResponse> rolResponseList = rolService.findAll()
                .stream()
                .map(this::mapToRolResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(rolResponseList);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<RolResponse> rolGetir(@PathVariable Integer id) {
        Rol rol = rolService.findById(id);
        return ResponseEntity.ok(mapToRolResponse(rol));
    }
    
    @GetMapping("/ad/{ad}")
    public ResponseEntity<RolResponse> adaGoreRolGetir(@PathVariable String ad) {
        return rolService.findByAd(ad)
                .map(rol -> ResponseEntity.ok(mapToRolResponse(rol)))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<RolResponse> rolOlustur(@Valid @RequestBody RolRequest rolRequest) {
        Rol rol = mapToRol(rolRequest);
        Rol kaydedilmisRol = rolService.save(rol);
        return new ResponseEntity<>(mapToRolResponse(kaydedilmisRol), HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<RolResponse> rolGuncelle(@PathVariable Integer id, 
                                      @Valid @RequestBody RolRequest rolRequest) {
        Rol rol = new Rol();
        rol.setAd(rolRequest.getAd());
        
        Rol guncellenmisRol = rolService.update(id, rol);
        return ResponseEntity.ok(mapToRolResponse(guncellenmisRol));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> rolSil(@PathVariable Integer id) {
        rolService.delete(id);
        return ResponseEntity.noContent().build();
    }
    
    // RolRequest'ten Rol nesnesine dönüştürme
    private Rol mapToRol(RolRequest rolRequest) {
        Rol rol = new Rol();
        rol.setAd(rolRequest.getAd());
        
        return rol;
    }
    
    // Rol nesnesinden RolResponse nesnesine dönüştürme
    private RolResponse mapToRolResponse(Rol rol) {
        RolResponse response = new RolResponse();
        
        response.setId(rol.getId());
        response.setAd(rol.getAd());
        
        return response;
    }
} 