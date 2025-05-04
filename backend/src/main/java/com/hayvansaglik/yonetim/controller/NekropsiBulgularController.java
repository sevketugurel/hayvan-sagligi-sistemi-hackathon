package com.hayvansaglik.yonetim.controller;

import com.hayvansaglik.yonetim.model.NekropsiBulgular;
import com.hayvansaglik.yonetim.repository.NekropsiBulgularRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/nekropsi-bulgular")
@CrossOrigin(origins = "*", maxAge = 3600)
public class NekropsiBulgularController {

    @Autowired
    private NekropsiBulgularRepository nekropsiBulgularRepository;

    @GetMapping("/hayvan/{hayvanId}")
    public ResponseEntity<List<NekropsiBulgular>> getNekropsiBulgularByHayvanId(@PathVariable Integer hayvanId) {
        List<NekropsiBulgular> bulgular = nekropsiBulgularRepository.findByHayvanId(hayvanId);
        return ResponseEntity.ok(bulgular);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NekropsiBulgular> getNekropsiBulgularById(@PathVariable Integer id) {
        return nekropsiBulgularRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/tarih")
    public ResponseEntity<List<NekropsiBulgular>> getNekropsiBulgularByTarihBetween(
            @RequestParam LocalDate baslangic,
            @RequestParam LocalDate bitis) {
        List<NekropsiBulgular> bulgular = nekropsiBulgularRepository.findByTarihBetween(baslangic, bitis);
        return ResponseEntity.ok(bulgular);
    }

    @GetMapping("/rapor-no/{raporNo}")
    public ResponseEntity<List<NekropsiBulgular>> getNekropsiBulgularByRaporNo(@PathVariable String raporNo) {
        List<NekropsiBulgular> bulgular = nekropsiBulgularRepository.findByRaporNo(raporNo);
        return ResponseEntity.ok(bulgular);
    }

    @GetMapping("/veteriner")
    public ResponseEntity<List<NekropsiBulgular>> getNekropsiBulgularByVeteriner(@RequestParam String veteriner) {
        List<NekropsiBulgular> bulgular = nekropsiBulgularRepository.findByVeterinerContainingIgnoreCase(veteriner);
        return ResponseEntity.ok(bulgular);
    }

    @GetMapping("/tur/{tur}")
    public ResponseEntity<List<NekropsiBulgular>> getNekropsiBulgularByTur(@PathVariable String tur) {
        List<NekropsiBulgular> bulgular = nekropsiBulgularRepository.findByTur(tur);
        return ResponseEntity.ok(bulgular);
    }

    @GetMapping("/irk/{irk}")
    public ResponseEntity<List<NekropsiBulgular>> getNekropsiBulgularByIrk(@PathVariable String irk) {
        List<NekropsiBulgular> bulgular = nekropsiBulgularRepository.findByIrk(irk);
        return ResponseEntity.ok(bulgular);
    }

    @GetMapping("/kimlik-no/{kimlikNo}")
    public ResponseEntity<List<NekropsiBulgular>> getNekropsiBulgularByKimlikNo(@PathVariable String kimlikNo) {
        List<NekropsiBulgular> bulgular = nekropsiBulgularRepository.findByKimlikNo(kimlikNo);
        return ResponseEntity.ok(bulgular);
    }

    @PostMapping
    public ResponseEntity<NekropsiBulgular> createNekropsiBulgular(@RequestBody NekropsiBulgular nekropsiBulgular) {
        NekropsiBulgular savedBulgu = nekropsiBulgularRepository.save(nekropsiBulgular);
        return ResponseEntity.ok(savedBulgu);
    }

    @PutMapping("/{id}")
    public ResponseEntity<NekropsiBulgular> updateNekropsiBulgular(@PathVariable Integer id, @RequestBody NekropsiBulgular nekropsiBulgular) {
        return nekropsiBulgularRepository.findById(id)
                .map(existingBulgu -> {
                    nekropsiBulgular.setId(id);
                    NekropsiBulgular updatedBulgu = nekropsiBulgularRepository.save(nekropsiBulgular);
                    return ResponseEntity.ok(updatedBulgu);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNekropsiBulgular(@PathVariable Integer id) {
        return nekropsiBulgularRepository.findById(id)
                .map(bulgu -> {
                    nekropsiBulgularRepository.delete(bulgu);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
} 