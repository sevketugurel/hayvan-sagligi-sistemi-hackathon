package com.hayvansaglik.yonetim.controller;

import com.hayvansaglik.yonetim.model.AlerjiKronikTedavi;
import com.hayvansaglik.yonetim.repository.AlerjiKronikTedaviRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alerji-kronik-tedavi")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AlerjiKronikTedaviController {

    @Autowired
    private AlerjiKronikTedaviRepository alerjiKronikTedaviRepository;

    @GetMapping("/alerji/{alerjiId}")
    public ResponseEntity<List<AlerjiKronikTedavi>> getAlerjiKronikTedaviByAlerjiId(@PathVariable Integer alerjiId) {
        List<AlerjiKronikTedavi> tedaviler = alerjiKronikTedaviRepository.findByAlerjiId(alerjiId);
        return ResponseEntity.ok(tedaviler);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlerjiKronikTedavi> getAlerjiKronikTedaviById(@PathVariable Integer id) {
        return alerjiKronikTedaviRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/tedavi")
    public ResponseEntity<List<AlerjiKronikTedavi>> getAlerjiKronikTedaviByTedavi(@RequestParam String tedavi) {
        List<AlerjiKronikTedavi> tedaviler = alerjiKronikTedaviRepository.findByTedaviContainingIgnoreCase(tedavi);
        return ResponseEntity.ok(tedaviler);
    }

    @PostMapping
    public ResponseEntity<AlerjiKronikTedavi> createAlerjiKronikTedavi(@RequestBody AlerjiKronikTedavi alerjiKronikTedavi) {
        AlerjiKronikTedavi savedTedavi = alerjiKronikTedaviRepository.save(alerjiKronikTedavi);
        return ResponseEntity.ok(savedTedavi);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AlerjiKronikTedavi> updateAlerjiKronikTedavi(@PathVariable Integer id, @RequestBody AlerjiKronikTedavi alerjiKronikTedavi) {
        return alerjiKronikTedaviRepository.findById(id)
                .map(existingTedavi -> {
                    alerjiKronikTedavi.setId(id);
                    AlerjiKronikTedavi updatedTedavi = alerjiKronikTedaviRepository.save(alerjiKronikTedavi);
                    return ResponseEntity.ok(updatedTedavi);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAlerjiKronikTedavi(@PathVariable Integer id) {
        return alerjiKronikTedaviRepository.findById(id)
                .map(tedavi -> {
                    alerjiKronikTedaviRepository.delete(tedavi);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
} 