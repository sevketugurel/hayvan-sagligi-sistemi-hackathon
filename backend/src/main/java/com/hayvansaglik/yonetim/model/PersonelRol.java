package com.hayvansaglik.yonetim.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "personel_rol")
@Getter
@Setter
@ToString(exclude = {"personel", "rol"})
@EqualsAndHashCode(of = {"id"})
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