package com.hayvansaglik.yonetim.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "radyolojik_goruntuleme")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RadyolojikGoruntuleme {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "goruntuleme_id")
    private Integer id;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "hayvan_id", nullable = false)
    private Hayvan hayvan;
    
    @Column(name = "tarih", nullable = false)
    private LocalDate tarih;
    
    @Column(name = "tipi", nullable = false, length = 50)
    private String tipi;
    
    @Column(name = "bolge", nullable = false, length = 100)
    private String bolge;
    
    @Column(name = "bulgular", columnDefinition = "NVARCHAR(MAX)")
    private String bulgular;
    
    @Column(name = "goruntu_url", length = 255)
    private String goruntuUrl;
    
    @Column(name = "notlar", columnDefinition = "NVARCHAR(MAX)")
    private String notlar;
} 