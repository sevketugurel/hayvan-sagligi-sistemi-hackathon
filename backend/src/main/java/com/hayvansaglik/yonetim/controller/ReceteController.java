package com.hayvansaglik.yonetim.controller;

import com.hayvansaglik.yonetim.model.KlinikInceleme;
import com.hayvansaglik.yonetim.model.Recete;
import com.hayvansaglik.yonetim.payload.request.ReceteRequest;
import com.hayvansaglik.yonetim.payload.response.ReceteResponse;
import com.hayvansaglik.yonetim.service.KlinikIncelemeService;
import com.hayvansaglik.yonetim.service.ReceteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/receteler")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ReceteController {
    
    private final ReceteService receteService;
    private final KlinikIncelemeService klinikIncelemeService;
    
    @Autowired
    public ReceteController(ReceteService receteService, KlinikIncelemeService klinikIncelemeService) {
        this.receteService = receteService;
        this.klinikIncelemeService = klinikIncelemeService;
    }
    
    @GetMapping
    public ResponseEntity<List<ReceteResponse>> tumReceteleriGetir() {
        List<ReceteResponse> receteResponseList = receteService.findAll()
                .stream()
                .map(this::mapToReceteResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(receteResponseList);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ReceteResponse> receteGetir(@PathVariable Integer id) {
        Recete recete = receteService.findById(id);
        return ResponseEntity.ok(mapToReceteResponse(recete));
    }
    
    @GetMapping("/klinik-inceleme/{klinikIncelemeId}")
    public ResponseEntity<List<ReceteResponse>> klinikIncelemeReceteleriniGetir(@PathVariable Integer klinikIncelemeId) {
        KlinikInceleme klinikInceleme = klinikIncelemeService.findById(klinikIncelemeId);
        List<ReceteResponse> receteResponseList = receteService.findByKlinikInceleme(klinikInceleme)
                .stream()
                .map(this::mapToReceteResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(receteResponseList);
    }
    
    @GetMapping("/ilac/{ilac}")
    public ResponseEntity<List<ReceteResponse>> ilacReceteleriniGetir(@PathVariable String ilac) {
        List<ReceteResponse> receteResponseList = receteService.findByIlac(ilac)
                .stream()
                .map(this::mapToReceteResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(receteResponseList);
    }
    
    @GetMapping("/doz/{doz}")
    public ResponseEntity<List<ReceteResponse>> dozReceteleriniGetir(@PathVariable String doz) {
        List<ReceteResponse> receteResponseList = receteService.findByDoz(doz)
                .stream()
                .map(this::mapToReceteResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(receteResponseList);
    }
    
    @PostMapping
    public ResponseEntity<ReceteResponse> receteOlustur(@Valid @RequestBody ReceteRequest receteRequest) {
        Recete recete = mapToRecete(receteRequest);
        Recete kaydedilmisRecete = receteService.save(recete);
        return new ResponseEntity<>(mapToReceteResponse(kaydedilmisRecete), HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ReceteResponse> receteGuncelle(@PathVariable Integer id, 
                                             @Valid @RequestBody ReceteRequest receteRequest) {
        KlinikInceleme klinikInceleme = klinikIncelemeService.findById(receteRequest.getKlinikIncelemeId());
        
        Recete recete = new Recete();
        recete.setKlinikInceleme(klinikInceleme);
        recete.setIlac(receteRequest.getIlac());
        recete.setDoz(receteRequest.getDoz());
        recete.setTalimatlar(receteRequest.getTalimatlar());
        
        Recete guncellenmisRecete = receteService.update(id, recete);
        return ResponseEntity.ok(mapToReceteResponse(guncellenmisRecete));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> receteSil(@PathVariable Integer id) {
        receteService.delete(id);
        return ResponseEntity.noContent().build();
    }
    
    // ReceteRequest'ten Recete nesnesine dönüştürme
    private Recete mapToRecete(ReceteRequest receteRequest) {
        KlinikInceleme klinikInceleme = klinikIncelemeService.findById(receteRequest.getKlinikIncelemeId());
        
        Recete recete = new Recete();
        recete.setKlinikInceleme(klinikInceleme);
        recete.setIlac(receteRequest.getIlac());
        recete.setDoz(receteRequest.getDoz());
        recete.setTalimatlar(receteRequest.getTalimatlar());
        
        return recete;
    }
    
    // Recete nesnesinden ReceteResponse nesnesine dönüştürme
    private ReceteResponse mapToReceteResponse(Recete recete) {
        ReceteResponse response = new ReceteResponse();
        
        response.setId(recete.getId());
        response.setKlinikIncelemeId(recete.getKlinikInceleme().getId());
        response.setRandevuId(recete.getKlinikInceleme().getRandevu().getId());
        response.setHayvanId(recete.getKlinikInceleme().getRandevu().getHayvan().getId());
        response.setHayvanAd(recete.getKlinikInceleme().getRandevu().getHayvan().getAd());
        response.setIlac(recete.getIlac());
        response.setDoz(recete.getDoz());
        response.setTalimatlar(recete.getTalimatlar());
        
        return response;
    }
} 