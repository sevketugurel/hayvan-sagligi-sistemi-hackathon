package com.hayvansaglik.yonetim.controller;

import com.hayvansaglik.yonetim.model.Hayvan;
import com.hayvansaglik.yonetim.model.KlinikInceleme;
import com.hayvansaglik.yonetim.model.Personel;
import com.hayvansaglik.yonetim.model.Randevu;
import com.hayvansaglik.yonetim.payload.request.RandevuRequest;
import com.hayvansaglik.yonetim.payload.response.RandevuResponse;
import com.hayvansaglik.yonetim.service.HayvanService;
import com.hayvansaglik.yonetim.service.KlinikIncelemeService;
import com.hayvansaglik.yonetim.service.PersonelService;
import com.hayvansaglik.yonetim.service.RandevuService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/randevular")
@CrossOrigin(origins = "*", maxAge = 3600)
public class RandevuController {
    
    private final RandevuService randevuService;
    private final HayvanService hayvanService;
    private final PersonelService personelService;
    private final KlinikIncelemeService klinikIncelemeService;
    
    @Autowired
    public RandevuController(RandevuService randevuService, HayvanService hayvanService, 
                            PersonelService personelService, KlinikIncelemeService klinikIncelemeService) {
        this.randevuService = randevuService;
        this.hayvanService = hayvanService;
        this.personelService = personelService;
        this.klinikIncelemeService = klinikIncelemeService;
    }
    
