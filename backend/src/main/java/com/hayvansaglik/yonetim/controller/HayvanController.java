package com.hayvansaglik.yonetim.controller;

import com.hayvansaglik.yonetim.model.Hayvan;
import com.hayvansaglik.yonetim.model.Irk;
import com.hayvansaglik.yonetim.model.Sahip;
import com.hayvansaglik.yonetim.model.Tur;
import com.hayvansaglik.yonetim.payload.request.HayvanRequest;
import com.hayvansaglik.yonetim.payload.response.ApiResponse;
import com.hayvansaglik.yonetim.payload.response.HayvanResponse;
import com.hayvansaglik.yonetim.payload.response.IrkResponse;
import com.hayvansaglik.yonetim.payload.response.SahipResponse;
import com.hayvansaglik.yonetim.payload.response.TurResponse;
import com.hayvansaglik.yonetim.service.HayvanService;
import com.hayvansaglik.yonetim.service.IrkService;
import com.hayvansaglik.yonetim.service.SahipService;
import com.hayvansaglik.yonetim.service.TurService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/hayvanlar")
@CrossOrigin(origins = "*", maxAge = 3600)
public class HayvanController {
    
    private final HayvanService hayvanService;
    private final SahipService sahipService;
    private final TurService turService;
    private final IrkService irkService;
    
    @Autowired
    public HayvanController(HayvanService hayvanService, SahipService sahipService, TurService turService, IrkService irkService) {
        this.hayvanService = hayvanService;
        this.sahipService = sahipService;
        this.turService = turService;
        this.irkService = irkService;
    }
    
