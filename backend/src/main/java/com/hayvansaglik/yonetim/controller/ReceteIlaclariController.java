package com.hayvansaglik.yonetim.controller;

import com.hayvansaglik.yonetim.model.ReceteIlaclari;
import com.hayvansaglik.yonetim.repository.ReceteIlaclariRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recete-ilaclari")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ReceteIlaclariController {

    @Autowired
    private ReceteIlaclariRepository receteIlaclariRepository;

    @GetMapping("/recete/{receteId}")
    public ResponseEntity<List<ReceteIlaclari>> getReceteIlaclariByReceteId(@PathVariable Integer receteId) {
        List<ReceteIlaclari> receteIlaclari = receteIlaclariRepository.findByReceteId(receteId);
        return ResponseEntity.ok(receteIlaclari);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReceteIlaclari> getReceteIlaclariById(@PathVariable Integer id) {
        return receteIlaclariRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/ilac-adi")
    public ResponseEntity<List<ReceteIlaclari>> getReceteIlaclariByIlacAdi(@RequestParam String ilacAdi) {
        List<ReceteIlaclari> receteIlaclari = receteIlaclariRepository.findByIlacAdiContainingIgnoreCase(ilacAdi);
        return ResponseEntity.ok(receteIlaclari);
    }

    @PostMapping
    public ResponseEntity<ReceteIlaclari> createReceteIlaclari(@RequestBody ReceteIlaclari receteIlaclari) {
        ReceteIlaclari savedReceteIlac = receteIlaclariRepository.save(receteIlaclari);
        return ResponseEntity.ok(savedReceteIlac);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReceteIlaclari> updateReceteIlaclari(@PathVariable Integer id, @RequestBody ReceteIlaclari receteIlaclari) {
        return receteIlaclariRepository.findById(id)
                .map(existingReceteIlac -> {
                    receteIlaclari.setId(id);
                    ReceteIlaclari updatedReceteIlac = receteIlaclariRepository.save(receteIlaclari);
                    return ResponseEntity.ok(updatedReceteIlac);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReceteIlaclari(@PathVariable Integer id) {
        return receteIlaclariRepository.findById(id)
                .map(receteIlac -> {
                    receteIlaclariRepository.delete(receteIlac);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
} 