package com.hayvansaglik.yonetim.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "personel")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Personel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "personel_id")
    private Integer id;
    
    @Column(name = "ad", length = 100)
    private String ad;
    
    @Column(name = "soyad", length = 100)
    private String soyad;
    
    @Column(name = "e_posta", length = 150)
    private String ePosta;
    
    @Column(name = "telefon", length = 20)
    private String telefon;
    
    @Column(name = "ise_baslama_tarihi")
    private LocalDate iseBaslamaTarihi;
    
    @Column(name = "aktif")
    private Boolean aktif = true;
    
    @OneToMany(mappedBy = "veteriner")
    private Set<Randevu> randevular = new HashSet<>();
    
    @OneToMany(mappedBy = "personel", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<PersonelRol> personelRoller = new HashSet<>();
    
    @OneToOne(mappedBy = "personel", cascade = CascadeType.ALL, orphanRemoval = true)
    private Kullanici kullanici;
} 