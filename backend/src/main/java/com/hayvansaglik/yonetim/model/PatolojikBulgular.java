package com.hayvansaglik.yonetim.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "patolojik_bulgular")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatolojikBulgular {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "patoloji_id")
    private Integer id;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "hayvan_id", nullable = false)
    private Hayvan hayvan;
    
    @Column(name = "rapor_no", length = 50)
    private String raporNo;
    
    @Column(name = "tarih", nullable = false)
    private LocalDate tarih;
    
    @Column(name = "uygulayan", length = 100)
    private String uygulayan;
    
    @Column(name = "ornek_tipi", length = 100)
    private String ornekTipi;
    
    @Column(name = "ornek_lokasyonu", length = 100)
    private String ornekLokasyonu;
    
    @Column(name = "ornek_no", length = 50)
    private String ornekNo;
    
    @Column(name = "makroskopik_bulgular", columnDefinition = "NVARCHAR(MAX)")
    private String makroskopikBulgular;
    
    @Column(name = "mikroskopik_bulgular", columnDefinition = "NVARCHAR(MAX)")
    private String mikroskopikBulgular;
    
    @Column(name = "tani", length = 255)
    private String tani;
    
    @Column(name = "derece", length = 50)
    private String derece;
    
    @Column(name = "sinirlar", columnDefinition = "NVARCHAR(MAX)")
    private String sinirlar;
    
    @Column(name = "metastaz_riski", length = 50)
    private String metastazRiski;
    
    @Column(name = "yorumlar", columnDefinition = "NVARCHAR(MAX)")
    private String yorumlar;
} 