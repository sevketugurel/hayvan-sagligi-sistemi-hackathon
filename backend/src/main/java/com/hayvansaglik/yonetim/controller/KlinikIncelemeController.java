package com.hayvansaglik.yonetim.controller;

import com.hayvansaglik.yonetim.model.KlinikInceleme;
import com.hayvansaglik.yonetim.model.Randevu;
import com.hayvansaglik.yonetim.model.Recete;
import com.hayvansaglik.yonetim.payload.request.KlinikIncelemeRequest;
import com.hayvansaglik.yonetim.payload.response.KlinikIncelemeResponse;
import com.hayvansaglik.yonetim.service.KlinikIncelemeService;
import com.hayvansaglik.yonetim.service.RandevuService;
import com.hayvansaglik.yonetim.service.ReceteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/klinik-incelemeler")
@CrossOrigin(origins = "*", maxAge = 3600)
public class KlinikIncelemeController {
    
    private final KlinikIncelemeService klinikIncelemeService;
    private final RandevuService randevuService;
    private final ReceteService receteService;
    
    @Autowired
    public KlinikIncelemeController(KlinikIncelemeService klinikIncelemeService, 
                                   RandevuService randevuService, 
                                   ReceteService receteService) {
        this.klinikIncelemeService = klinikIncelemeService;
        this.randevuService = randevuService;
        this.receteService = receteService;
    }
    
