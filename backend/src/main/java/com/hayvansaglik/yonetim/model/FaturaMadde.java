package com.hayvansaglik.yonetim.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "fatura_madde")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FaturaMadde {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fatura_madde_id")
    private Integer id;
    
    @ManyToOne
    @JoinColumn(name = "fatura_id", nullable = false)
    private Fatura fatura;
    
    @Column(name = "aciklama", length = 200)
    private String aciklama;
    
    @Column(name = "miktar", nullable = false)
    private Integer miktar;
    
    @Column(name = "birim_fiyat", nullable = false, precision = 10, scale = 2)
    private BigDecimal birimFiyat;
    
    @Column(name = "kdv_orani", precision = 5, scale = 2)
    private BigDecimal kdvOrani = BigDecimal.ZERO;
} 