package com.hayvansaglik.yonetim.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "lab_test_detaylari")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LabTestDetaylari {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "detay_id")
    private Integer id;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "test_id", nullable = false)
    private LabTestleri labTesti;
    
    @Column(name = "parametre", nullable = false, length = 100)
    private String parametre;
    
    @Column(name = "deger", length = 50)
    private String deger;
    
    @Column(name = "birim", length = 20)
    private String birim;
    
    @Column(name = "referans_araligi", length = 50)
    private String referansAraligi;
    
    @Column(name = "durum", length = 20)
    private String durum;
} 