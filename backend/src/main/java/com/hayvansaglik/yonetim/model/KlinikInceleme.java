package com.hayvansaglik.yonetim.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
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
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "hayvan_id", nullable = false)
    private Hayvan hayvan;
    
    @Column(name = "tarih", nullable = false)
    private LocalDate tarih;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "veteriner_id", nullable = false)
    private Personel veteriner;
    
    @Column(name = "anamnez", columnDefinition = "NVARCHAR(MAX)")
    private String anamnez;
    
    @Column(name = "sikayetler", columnDefinition = "NVARCHAR(MAX)")
    private String sikayetler;
    
    @Column(name = "bulgular", columnDefinition = "NVARCHAR(MAX)")
    private String bulgular;
    
    @Column(name = "birincil_tani", length = 255)
    private String birincilTani;
    
    @Column(name = "ikincil_tani", length = 255)
    private String ikincilTani;
    
    @Column(name = "yapilan_islemler", columnDefinition = "NVARCHAR(MAX)")
    private String yapilanIslemler;
    
    // Option: Keep the existing relationship with Randevu if needed
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "randevu_id")
    private Randevu randevu;
    
    @OneToMany(mappedBy = "klinikInceleme", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Recete> receteler = new HashSet<>();
} 