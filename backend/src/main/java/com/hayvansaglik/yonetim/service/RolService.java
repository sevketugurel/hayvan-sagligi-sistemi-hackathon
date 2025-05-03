package com.hayvansaglik.yonetim.service;

import com.hayvansaglik.yonetim.model.Rol;
import com.hayvansaglik.yonetim.repository.RolRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RolService {
    
    private final RolRepository rolRepository;
    
    @Autowired
    public RolService(RolRepository rolRepository) {
        this.rolRepository = rolRepository;
    }
    
    public List<Rol> findAll() {
        return rolRepository.findAll();
    }
    
    public Rol findById(Integer id) {
        return rolRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Rol bulunamadı: " + id));
    }
    
    public Optional<Rol> findByAd(String ad) {
        return rolRepository.findByAd(ad);
    }
    
    public Rol save(Rol rol) {
        return rolRepository.save(rol);
    }
    
    public Rol update(Integer id, Rol rolDetay) {
        Rol rol = findById(id);
        
        if (rolDetay.getAd() != null) {
            rol.setAd(rolDetay.getAd());
        }
        
        return rolRepository.save(rol);
    }
    
    public void delete(Integer id) {
        Rol rol = findById(id);
        rolRepository.delete(rol);
    }
} 