package com.hayvansaglik.yonetim.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "sahip")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Sahip {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sahip_id")
    private Integer id;
    
    @Column(name = "ad", nullable = false, length = 100)
    private String ad;
    
    @Column(name = "soyad", nullable = false, length = 100)
    private String soyad;
    
    @Column(name = "telefon1", length = 20)
    private String telefon1;
    
    @Column(name = "telefon2", length = 20)
    private String telefon2;
    
    @Column(name = "e_posta", length = 150)
    private String eposta; // Changed from ePosta to eposta to match the column name in SahipRepository
    
    @Column(name = "adres")
    private String adres;
    
    @Column(name = "tercih_edilen_iletisim", length = 20)
    private String tercihEdilenIletisim;
    
    @OneToMany(mappedBy = "sahip", cascade = CascadeType.ALL)
    private Set<Hayvan> hayvanlar = new HashSet<>();
    
    @OneToMany(mappedBy = "sahip", cascade = CascadeType.ALL)
    private Set<Fatura> faturalar = new HashSet<>();
    
    @OneToMany(mappedBy = "sahip")
    private Set<Dokuman> dokumanlar = new HashSet<>();
    
    @OneToMany(mappedBy = "sahip")
    private Set<IletisimLog> iletisimLoglari = new HashSet<>();
} 