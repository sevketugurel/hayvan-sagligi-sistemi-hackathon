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
@Table(name = "fatura")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Fatura {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fatura_id")
    private Integer id;
    
    @ManyToOne
    @JoinColumn(name = "sahip_id", nullable = false)
    private Sahip sahip;
    
    @Column(name = "fatura_tarihi", nullable = false)
    private LocalDate faturaTarihi;
    
    @Column(name = "toplam_tutar", nullable = false, precision = 12, scale = 2)
    private BigDecimal toplamTutar;
    
    @Column(name = "durum", length = 20)
    private String durum;  // ÖDENDİ, BEKLEMEDE, GECİKMİŞ
    
    @OneToMany(mappedBy = "fatura", cascade = CascadeType.ALL)
    private Set<FaturaMadde> faturaMaddeleri = new HashSet<>();
} 