package com.hayvansaglik.yonetim.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "recete")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Recete {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recete_id")
    private Integer id;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "hayvan_id", nullable = false)
    private Hayvan hayvan;
    
    @Column(name = "tarih", nullable = false)
    private LocalDate tarih;
    
    @Column(name = "sure", length = 100)
    private String sure;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "veteriner_id", nullable = false)
    private Personel veteriner;
    
    @Column(name = "veteriner_klinigi", length = 255)
    private String veterinerKlinigi;
    
    @Column(name = "ilac", length = 255)
    private String ilac;
    
    @Column(name = "doz", length = 255)
    private String doz;
    
    @Column(name = "talimatlar", columnDefinition = "NVARCHAR(MAX)")
    private String talimatlar;
    
    @OneToMany(mappedBy = "recete", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ReceteIlaclari> receteIlaclari = new HashSet<>();
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "klinik_inceleme_id", nullable = true)
    private KlinikInceleme klinikInceleme;
} 