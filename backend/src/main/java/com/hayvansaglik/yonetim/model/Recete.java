package com.hayvansaglik.yonetim.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "receteler")
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
    
    @Column(name = "sure", length = 50)
    private String sure;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "veteriner_id", nullable = false)
    private Personel veteriner;
    
    @Column(name = "veteriner_klinigi", nullable = false, length = 255)
    private String veterinerKlinigi;
    
    @OneToMany(mappedBy = "recete", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ReceteIlaclari> receteIlaclari = new HashSet<>();
    
    // Optional: Keep the existing relationship with KlinikInceleme if needed
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "inceleme_id")
    private KlinikInceleme klinikInceleme;
} 