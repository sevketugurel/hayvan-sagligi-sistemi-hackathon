package com.hayvansaglik.yonetim.controller;

import com.hayvansaglik.yonetim.model.PatolojikBulgular;
import com.hayvansaglik.yonetim.repository.PatolojikBulgularRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/patolojik-bulgular")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PatolojikBulgularController {

    @Autowired
    private PatolojikBulgularRepository patolojikBulgularRepository;

    @GetMapping("/hayvan/{hayvanId}")
    public ResponseEntity<List<PatolojikBulgular>> getPatolojikBulgularByHayvanId(@PathVariable Integer hayvanId) {
        List<PatolojikBulgular> bulgular = patolojikBulgularRepository.findByHayvanId(hayvanId);
        return ResponseEntity.ok(bulgular);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PatolojikBulgular> getPatolojikBulgularById(@PathVariable Integer id) {
        return patolojikBulgularRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/tarih")
    public ResponseEntity<List<PatolojikBulgular>> getPatolojikBulgularByTarihBetween(
            @RequestParam LocalDate baslangic,
            @RequestParam LocalDate bitis) {
        List<PatolojikBulgular> bulgular = patolojikBulgularRepository.findByTarihBetween(baslangic, bitis);
        return ResponseEntity.ok(bulgular);
    }

    @GetMapping("/rapor-no/{raporNo}")
    public ResponseEntity<List<PatolojikBulgular>> getPatolojikBulgularByRaporNo(@PathVariable String raporNo) {
        List<PatolojikBulgular> bulgular = patolojikBulgularRepository.findByRaporNo(raporNo);
        return ResponseEntity.ok(bulgular);
    }

    @GetMapping("/ornek-tipi")
    public ResponseEntity<List<PatolojikBulgular>> getPatolojikBulgularByOrnekTipi(@RequestParam String ornekTipi) {
        List<PatolojikBulgular> bulgular = patolojikBulgularRepository.findByOrnekTipiContainingIgnoreCase(ornekTipi);
        return ResponseEntity.ok(bulgular);
    }

    @GetMapping("/tani")
    public ResponseEntity<List<PatolojikBulgular>> getPatolojikBulgularByTani(@RequestParam String tani) {
        List<PatolojikBulgular> bulgular = patolojikBulgularRepository.findByTaniContainingIgnoreCase(tani);
        return ResponseEntity.ok(bulgular);
    }

    @GetMapping("/derece/{derece}")
    public ResponseEntity<List<PatolojikBulgular>> getPatolojikBulgularByDerece(@PathVariable String derece) {
        List<PatolojikBulgular> bulgular = patolojikBulgularRepository.findByDerece(derece);
        return ResponseEntity.ok(bulgular);
    }

    @PostMapping
    public ResponseEntity<PatolojikBulgular> createPatolojikBulgular(@RequestBody PatolojikBulgular patolojikBulgular) {
        PatolojikBulgular savedBulgu = patolojikBulgularRepository.save(patolojikBulgular);
        return ResponseEntity.ok(savedBulgu);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PatolojikBulgular> updatePatolojikBulgular(@PathVariable Integer id, @RequestBody PatolojikBulgular patolojikBulgular) {
        return patolojikBulgularRepository.findById(id)
                .map(existingBulgu -> {
                    patolojikBulgular.setId(id);
                    PatolojikBulgular updatedBulgu = patolojikBulgularRepository.save(patolojikBulgular);
                    return ResponseEntity.ok(updatedBulgu);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatolojikBulgular(@PathVariable Integer id) {
        return patolojikBulgularRepository.findById(id)
                .map(bulgu -> {
                    patolojikBulgularRepository.delete(bulgu);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
} 