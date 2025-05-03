package com.hayvansaglik.yonetim.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "stok_islemi")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StokIslemi {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "islem_id")
    private Integer id;
    
    @ManyToOne
    @JoinColumn(name = "urun_id", nullable = false)
    private StokUrun urun;
    
    @Column(name = "islem_tarihi", nullable = false)
    private LocalDateTime islemTarihi;
    
    @Column(name = "miktar", nullable = false)
    private Integer miktar;
    
    @Column(name = "birim_maliyet", precision = 10, scale = 2)
    private BigDecimal birimMaliyet;
    
    @Column(name = "tur", length = 10)
    private String tur;  // GİRİŞ, ÇIKIŞ
    
    @Column(name = "ilgili_varlik", length = 50)
    private String ilgiliVarlik;
} 