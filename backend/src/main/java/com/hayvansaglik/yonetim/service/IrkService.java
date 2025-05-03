package com.hayvansaglik.yonetim.service;

import com.hayvansaglik.yonetim.model.Irk;
import com.hayvansaglik.yonetim.model.Tur;
import com.hayvansaglik.yonetim.repository.IrkRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IrkService {
    
    private final IrkRepository irkRepository;
    
    @Autowired
    public IrkService(IrkRepository irkRepository) {
        this.irkRepository = irkRepository;
    }
    
    public List<Irk> findAll() {
        return irkRepository.findAll();
    }
    
    public Irk findById(Integer id) {
        return irkRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Irk bulunamadı: " + id));
    }
    
    public List<Irk> findByTur(Tur tur) {
        return irkRepository.findByTur(tur);
    }
    
    public Irk findByIsimAndTur(String isim, Tur tur) {
        return irkRepository.findByIsimAndTur(isim, tur)
                .orElseThrow(() -> new EntityNotFoundException("Irk bulunamadı: " + isim));
    }
    
    public Irk save(Irk irk) {
        return irkRepository.save(irk);
    }
    
    public Irk update(Integer id, Irk irkDetails) {
        Irk irk = findById(id);
        irk.setIsim(irkDetails.getIsim());
        if (irkDetails.getTur() != null) {
            irk.setTur(irkDetails.getTur());
        }
        return irkRepository.save(irk);
    }
    
    public void delete(Integer id) {
        Irk irk = findById(id);
        irkRepository.delete(irk);
    }
} 