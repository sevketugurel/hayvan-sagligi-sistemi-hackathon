package com.hayvansaglik.yonetim.controller;

import com.hayvansaglik.yonetim.model.Notlar;
import com.hayvansaglik.yonetim.repository.NotlarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/notlar")
@CrossOrigin(origins = "*", maxAge = 3600)
public class NotlarController {

    @Autowired
    private NotlarRepository notlarRepository;

    @GetMapping("/hayvan/{hayvanId}")
    public ResponseEntity<List<Notlar>> getNotlarByHayvanId(@PathVariable Integer hayvanId) {
        List<Notlar> notlar = notlarRepository.findByHayvanId(hayvanId);
        return ResponseEntity.ok(notlar);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Notlar> getNotlarById(@PathVariable Integer id) {
        return notlarRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/tarih")
    public ResponseEntity<List<Notlar>> getNotlarByTarihBetween(
            @RequestParam LocalDate baslangic,
            @RequestParam LocalDate bitis) {
        List<Notlar> notlar = notlarRepository.findByTarihBetween(baslangic, bitis);
        return ResponseEntity.ok(notlar);
    }

    @GetMapping("/yazar")
    public ResponseEntity<List<Notlar>> getNotlarByYazar(@RequestParam String yazar) {
        List<Notlar> notlar = notlarRepository.findByYazarContainingIgnoreCase(yazar);
        return ResponseEntity.ok(notlar);
    }

    @GetMapping("/icerik")
    public ResponseEntity<List<Notlar>> getNotlarByIcerik(@RequestParam String icerik) {
        List<Notlar> notlar = notlarRepository.findByIcerikContainingIgnoreCase(icerik);
        return ResponseEntity.ok(notlar);
    }

    @GetMapping("/hayvan/{hayvanId}/tarih")
    public ResponseEntity<List<Notlar>> getNotlarByHayvanIdAndTarihBetween(
            @PathVariable Integer hayvanId,
            @RequestParam LocalDate baslangic,
            @RequestParam LocalDate bitis) {
        List<Notlar> notlar = notlarRepository.findByHayvanIdAndTarihBetween(hayvanId, baslangic, bitis);
        return ResponseEntity.ok(notlar);
    }

    @PostMapping
    public ResponseEntity<Notlar> createNotlar(@RequestBody Notlar notlar) {
        Notlar savedNotlar = notlarRepository.save(notlar);
        return ResponseEntity.ok(savedNotlar);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Notlar> updateNotlar(@PathVariable Integer id, @RequestBody Notlar notlar) {
        return notlarRepository.findById(id)
                .map(existingNotlar -> {
                    notlar.setId(id);
                    Notlar updatedNotlar = notlarRepository.save(notlar);
                    return ResponseEntity.ok(updatedNotlar);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotlar(@PathVariable Integer id) {
        return notlarRepository.findById(id)
                .map(notlar -> {
                    notlarRepository.delete(notlar);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
} 