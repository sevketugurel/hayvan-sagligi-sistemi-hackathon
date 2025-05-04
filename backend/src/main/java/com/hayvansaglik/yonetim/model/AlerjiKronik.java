package com.hayvansaglik.yonetim.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "alerji_kronik")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlerjiKronik {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "alerji_id")
    private Integer id;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "hayvan_id", nullable = false)
    private Hayvan hayvan;
    
    @Column(name = "tipi", nullable = false, length = 50)
    private String tipi;
    
    @Column(name = "allerjen_veya_hastalik", nullable = false, length = 255)
    private String allerjenVeyaHastalik;
    
    @Column(name = "siddet", length = 50)
    private String siddet;
    
    @Column(name = "belirtiler", columnDefinition = "NVARCHAR(MAX)")
    private String belirtiler;
    
    @Column(name = "tani_tarihi")
    private LocalDate taniTarihi;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "teshis_koyan_id")
    private Personel teshisKoyan;
    
    @Column(name = "durum", length = 50)
    private String durum;
    
    @Column(name = "notlar", columnDefinition = "NVARCHAR(MAX)")
    private String notlar;
    
    @OneToMany(mappedBy = "alerji", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<AlerjiKronikTedavi> tedaviler = new HashSet<>();
} 