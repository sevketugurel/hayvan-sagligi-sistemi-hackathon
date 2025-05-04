package com.hayvansaglik.yonetim.controller;

import com.hayvansaglik.yonetim.model.LabTestDetaylari;
import com.hayvansaglik.yonetim.repository.LabTestDetaylariRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lab-test-detaylari")
@CrossOrigin(origins = "*", maxAge = 3600)
public class LabTestDetaylariController {

    @Autowired
    private LabTestDetaylariRepository labTestDetaylariRepository;

    @GetMapping("/test/{testId}")
    public ResponseEntity<List<LabTestDetaylari>> getLabTestDetaylariByTestId(@PathVariable Integer testId) {
        List<LabTestDetaylari> testDetaylari = labTestDetaylariRepository.findByLabTestiId(testId);
        return ResponseEntity.ok(testDetaylari);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LabTestDetaylari> getLabTestDetaylariById(@PathVariable Integer id) {
        return labTestDetaylariRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/parametre")
    public ResponseEntity<List<LabTestDetaylari>> getLabTestDetaylariByParametre(@RequestParam String parametre) {
        List<LabTestDetaylari> testDetaylari = labTestDetaylariRepository.findByParametreContainingIgnoreCase(parametre);
        return ResponseEntity.ok(testDetaylari);
    }

    @GetMapping("/durum/{durum}")
    public ResponseEntity<List<LabTestDetaylari>> getLabTestDetaylariByDurum(@PathVariable String durum) {
        List<LabTestDetaylari> testDetaylari = labTestDetaylariRepository.findByDurum(durum);
        return ResponseEntity.ok(testDetaylari);
    }

    @PostMapping
    public ResponseEntity<LabTestDetaylari> createLabTestDetaylari(@RequestBody LabTestDetaylari labTestDetaylari) {
        LabTestDetaylari savedTestDetay = labTestDetaylariRepository.save(labTestDetaylari);
        return ResponseEntity.ok(savedTestDetay);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LabTestDetaylari> updateLabTestDetaylari(@PathVariable Integer id, @RequestBody LabTestDetaylari labTestDetaylari) {
        return labTestDetaylariRepository.findById(id)
                .map(existingTestDetay -> {
                    labTestDetaylari.setId(id);
                    LabTestDetaylari updatedTestDetay = labTestDetaylariRepository.save(labTestDetaylari);
                    return ResponseEntity.ok(updatedTestDetay);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLabTestDetaylari(@PathVariable Integer id) {
        return labTestDetaylariRepository.findById(id)
                .map(testDetay -> {
                    labTestDetaylariRepository.delete(testDetay);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
} 