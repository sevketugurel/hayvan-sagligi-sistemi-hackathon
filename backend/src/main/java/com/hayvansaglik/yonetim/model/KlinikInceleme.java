package com.hayvansaglik.yonetim.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "klinik_inceleme")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class KlinikInceleme {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "inceleme_id")
    private Integer id;
    
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "randevu_id", nullable = false)
    private Randevu randevu;
    
    @Column(name = "sikayetler")
    private String sikayetler;
    
    @Column(name = "anamnez")
    private String anamnez;
    
    @Column(name = "bulgular")
    private String bulgular;
    
    @Column(name = "birincil_tani", length = 100)
    private String birincilTani;
    
    @Column(name = "ikincil_tani", length = 100)
    private String ikincilTani;
    
    @Column(name = "islemler")
    private String islemler;
    
    @Column(name = "notlar")
    private String notlar;
    
    @OneToMany(mappedBy = "klinikInceleme", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Recete> receteler = new HashSet<>();
} 