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
@RequestMapping("/api/hayvan")
public class HayvanController {
    
    private final HayvanService hayvanService;
    private final SahipService sahipService;
    private final TurService turService;
    private final IrkService irkService;
    
    @Autowired
    public HayvanController(HayvanService hayvanService, SahipService sahipService, 
                          TurService turService, IrkService irkService) {
        this.hayvanService = hayvanService;
        this.sahipService = sahipService;
        this.turService = turService;
        this.irkService = irkService;
    }
    
    // Tüm hayvanları getir
    @GetMapping
    public ResponseEntity<ApiResponse> getAllHayvanlar() {
        List<Hayvan> hayvanlar = hayvanService.findAll();
        List<HayvanResponse> hayvanResponses = hayvanlar.stream()
                .map(this::convertToHayvanResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(new ApiResponse(true, "Hayvanlar başarıyla getirildi", hayvanResponses));
    }
    
    // ID'ye göre hayvan getir
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getHayvanById(@PathVariable Integer id) {
        try {
            Hayvan hayvan = hayvanService.findById(id);
            HayvanResponse hayvanResponse = convertToHayvanResponse(hayvan);
            
            return ResponseEntity.ok(new ApiResponse(true, "Hayvan başarıyla getirildi", hayvanResponse));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    // Sahibe göre hayvanları getir
    @GetMapping("/sahip/{sahipId}")
    public ResponseEntity<ApiResponse> getHayvanlarBySahip(@PathVariable Integer sahipId) {
        try {
            Sahip sahip = sahipService.findById(sahipId);
            List<Hayvan> hayvanlar = hayvanService.findBySahip(sahip);
            List<HayvanResponse> hayvanResponses = hayvanlar.stream()
                    .map(this::convertToHayvanResponse)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(new ApiResponse(true, "Hayvanlar başarıyla getirildi", hayvanResponses));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    // Ad'a göre hayvan ara
    @GetMapping("/search/ad")
    public ResponseEntity<ApiResponse> searchHayvanByAd(@RequestParam String ad) {
        List<Hayvan> hayvanlar = hayvanService.findByAd(ad);
        List<HayvanResponse> hayvanResponses = hayvanlar.stream()
                .map(this::convertToHayvanResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(new ApiResponse(true, "Hayvanlar başarıyla getirildi", hayvanResponses));
    }
    
    // Mikroçip numarasına göre hayvan ara
    @GetMapping("/search/mikrocip")
    public ResponseEntity<ApiResponse> searchHayvanByMikrocipNo(@RequestParam String mikrocipNo) {
        List<Hayvan> hayvanlar = hayvanService.findByMikrocipNo(mikrocipNo);
        List<HayvanResponse> hayvanResponses = hayvanlar.stream()
                .map(this::convertToHayvanResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(new ApiResponse(true, "Hayvanlar başarıyla getirildi", hayvanResponses));
    }
    
    // Tür'e göre hayvan ara
    @GetMapping("/search/tur/{turId}")
    public ResponseEntity<ApiResponse> searchHayvanByTur(@PathVariable Integer turId) {
        try {
            Tur tur = turService.findById(turId);
            List<Hayvan> hayvanlar = hayvanService.findByTur(tur);
            List<HayvanResponse> hayvanResponses = hayvanlar.stream()
                    .map(this::convertToHayvanResponse)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(new ApiResponse(true, "Hayvanlar başarıyla getirildi", hayvanResponses));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    // Irk'a göre hayvan ara
    @GetMapping("/search/irk/{irkId}")
    public ResponseEntity<ApiResponse> searchHayvanByIrk(@PathVariable Integer irkId) {
        try {
            Irk irk = irkService.findById(irkId);
            List<Hayvan> hayvanlar = hayvanService.findByIrk(irk);
            List<HayvanResponse> hayvanResponses = hayvanlar.stream()
                    .map(this::convertToHayvanResponse)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(new ApiResponse(true, "Hayvanlar başarıyla getirildi", hayvanResponses));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    // Yeni hayvan oluştur
    @PostMapping
    public ResponseEntity<ApiResponse> createHayvan(@Valid @RequestBody HayvanRequest hayvanRequest) {
        try {
            Hayvan hayvan = convertToHayvanEntity(hayvanRequest);
            Hayvan savedHayvan = hayvanService.save(hayvan);
            
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse(true, "Hayvan başarıyla oluşturuldu", 
                            convertToHayvanResponse(savedHayvan)));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    // Hayvan güncelle
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateHayvan(@PathVariable Integer id, 
                                                 @Valid @RequestBody HayvanRequest hayvanRequest) {
        try {
            Hayvan hayvanDetails = convertToHayvanEntity(hayvanRequest);
            Hayvan updatedHayvan = hayvanService.update(id, hayvanDetails);
            
            return ResponseEntity.ok(new ApiResponse(true, "Hayvan başarıyla güncellendi", 
                    convertToHayvanResponse(updatedHayvan)));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    // Hayvan sil
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteHayvan(@PathVariable Integer id) {
        try {
            hayvanService.delete(id);
            return ResponseEntity.ok(new ApiResponse(true, "Hayvan başarıyla silindi"));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    // Helper methods
    private HayvanResponse convertToHayvanResponse(Hayvan hayvan) {
        // Sahip bilgilerini dönüştür
        SahipResponse sahipResponse = new SahipResponse(
                hayvan.getSahip().getId(),
                hayvan.getSahip().getAd(),
                hayvan.getSahip().getSoyad(),
                hayvan.getSahip().getTelefon1(),
                hayvan.getSahip().getTelefon2(),
                hayvan.getSahip().getEPosta(),
                hayvan.getSahip().getAdres(),
                hayvan.getSahip().getTercihEdilenIletisim(),
                hayvan.getSahip().getHayvanlar() != null ? hayvan.getSahip().getHayvanlar().size() : 0
        );
        
        // Tür bilgilerini dönüştür
        TurResponse turResponse = new TurResponse(
                hayvan.getTur().getId(),
                hayvan.getTur().getIsim()
        );
        
        // Irk bilgilerini dönüştür
        IrkResponse irkResponse = new IrkResponse(
                hayvan.getIrk().getId(),
                hayvan.getIrk().getIsim(),
                turResponse
        );
        
        // Yaş hesapla
        Integer yasYil = null;
        Integer yasAy = null;
        if (hayvan.getDogumTarihi() != null) {
            Period period = Period.between(hayvan.getDogumTarihi(), LocalDate.now());
            yasYil = period.getYears();
            yasAy = period.getMonths();
        }
        
        return new HayvanResponse(
                hayvan.getId(),
                hayvan.getAd(),
                sahipResponse,
                turResponse,
                irkResponse,
                hayvan.getCinsiyet(),
                hayvan.getDogumTarihi(),
                hayvan.getKilo(),
                hayvan.getRenk(),
                hayvan.getMikrocipNo(),
                hayvan.getAlerjiler(),
                hayvan.getKronikHastaliklar(),
                yasYil,
                yasAy
        );
    }
    
    private Hayvan convertToHayvanEntity(HayvanRequest request) {
        Sahip sahip = sahipService.findById(request.getSahipId());
        Tur tur = turService.findById(request.getTurId());
        Irk irk = irkService.findById(request.getIrkId());
        
        Hayvan hayvan = new Hayvan();
        hayvan.setAd(request.getAd());
        hayvan.setSahip(sahip);
        hayvan.setTur(tur);
        hayvan.setIrk(irk);
        hayvan.setCinsiyet(request.getCinsiyet());
        hayvan.setDogumTarihi(request.getDogumTarihi());
        hayvan.setKilo(request.getKilo());
        hayvan.setRenk(request.getRenk());
        hayvan.setMikrocipNo(request.getMikrocipNo());
        hayvan.setAlerjiler(request.getAlerjiler());
        hayvan.setKronikHastaliklar(request.getKronikHastaliklar());
        
        return hayvan;
    }
} 