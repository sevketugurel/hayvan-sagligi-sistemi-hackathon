package com.hayvansaglik.yonetim.controller;

import com.hayvansaglik.yonetim.model.Hatirlatma;
import com.hayvansaglik.yonetim.model.Randevu;
import com.hayvansaglik.yonetim.payload.request.HatirlatmaRequest;
import com.hayvansaglik.yonetim.payload.response.HatirlatmaResponse;
import com.hayvansaglik.yonetim.service.HatirlatmaService;
import com.hayvansaglik.yonetim.service.RandevuService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/hatirlatmalar")
@CrossOrigin(origins = "*", maxAge = 3600)
public class HatirlatmaController {
    
    private final HatirlatmaService hatirlatmaService;
    private final RandevuService randevuService;
    
    @Autowired
    public HatirlatmaController(HatirlatmaService hatirlatmaService, RandevuService randevuService) {
        this.hatirlatmaService = hatirlatmaService;
        this.randevuService = randevuService;
    }
    
    @GetMapping
    public ResponseEntity<List<HatirlatmaResponse>> tumHatirlatmalariGetir() {
        List<HatirlatmaResponse> hatirlatmaResponseList = hatirlatmaService.findAll()
                .stream()
                .map(this::mapToHatirlatmaResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(hatirlatmaResponseList);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<HatirlatmaResponse> hatirlatmaGetir(@PathVariable Integer id) {
        Hatirlatma hatirlatma = hatirlatmaService.findById(id);
        return ResponseEntity.ok(mapToHatirlatmaResponse(hatirlatma));
    }
    
    @GetMapping("/randevu/{randevuId}")
    public ResponseEntity<List<HatirlatmaResponse>> randevuHatirlatmalariniGetir(@PathVariable Integer randevuId) {
        Randevu randevu = randevuService.findById(randevuId);
        List<HatirlatmaResponse> hatirlatmaResponseList = hatirlatmaService.findByRandevu(randevu)
                .stream()
                .map(this::mapToHatirlatmaResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(hatirlatmaResponseList);
    }
    
    @GetMapping("/kanal/{kanal}")
    public ResponseEntity<List<HatirlatmaResponse>> kanalHatirlatmalariniGetir(@PathVariable String kanal) {
        List<HatirlatmaResponse> hatirlatmaResponseList = hatirlatmaService.findByKanal(kanal)
                .stream()
                .map(this::mapToHatirlatmaResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(hatirlatmaResponseList);
    }
    
    @GetMapping("/durum/{durum}")
    public ResponseEntity<List<HatirlatmaResponse>> durumHatirlatmalariniGetir(@PathVariable String durum) {
        List<HatirlatmaResponse> hatirlatmaResponseList = hatirlatmaService.findByDurum(durum)
                .stream()
                .map(this::mapToHatirlatmaResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(hatirlatmaResponseList);
    }
    
    @GetMapping("/gonderim-zamani")
    public ResponseEntity<List<HatirlatmaResponse>> zamanaGoreHatirlatmalariGetir(
            @RequestParam LocalDateTime baslangic, 
            @RequestParam LocalDateTime bitis) {
        List<HatirlatmaResponse> hatirlatmaResponseList = hatirlatmaService.findByGonderimZamaniBetween(baslangic, bitis)
                .stream()
                .map(this::mapToHatirlatmaResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(hatirlatmaResponseList);
    }
    
    @GetMapping("/bekleyen")
    public ResponseEntity<List<HatirlatmaResponse>> bekleyenHatirlatmalariGetir() {
        List<HatirlatmaResponse> hatirlatmaResponseList = hatirlatmaService.findByGonderilecekHatirlatmalar(LocalDateTime.now())
                .stream()
                .map(this::mapToHatirlatmaResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(hatirlatmaResponseList);
    }
    
    @PostMapping
    public ResponseEntity<HatirlatmaResponse> hatirlatmaOlustur(@Valid @RequestBody HatirlatmaRequest hatirlatmaRequest) {
        Hatirlatma hatirlatma = mapToHatirlatma(hatirlatmaRequest);
        Hatirlatma kaydedilmisHatirlatma = hatirlatmaService.save(hatirlatma);
        return new ResponseEntity<>(mapToHatirlatmaResponse(kaydedilmisHatirlatma), HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<HatirlatmaResponse> hatirlatmaGuncelle(@PathVariable Integer id, 
                                                    @Valid @RequestBody HatirlatmaRequest hatirlatmaRequest) {
        Randevu randevu = randevuService.findById(hatirlatmaRequest.getRandevuId());
        
        Hatirlatma hatirlatma = new Hatirlatma();
        hatirlatma.setRandevu(randevu);
        hatirlatma.setGonderimZamani(hatirlatmaRequest.getGonderimZamani());
        hatirlatma.setKanal(hatirlatmaRequest.getKanal());
        hatirlatma.setDurum(hatirlatmaRequest.getDurum());
        
        Hatirlatma guncellenmisHatirlatma = hatirlatmaService.update(id, hatirlatma);
        return ResponseEntity.ok(mapToHatirlatmaResponse(guncellenmisHatirlatma));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> hatirlatmaSil(@PathVariable Integer id) {
        hatirlatmaService.delete(id);
        return ResponseEntity.noContent().build();
    }
    
    @PutMapping("/{id}/gonderildi")
    public ResponseEntity<HatirlatmaResponse> hatirlatmaGonderildi(@PathVariable Integer id) {
        Hatirlatma gonderilmisHatirlatma = hatirlatmaService.gonderildi(id);
        return ResponseEntity.ok(mapToHatirlatmaResponse(gonderilmisHatirlatma));
    }
    
    @PutMapping("/{id}/iptal")
    public ResponseEntity<HatirlatmaResponse> hatirlatmaIptalEt(@PathVariable Integer id) {
        Hatirlatma iptalEdilenHatirlatma = hatirlatmaService.iptalEt(id);
        return ResponseEntity.ok(mapToHatirlatmaResponse(iptalEdilenHatirlatma));
    }
    
    // HatirlatmaRequest'ten Hatirlatma nesnesine dönüştürme
    private Hatirlatma mapToHatirlatma(HatirlatmaRequest hatirlatmaRequest) {
        Randevu randevu = randevuService.findById(hatirlatmaRequest.getRandevuId());
        
        Hatirlatma hatirlatma = new Hatirlatma();
        hatirlatma.setRandevu(randevu);
        hatirlatma.setGonderimZamani(hatirlatmaRequest.getGonderimZamani());
        hatirlatma.setKanal(hatirlatmaRequest.getKanal());
        hatirlatma.setDurum(hatirlatmaRequest.getDurum() != null ? hatirlatmaRequest.getDurum() : "BEKLEMEDE");
        
        return hatirlatma;
    }
    
    // Hatirlatma nesnesinden HatirlatmaResponse nesnesine dönüştürme
    private HatirlatmaResponse mapToHatirlatmaResponse(Hatirlatma hatirlatma) {
        HatirlatmaResponse response = new HatirlatmaResponse();
        
        response.setId(hatirlatma.getId());
        response.setRandevuId(hatirlatma.getRandevu().getId());
        response.setRandevuZamani(hatirlatma.getRandevu().getRandevuZamani());
        response.setHayvanAd(hatirlatma.getRandevu().getHayvan().getAd());
        
        // Sahip bilgilerini al
        if (hatirlatma.getRandevu().getHayvan().getSahip() != null) {
            response.setSahipAd(hatirlatma.getRandevu().getHayvan().getSahip().getAd() + " " + 
                              hatirlatma.getRandevu().getHayvan().getSahip().getSoyad());
            response.setSahipIletisim(hatirlatma.getRandevu().getHayvan().getSahip().getTelefon1());
        }
        
        response.setGonderimZamani(hatirlatma.getGonderimZamani());
        response.setKanal(hatirlatma.getKanal());
        response.setDurum(hatirlatma.getDurum());
        
        return response;
    }
} 