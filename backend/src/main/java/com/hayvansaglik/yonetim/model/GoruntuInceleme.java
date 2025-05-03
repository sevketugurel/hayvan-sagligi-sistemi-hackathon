package com.hayvansaglik.yonetim.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "goruntu_inceleme")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GoruntuInceleme {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "goruntu_id")
    private Integer id;
    
    @ManyToOne
    @JoinColumn(name = "hayvan_id", nullable = false)
    private Hayvan hayvan;
    
    @Column(name = "modalite", length = 20)
    private String modalite;  // X-RAY, USG, BT, MR
    
    @Column(name = "inceleme_tarihi", nullable = false)
    private LocalDateTime incelemeTarihi;
    
    @Column(name = "dosya_url")
    private String dosyaUrl;
    
    @Column(name = "rapor")
    private String rapor;
} 