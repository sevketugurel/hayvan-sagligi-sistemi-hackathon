package com.hayvansaglik.yonetim.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "personel_rol")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonelRol {
    
    @EmbeddedId
    private PersonelRolId id;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("personelId")
    @JoinColumn(name = "personel_id")
    private Personel personel;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("rolId")
    @JoinColumn(name = "rol_id")
    private Rol rol;
} 