    @GetMapping
    public ResponseEntity<List<RandevuResponse>> tumRandevulariGetir() {
        List<RandevuResponse> randevuResponseList = randevuService.findAll()
                .stream()
                .map(this::mapToRandevuResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(randevuResponseList);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<RandevuResponse> randevuGetir(@PathVariable Integer id) {
        Randevu randevu = randevuService.findById(id);
        return ResponseEntity.ok(mapToRandevuResponse(randevu));
    }
    
    @GetMapping("/hayvan/{hayvanId}")
    public ResponseEntity<List<RandevuResponse>> hayvanRandevulariGetir(@PathVariable Integer hayvanId) {
        Hayvan hayvan = hayvanService.findById(hayvanId);
        List<RandevuResponse> randevuResponseList = randevuService.findByHayvan(hayvan)
                .stream()
                .map(this::mapToRandevuResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(randevuResponseList);
    }
    
    @GetMapping("/veteriner/{veterinerId}")
    public ResponseEntity<List<RandevuResponse>> veterinerRandevulariGetir(@PathVariable Integer veterinerId) {
        Personel veteriner = personelService.findById(veterinerId);
        List<RandevuResponse> randevuResponseList = randevuService.findByVeteriner(veteriner)
                .stream()
                .map(this::mapToRandevuResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(randevuResponseList);
    }
    
    @GetMapping("/durum/{durum}")
    public ResponseEntity<List<RandevuResponse>> durumRandevulariGetir(@PathVariable String durum) {
        List<RandevuResponse> randevuResponseList = randevuService.findByDurum(durum)
                .stream()
                .map(this::mapToRandevuResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(randevuResponseList);
    }
    
    @GetMapping("/tarih")
    public ResponseEntity<List<RandevuResponse>> tarihAraligindakiRandevulariGetir(
            @RequestParam LocalDateTime baslangic, 
            @RequestParam LocalDateTime bitis) {
        List<RandevuResponse> randevuResponseList = randevuService.findByTarihAraligi(baslangic, bitis)
                .stream()
                .map(this::mapToRandevuResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(randevuResponseList);
    }
    
    @PostMapping
    public ResponseEntity<RandevuResponse> randevuOlustur(@Valid @RequestBody RandevuRequest randevuRequest) {
        Randevu randevu = mapToRandevu(randevuRequest);
        Randevu kaydedilmisRandevu = randevuService.save(randevu);
        return new ResponseEntity<>(mapToRandevuResponse(kaydedilmisRandevu), HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<RandevuResponse> randevuGuncelle(@PathVariable Integer id, 
                                                @Valid @RequestBody RandevuRequest randevuRequest) {
        // Hayvan ve Personel nesnelerini al
        Hayvan hayvan = hayvanService.findById(randevuRequest.getHayvanId());
        Personel veteriner = personelService.findById(randevuRequest.getVeterinerId());
        
        // Güncellenecek randevu nesnesi
        Randevu randevu = new Randevu();
        randevu.setHayvan(hayvan);
        randevu.setVeteriner(veteriner);
        randevu.setRandevuZamani(randevuRequest.getRandevuZamani());
        randevu.setSureDk(randevuRequest.getSureDk());
        randevu.setTur(randevuRequest.getTur());
        randevu.setDurum(randevuRequest.getDurum());
        randevu.setIptalNotu(randevuRequest.getIptalNotu());
        
        Randevu guncellenmisRandevu = randevuService.update(id, randevu);
        return ResponseEntity.ok(mapToRandevuResponse(guncellenmisRandevu));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> randevuSil(@PathVariable Integer id) {
        randevuService.delete(id);
        return ResponseEntity.noContent().build();
    }
    
    @PutMapping("/{id}/iptal")
    public ResponseEntity<RandevuResponse> randevuIptalEt(@PathVariable Integer id, 
                                                @RequestParam(required = false) String iptalNotu) {
        Randevu iptalEdilenRandevu = randevuService.iptalEt(id, iptalNotu);
        return ResponseEntity.ok(mapToRandevuResponse(iptalEdilenRandevu));
    }
    
    @PutMapping("/{id}/onayla")
    public ResponseEntity<RandevuResponse> randevuOnayla(@PathVariable Integer id) {
        Randevu onaylananRandevu = randevuService.onayla(id);
        return ResponseEntity.ok(mapToRandevuResponse(onaylananRandevu));
    }
    
    // RandevuRequest'ten Randevu nesnesine dönüştürme
    private Randevu mapToRandevu(RandevuRequest randevuRequest) {
        try {
            Hayvan hayvan = hayvanService.findById(randevuRequest.getHayvanId());
            Personel veteriner = personelService.findById(randevuRequest.getVeterinerId());
            
            Randevu randevu = new Randevu();
            randevu.setHayvan(hayvan);
            randevu.setVeteriner(veteriner);
            randevu.setRandevuZamani(randevuRequest.getRandevuZamani());
            randevu.setSureDk(randevuRequest.getSureDk());
            randevu.setTur(randevuRequest.getTur());
            randevu.setDurum(randevuRequest.getDurum() != null ? randevuRequest.getDurum() : "BEKLEMEDE");
            randevu.setIptalNotu(randevuRequest.getIptalNotu());
            
            return randevu;
        } catch (EntityNotFoundException e) {
            throw new IllegalArgumentException("Geçersiz hayvan veya veteriner ID'si", e);
        }
    }
    
    // Randevu nesnesinden RandevuResponse nesnesine dönüştürme
    private RandevuResponse mapToRandevuResponse(Randevu randevu) {
        RandevuResponse response = new RandevuResponse();
        
        response.setId(randevu.getId());
        response.setHayvanId(randevu.getHayvan().getId());
        response.setHayvanAd(randevu.getHayvan().getAd());
        response.setVeterinerId(randevu.getVeteriner().getId());
        response.setVeterinerAdSoyad(randevu.getVeteriner().getAd() + " " + randevu.getVeteriner().getSoyad());
        response.setRandevuZamani(randevu.getRandevuZamani());
        response.setSureDk(randevu.getSureDk());
        response.setTur(randevu.getTur());
        response.setDurum(randevu.getDurum());
        response.setIptalNotu(randevu.getIptalNotu());
        
        // Klinik inceleme yapılmış mı kontrolü
        Optional<KlinikInceleme> klinikIncelemeOpt = klinikIncelemeService.findByRandevu(randevu);
        response.setKlinikIncelemeYapildi(klinikIncelemeOpt.isPresent());
        
        return response;
    }
} 