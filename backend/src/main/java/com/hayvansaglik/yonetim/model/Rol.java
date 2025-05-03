package com.hayvansaglik.yonetim.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "rol")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Rol {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rol_id")
    private Integer id;
    
    @Column(name = "ad", length = 50, nullable = false, unique = true)
    private String ad;
    
    @OneToMany(mappedBy = "rol", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<PersonelRol> personelRoller = new HashSet<>();
} 