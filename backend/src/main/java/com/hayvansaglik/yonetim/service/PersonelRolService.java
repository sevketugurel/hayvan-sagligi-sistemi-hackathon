package com.hayvansaglik.yonetim.service;

import com.hayvansaglik.yonetim.model.Personel;
import com.hayvansaglik.yonetim.model.PersonelRol;
import com.hayvansaglik.yonetim.model.PersonelRolId;
import com.hayvansaglik.yonetim.model.Rol;
import com.hayvansaglik.yonetim.repository.PersonelRolRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonelRolService {
    
    private final PersonelRolRepository personelRolRepository;
    
    @Autowired
    public PersonelRolService(PersonelRolRepository personelRolRepository) {
        this.personelRolRepository = personelRolRepository;
    }
    
    public List<PersonelRol> findAll() {
        return personelRolRepository.findAll();
    }
    
    public PersonelRol findById(PersonelRolId id) {
        return personelRolRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Personel rol ilişkisi bulunamadı"));
    }
    
    public List<PersonelRol> findByPersonel(Personel personel) {
        return personelRolRepository.findByPersonel(personel);
    }
    
    public List<PersonelRol> findByRol(Rol rol) {
        return personelRolRepository.findByRol(rol);
    }
    
    public PersonelRol save(PersonelRol personelRol) {
        return personelRolRepository.save(personelRol);
    }
    
    public void delete(PersonelRolId id) {
        PersonelRol personelRol = findById(id);
        personelRolRepository.delete(personelRol);
    }
    
    public void deleteByPersonel(Personel personel) {
        personelRolRepository.deleteByPersonel(personel);
    }
    
    public void deleteByRol(Rol rol) {
        personelRolRepository.deleteByRol(rol);
    }
    
    public PersonelRol ataRol(Personel personel, Rol rol) {
        PersonelRolId personelRolId = new PersonelRolId(personel.getId(), rol.getId());
        PersonelRol personelRol = new PersonelRol(personelRolId, personel, rol);
        return personelRolRepository.save(personelRol);
    }
    
    public void kaldiRol(Personel personel, Rol rol) {
        PersonelRolId personelRolId = new PersonelRolId(personel.getId(), rol.getId());
        personelRolRepository.deleteById(personelRolId);
    }
} 