package com.hayvansaglik.yonetim.controller;

import com.hayvansaglik.yonetim.model.LabTestleri;
import com.hayvansaglik.yonetim.repository.LabTestleriRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/lab-testleri")
@CrossOrigin(origins = "*", maxAge = 3600)
public class LabTestleriController {

    @Autowired
    private LabTestleriRepository labTestleriRepository;

    @GetMapping("/hayvan/{hayvanId}")
    public ResponseEntity<List<LabTestleri>> getLabTestleriByHayvanId(@PathVariable Integer hayvanId) {
        List<LabTestleri> testler = labTestleriRepository.findByHayvanId(hayvanId);
        return ResponseEntity.ok(testler);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LabTestleri> getLabTestleriById(@PathVariable Integer id) {
        return labTestleriRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/hayvan/{hayvanId}/tarih")
    public ResponseEntity<List<LabTestleri>> getLabTestleriByHayvanIdAndDateRange(
            @PathVariable Integer hayvanId,
            @RequestParam LocalDate baslangic,
            @RequestParam LocalDate bitis) {
        List<LabTestleri> testler = labTestleriRepository.findByHayvanIdAndTarihBetween(hayvanId, baslangic, bitis);
        return ResponseEntity.ok(testler);
    }

    @GetMapping("/test-adi")
    public ResponseEntity<List<LabTestleri>> getLabTestleriByTestAdi(@RequestParam String testAdi) {
        List<LabTestleri> testler = labTestleriRepository.findByTestAdiContainingIgnoreCase(testAdi);
        return ResponseEntity.ok(testler);
    }

    @PostMapping
    public ResponseEntity<LabTestleri> createLabTestleri(@RequestBody LabTestleri labTestleri) {
        LabTestleri savedTest = labTestleriRepository.save(labTestleri);
        return ResponseEntity.ok(savedTest);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LabTestleri> updateLabTestleri(@PathVariable Integer id, @RequestBody LabTestleri labTestleri) {
        return labTestleriRepository.findById(id)
                .map(existingTest -> {
                    labTestleri.setId(id);
                    LabTestleri updatedTest = labTestleriRepository.save(labTestleri);
                    return ResponseEntity.ok(updatedTest);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLabTestleri(@PathVariable Integer id) {
        return labTestleriRepository.findById(id)
                .map(test -> {
                    labTestleriRepository.delete(test);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
} 