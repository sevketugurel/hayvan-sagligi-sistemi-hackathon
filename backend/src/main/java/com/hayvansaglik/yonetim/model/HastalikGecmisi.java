package com.hayvansaglik.yonetim.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "hastalik_gecmisi")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HastalikGecmisi {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "gecmis_id")
    private Integer id;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "hayvan_id", nullable = false)
    private Hayvan hayvan;
    
    @Column(name = "hastalik_adi", nullable = false, length = 100)
    private String hastalikAdi;
    
    @Column(name = "tani_tarihi", nullable = false)
    private LocalDate taniTarihi;
    
    @Column(name = "iyilesme_tarihi")
    private LocalDate iyilesmeTarihi;
    
    @Column(name = "aciklama")
    private String aciklama;
} 