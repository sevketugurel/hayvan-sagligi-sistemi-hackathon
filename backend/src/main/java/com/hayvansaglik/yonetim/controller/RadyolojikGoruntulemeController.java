package com.hayvansaglik.yonetim.controller;

import com.hayvansaglik.yonetim.model.RadyolojikGoruntuleme;
import com.hayvansaglik.yonetim.repository.RadyolojikGoruntulemeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/radyolojik-goruntuleme")
@CrossOrigin(origins = "*", maxAge = 3600)
public class RadyolojikGoruntulemeController {

    @Autowired
    private RadyolojikGoruntulemeRepository radyolojikGoruntulemeRepository;

    @GetMapping("/hayvan/{hayvanId}")
    public ResponseEntity<List<RadyolojikGoruntuleme>> getRadyolojikGoruntulemeByHayvanId(@PathVariable Integer hayvanId) {
        List<RadyolojikGoruntuleme> goruntulemeler = radyolojikGoruntulemeRepository.findByHayvanId(hayvanId);
        return ResponseEntity.ok(goruntulemeler);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RadyolojikGoruntuleme> getRadyolojikGoruntulemeById(@PathVariable Integer id) {
        return radyolojikGoruntulemeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/tipi/{tipi}")
    public ResponseEntity<List<RadyolojikGoruntuleme>> getRadyolojikGoruntulemeByTipi(@PathVariable String tipi) {
        List<RadyolojikGoruntuleme> goruntulemeler = radyolojikGoruntulemeRepository.findByTipi(tipi);
        return ResponseEntity.ok(goruntulemeler);
    }

    @PostMapping
    public ResponseEntity<RadyolojikGoruntuleme> createRadyolojikGoruntuleme(@RequestBody RadyolojikGoruntuleme radyolojikGoruntuleme) {
        RadyolojikGoruntuleme savedGoruntuleme = radyolojikGoruntulemeRepository.save(radyolojikGoruntuleme);
        return ResponseEntity.ok(savedGoruntuleme);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RadyolojikGoruntuleme> updateRadyolojikGoruntuleme(@PathVariable Integer id, @RequestBody RadyolojikGoruntuleme radyolojikGoruntuleme) {
        return radyolojikGoruntulemeRepository.findById(id)
                .map(existingGoruntuleme -> {
                    radyolojikGoruntuleme.setId(id);
                    RadyolojikGoruntuleme updatedGoruntuleme = radyolojikGoruntulemeRepository.save(radyolojikGoruntuleme);
                    return ResponseEntity.ok(updatedGoruntuleme);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRadyolojikGoruntuleme(@PathVariable Integer id) {
        return radyolojikGoruntulemeRepository.findById(id)
                .map(goruntuleme -> {
                    radyolojikGoruntulemeRepository.delete(goruntuleme);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
} 