package com.hayvansaglik.yonetim.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "hayvan")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Hayvan {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hayvan_id")
    private Integer id;
    
    @ManyToOne
    @JoinColumn(name = "sahip_id", nullable = false)
    private Sahip sahip;
    
    @Column(name = "ad", nullable = false, length = 100)
    private String ad;
    
    @ManyToOne
    @JoinColumn(name = "tur_id", nullable = false)
    private Tur tur;
    
    @ManyToOne
    @JoinColumn(name = "irk_id", nullable = false)
    private Irk irk;
    
    @Column(name = "cinsiyet", length = 10)
    private String cinsiyet;
    
    @Column(name = "dogum_tarihi")
    private LocalDate dogumTarihi;
    
    @Column(name = "kilo", precision = 5, scale = 2)
    private BigDecimal kilo;
    
    @Column(name = "renk", length = 50)
    private String renk;
    
    @Column(name = "mikrocip_no", length = 50)
    private String mikrocipNo;
    
    @Column(name = "alerjiler")
    private String alerjiler;
    
    @Column(name = "kronik_hastaliklar")
    private String kronikHastaliklar;
    
    @OneToMany(mappedBy = "hayvan", cascade = CascadeType.ALL)
    private Set<HastalikGecmisi> hastalikGecmisleri = new HashSet<>();
    
    @OneToMany(mappedBy = "hayvan", cascade = CascadeType.ALL)
    private Set<Randevu> randevular = new HashSet<>();
    
    @OneToMany(mappedBy = "hayvan", cascade = CascadeType.ALL)
    private Set<LaboratuvarTesti> laboratuvarTestleri = new HashSet<>();
    
    @OneToMany(mappedBy = "hayvan", cascade = CascadeType.ALL)
    private Set<GoruntuInceleme> goruntuIncelemeler = new HashSet<>();
    
    @OneToMany(mappedBy = "hayvan")
    private Set<Dokuman> dokumanlar = new HashSet<>();
    
    @OneToMany(mappedBy = "hayvan", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<RaporTakvimi> raporTakvimleri = new HashSet<>();
    
    @OneToMany(mappedBy = "hayvan", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Asi> asilar = new HashSet<>();
} 