package com.hayvansaglik.yonetim.controller;

import com.hayvansaglik.yonetim.model.AlerjiKronik;
import com.hayvansaglik.yonetim.repository.AlerjiKronikRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/alerji-kronik")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AlerjiKronikController {

    @Autowired
    private AlerjiKronikRepository alerjiKronikRepository;

    @GetMapping("/hayvan/{hayvanId}")
    public ResponseEntity<List<AlerjiKronik>> getAlerjiKronikByHayvanId(@PathVariable Integer hayvanId) {
        List<AlerjiKronik> alerjiKronikler = alerjiKronikRepository.findByHayvanId(hayvanId);
        return ResponseEntity.ok(alerjiKronikler);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlerjiKronik> getAlerjiKronikById(@PathVariable Integer id) {
        return alerjiKronikRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/tipi/{tipi}")
    public ResponseEntity<List<AlerjiKronik>> getAlerjiKronikByTipi(@PathVariable String tipi) {
        List<AlerjiKronik> alerjiKronikler = alerjiKronikRepository.findByTipi(tipi);
        return ResponseEntity.ok(alerjiKronikler);
    }

    @GetMapping("/hayvan/{hayvanId}/tipi/{tipi}")
    public ResponseEntity<List<AlerjiKronik>> getAlerjiKronikByHayvanIdAndTipi(
            @PathVariable Integer hayvanId, 
            @PathVariable String tipi) {
        List<AlerjiKronik> alerjiKronikler = alerjiKronikRepository.findByHayvanIdAndTipi(hayvanId, tipi);
        return ResponseEntity.ok(alerjiKronikler);
    }

    @GetMapping("/allerjen-hastalik")
    public ResponseEntity<List<AlerjiKronik>> getAlerjiKronikByAllerjenVeyaHastalik(@RequestParam String arama) {
        List<AlerjiKronik> alerjiKronikler = alerjiKronikRepository.findByAllerjenVeyaHastalikContainingIgnoreCase(arama);
        return ResponseEntity.ok(alerjiKronikler);
    }

    @GetMapping("/tani-tarihi")
    public ResponseEntity<List<AlerjiKronik>> getAlerjiKronikByTaniTarihiBetween(
            @RequestParam LocalDate baslangic,
            @RequestParam LocalDate bitis) {
        List<AlerjiKronik> alerjiKronikler = alerjiKronikRepository.findByTaniTarihiBetween(baslangic, bitis);
        return ResponseEntity.ok(alerjiKronikler);
    }

    @GetMapping("/durum/{durum}")
    public ResponseEntity<List<AlerjiKronik>> getAlerjiKronikByDurum(@PathVariable String durum) {
        List<AlerjiKronik> alerjiKronikler = alerjiKronikRepository.findByDurum(durum);
        return ResponseEntity.ok(alerjiKronikler);
    }

    @PostMapping
    public ResponseEntity<AlerjiKronik> createAlerjiKronik(@RequestBody AlerjiKronik alerjiKronik) {
        AlerjiKronik savedAlerjiKronik = alerjiKronikRepository.save(alerjiKronik);
        return ResponseEntity.ok(savedAlerjiKronik);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AlerjiKronik> updateAlerjiKronik(@PathVariable Integer id, @RequestBody AlerjiKronik alerjiKronik) {
        return alerjiKronikRepository.findById(id)
                .map(existingAlerjiKronik -> {
                    alerjiKronik.setId(id);
                    AlerjiKronik updatedAlerjiKronik = alerjiKronikRepository.save(alerjiKronik);
                    return ResponseEntity.ok(updatedAlerjiKronik);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAlerjiKronik(@PathVariable Integer id) {
        return alerjiKronikRepository.findById(id)
                .map(alerjiKronik -> {
                    alerjiKronikRepository.delete(alerjiKronik);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
} 