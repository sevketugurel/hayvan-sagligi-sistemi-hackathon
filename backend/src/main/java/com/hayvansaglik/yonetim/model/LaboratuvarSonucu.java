package com.hayvansaglik.yonetim.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "laboratuvar_sonucu")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LaboratuvarSonucu {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sonuc_id")
    private Integer id;
    
    @ManyToOne
    @JoinColumn(name = "test_id", nullable = false)
    private LaboratuvarTesti test;
    
    @Column(name = "parametre", length = 100)
    private String parametre;
    
    @Column(name = "deger", length = 50)
    private String deger;
    
    @Column(name = "referans_araligi", length = 50)
    private String referansAraligi;
} 