    @GetMapping
    public ResponseEntity<List<HayvanResponse>> tumHayvanlariGetir() {
        List<HayvanResponse> hayvanResponseList = hayvanService.findAll()
                .stream()
                .map(this::mapToHayvanResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(hayvanResponseList);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<HayvanResponse> hayvanGetir(@PathVariable Integer id) {
        Hayvan hayvan = hayvanService.findById(id);
        return ResponseEntity.ok(mapToHayvanResponse(hayvan));
    }
    
    @GetMapping("/sahip/{sahipId}")
    public ResponseEntity<List<HayvanResponse>> sahipHayvanlariniGetir(@PathVariable Integer sahipId) {
        Sahip sahip = sahipService.findById(sahipId);
        List<HayvanResponse> hayvanResponseList = hayvanService.findBySahip(sahip)
                .stream()
                .map(this::mapToHayvanResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(hayvanResponseList);
    }
    
    @GetMapping("/ara")
    public ResponseEntity<List<HayvanResponse>> hayvanAra(@RequestParam String ad) {
        List<HayvanResponse> hayvanResponseList = hayvanService.findByAd(ad)
                .stream()
                .map(this::mapToHayvanResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(hayvanResponseList);
    }
    
    @GetMapping("/tur/{turId}")
    public ResponseEntity<List<HayvanResponse>> tureGoreHayvanlariGetir(@PathVariable Integer turId) {
        Tur tur = turService.findById(turId);
        List<HayvanResponse> hayvanResponseList = hayvanService.findByTur(tur)
                .stream()
                .map(this::mapToHayvanResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(hayvanResponseList);
    }
    
    @GetMapping("/irk/{irkId}")
    public ResponseEntity<List<HayvanResponse>> irkaGoreHayvanlariGetir(@PathVariable Integer irkId) {
        Irk irk = irkService.findById(irkId);
        List<HayvanResponse> hayvanResponseList = hayvanService.findByIrk(irk)
                .stream()
                .map(this::mapToHayvanResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(hayvanResponseList);
    }
    
    @GetMapping("/mikrocip/{mikrocipNo}")
    public ResponseEntity<HayvanResponse> mikrocipleHayvanGetir(@PathVariable String mikrocipNo) {
        return hayvanService.findByMikrocipNo(mikrocipNo).stream()
                .findFirst()
                .map(hayvan -> ResponseEntity.ok(mapToHayvanResponse(hayvan)))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<HayvanResponse> hayvanOlustur(@Valid @RequestBody HayvanRequest hayvanRequest) {
        Hayvan hayvan = mapToHayvan(hayvanRequest);
        Hayvan kaydedilmisHayvan = hayvanService.save(hayvan);
        return new ResponseEntity<>(mapToHayvanResponse(kaydedilmisHayvan), HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<HayvanResponse> hayvanGuncelle(@PathVariable Integer id, 
                                             @Valid @RequestBody HayvanRequest hayvanRequest) {
        Sahip sahip = sahipService.findById(hayvanRequest.getSahipId());
        Tur tur = turService.findById(hayvanRequest.getTurId());
        Irk irk = irkService.findById(hayvanRequest.getIrkId());
        
        Hayvan hayvan = new Hayvan();
        hayvan.setSahip(sahip);
        hayvan.setAd(hayvanRequest.getAd());
        hayvan.setTur(tur);
        hayvan.setIrk(irk);
        hayvan.setCinsiyet(hayvanRequest.getCinsiyet());
        hayvan.setDogumTarihi(hayvanRequest.getDogumTarihi());
        hayvan.setKilo(hayvanRequest.getKilo());
        hayvan.setRenk(hayvanRequest.getRenk());
        hayvan.setMikrocipNo(hayvanRequest.getMikrocipNo());
        hayvan.setAlerjiler(hayvanRequest.getAlerjiler());
        hayvan.setKronikHastaliklar(hayvanRequest.getKronikHastaliklar());
        
        Hayvan guncellenmisHayvan = hayvanService.update(id, hayvan);
        return ResponseEntity.ok(mapToHayvanResponse(guncellenmisHayvan));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> hayvanSil(@PathVariable Integer id) {
        hayvanService.delete(id);
        return ResponseEntity.noContent().build();
    }
    
    // HayvanRequest'ten Hayvan nesnesine dönüştürme
    private Hayvan mapToHayvan(HayvanRequest hayvanRequest) {
        Sahip sahip = sahipService.findById(hayvanRequest.getSahipId());
        Tur tur = turService.findById(hayvanRequest.getTurId());
        Irk irk = irkService.findById(hayvanRequest.getIrkId());
        
        Hayvan hayvan = new Hayvan();
        hayvan.setSahip(sahip);
        hayvan.setAd(hayvanRequest.getAd());
        hayvan.setTur(tur);
        hayvan.setIrk(irk);
        hayvan.setCinsiyet(hayvanRequest.getCinsiyet());
        hayvan.setDogumTarihi(hayvanRequest.getDogumTarihi());
        hayvan.setKilo(hayvanRequest.getKilo());
        hayvan.setRenk(hayvanRequest.getRenk());
        hayvan.setMikrocipNo(hayvanRequest.getMikrocipNo());
        hayvan.setAlerjiler(hayvanRequest.getAlerjiler());
        hayvan.setKronikHastaliklar(hayvanRequest.getKronikHastaliklar());
        
        return hayvan;
    }
    
    // Hayvan nesnesinden HayvanResponse nesnesine dönüştürme
    private HayvanResponse mapToHayvanResponse(Hayvan hayvan) {
        HayvanResponse response = new HayvanResponse();
        
        response.setId(hayvan.getId());
        response.setSahipId(hayvan.getSahip().getId());
        response.setSahipAdSoyad(hayvan.getSahip().getAd() + " " + hayvan.getSahip().getSoyad());
        response.setAd(hayvan.getAd());
        response.setTurId(hayvan.getTur().getId());
        response.setTurAd(hayvan.getTur().getIsim());
        response.setIrkId(hayvan.getIrk().getId());
        response.setIrkAd(hayvan.getIrk().getIsim());
        response.setCinsiyet(hayvan.getCinsiyet());
        response.setDogumTarihi(hayvan.getDogumTarihi());
        response.setKilo(hayvan.getKilo());
        response.setRenk(hayvan.getRenk());
        response.setMikrocipNo(hayvan.getMikrocipNo());
        response.setAlerjiler(hayvan.getAlerjiler());
        response.setKronikHastaliklar(hayvan.getKronikHastaliklar());
        
        return response;
    }
} 