    @GetMapping
    public ResponseEntity<List<KlinikIncelemeResponse>> tumKlinikIncelemeleriGetir() {
        List<KlinikIncelemeResponse> klinikIncelemeResponseList = klinikIncelemeService.findAll()
                .stream()
                .map(this::mapToKlinikIncelemeResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(klinikIncelemeResponseList);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<KlinikIncelemeResponse> klinikIncelemeGetir(@PathVariable Integer id) {
        KlinikInceleme klinikInceleme = klinikIncelemeService.findById(id);
        return ResponseEntity.ok(mapToKlinikIncelemeResponse(klinikInceleme));
    }
    
    @GetMapping("/randevu/{randevuId}")
    public ResponseEntity<KlinikIncelemeResponse> randevuKlinikIncelemeGetir(@PathVariable Integer randevuId) {
        Randevu randevu = randevuService.findById(randevuId);
        Optional<KlinikInceleme> klinikIncelemeOpt = klinikIncelemeService.findByRandevu(randevu);
        
        if (klinikIncelemeOpt.isPresent()) {
            return ResponseEntity.ok(mapToKlinikIncelemeResponse(klinikIncelemeOpt.get()));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/birincil-tani/{birincilTani}")
    public ResponseEntity<List<KlinikIncelemeResponse>> birincilTaniKlinikIncelemeleriGetir(@PathVariable String birincilTani) {
        List<KlinikIncelemeResponse> klinikIncelemeResponseList = klinikIncelemeService.findByBirincilTani(birincilTani)
                .stream()
                .map(this::mapToKlinikIncelemeResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(klinikIncelemeResponseList);
    }
    
    @GetMapping("/ikincil-tani/{ikincilTani}")
    public ResponseEntity<List<KlinikIncelemeResponse>> ikincilTaniKlinikIncelemeleriGetir(@PathVariable String ikincilTani) {
        List<KlinikIncelemeResponse> klinikIncelemeResponseList = klinikIncelemeService.findByIkincilTani(ikincilTani)
                .stream()
                .map(this::mapToKlinikIncelemeResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(klinikIncelemeResponseList);
    }
    
    @PostMapping
    public ResponseEntity<KlinikIncelemeResponse> klinikIncelemeOlustur(@Valid @RequestBody KlinikIncelemeRequest klinikIncelemeRequest) {
        KlinikInceleme klinikInceleme = mapToKlinikInceleme(klinikIncelemeRequest);
        KlinikInceleme kaydedilmisKlinikInceleme = klinikIncelemeService.save(klinikInceleme);
        return new ResponseEntity<>(mapToKlinikIncelemeResponse(kaydedilmisKlinikInceleme), HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<KlinikIncelemeResponse> klinikIncelemeGuncelle(@PathVariable Integer id, 
                                                         @Valid @RequestBody KlinikIncelemeRequest klinikIncelemeRequest) {
        Randevu randevu = randevuService.findById(klinikIncelemeRequest.getRandevuId());
        
        KlinikInceleme klinikInceleme = new KlinikInceleme();
        klinikInceleme.setRandevu(randevu);
        klinikInceleme.setSikayetler(klinikIncelemeRequest.getSikayetler());
        klinikInceleme.setAnamnez(klinikIncelemeRequest.getAnamnez());
        klinikInceleme.setBulgular(klinikIncelemeRequest.getBulgular());
        klinikInceleme.setBirincilTani(klinikIncelemeRequest.getBirincilTani());
        klinikInceleme.setIkincilTani(klinikIncelemeRequest.getIkincilTani());
        klinikInceleme.setIslemler(klinikIncelemeRequest.getIslemler());
        klinikInceleme.setNotlar(klinikIncelemeRequest.getNotlar());
        
        KlinikInceleme guncellenmisKlinikInceleme = klinikIncelemeService.update(id, klinikInceleme);
        return ResponseEntity.ok(mapToKlinikIncelemeResponse(guncellenmisKlinikInceleme));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> klinikIncelemeSil(@PathVariable Integer id) {
        klinikIncelemeService.delete(id);
        return ResponseEntity.noContent().build();
    }
    
    // KlinikIncelemeRequest'ten KlinikInceleme nesnesine dönüştürme
    private KlinikInceleme mapToKlinikInceleme(KlinikIncelemeRequest klinikIncelemeRequest) {
        Randevu randevu = randevuService.findById(klinikIncelemeRequest.getRandevuId());
        
        KlinikInceleme klinikInceleme = new KlinikInceleme();
        klinikInceleme.setRandevu(randevu);
        klinikInceleme.setSikayetler(klinikIncelemeRequest.getSikayetler());
        klinikInceleme.setAnamnez(klinikIncelemeRequest.getAnamnez());
        klinikInceleme.setBulgular(klinikIncelemeRequest.getBulgular());
        klinikInceleme.setBirincilTani(klinikIncelemeRequest.getBirincilTani());
        klinikInceleme.setIkincilTani(klinikIncelemeRequest.getIkincilTani());
        klinikInceleme.setIslemler(klinikIncelemeRequest.getIslemler());
        klinikInceleme.setNotlar(klinikIncelemeRequest.getNotlar());
        
        return klinikInceleme;
    }
    
    // KlinikInceleme nesnesinden KlinikIncelemeResponse nesnesine dönüştürme
    private KlinikIncelemeResponse mapToKlinikIncelemeResponse(KlinikInceleme klinikInceleme) {
        KlinikIncelemeResponse response = new KlinikIncelemeResponse();
        
        response.setId(klinikInceleme.getId());
        response.setRandevuId(klinikInceleme.getRandevu().getId());
        response.setHayvanId(klinikInceleme.getRandevu().getHayvan().getId());
        response.setHayvanAd(klinikInceleme.getRandevu().getHayvan().getAd());
        response.setVeterinerId(klinikInceleme.getRandevu().getVeteriner().getId());
        response.setVeterinerAdSoyad(klinikInceleme.getRandevu().getVeteriner().getAd() + " " + 
                                    klinikInceleme.getRandevu().getVeteriner().getSoyad());
        response.setSikayetler(klinikInceleme.getSikayetler());
        response.setAnamnez(klinikInceleme.getAnamnez());
        response.setBulgular(klinikInceleme.getBulgular());
        response.setBirincilTani(klinikInceleme.getBirincilTani());
        response.setIkincilTani(klinikInceleme.getIkincilTani());
        response.setIslemler(klinikInceleme.getIslemler());
        response.setNotlar(klinikInceleme.getNotlar());
        
        // İlgili reçeteleri al
        List<Recete> receteler = receteService.findByKlinikInceleme(klinikInceleme);
        response.setReceteSayisi(receteler.size());
        
        return response;
    }
} 