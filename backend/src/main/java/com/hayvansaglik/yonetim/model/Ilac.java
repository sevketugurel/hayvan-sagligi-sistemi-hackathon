package com.hayvansaglik.yonetim.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ilac")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ilac {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ilac_id")
    private Integer id;
    
    @Column(name = "ilac_ad", nullable = false, length = 100)
    private String ilacAd;
    
    @Column(name = "aktif_madde", length = 100)
    private String aktifMadde;
    
    @Column(name = "kullanim_alani", length = 100)
    private String kullanimAlani;
    
    @Column(name = "uygulama_yolu", length = 50)
    private String uygulamaYolu;
    
    @Column(name = "notlar")
    private String notlar;
} 