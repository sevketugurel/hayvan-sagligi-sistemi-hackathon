package com.hayvansaglik.yonetim.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "tur")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tur {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tur_id")
    private Integer id;
    
    @Column(name = "isim", nullable = false, length = 50)
    private String isim;
    
    @OneToMany(mappedBy = "tur", cascade = CascadeType.ALL)
    private Set<Irk> irklar = new HashSet<>();
    
    @OneToMany(mappedBy = "tur")
    private Set<Hayvan> hayvanlar = new HashSet<>();
} 