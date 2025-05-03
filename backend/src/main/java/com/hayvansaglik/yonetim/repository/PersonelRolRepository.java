package com.hayvansaglik.yonetim.repository;

import com.hayvansaglik.yonetim.model.Personel;
import com.hayvansaglik.yonetim.model.PersonelRol;
import com.hayvansaglik.yonetim.model.PersonelRolId;
import com.hayvansaglik.yonetim.model.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonelRolRepository extends JpaRepository<PersonelRol, PersonelRolId> {
    
    List<PersonelRol> findByPersonel(Personel personel);
    
    List<PersonelRol> findByRol(Rol rol);
    
    void deleteByPersonel(Personel personel);
    
    void deleteByRol(Rol rol);
} 