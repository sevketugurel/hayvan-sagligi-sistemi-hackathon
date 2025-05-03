package com.hayvansaglik.yonetim.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "recete")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Recete {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recete_id")
    private Integer id;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "inceleme_id", nullable = false)
    private KlinikInceleme klinikInceleme;
    
    @Column(name = "ilac", length = 100)
    private String ilac;
    
    @Column(name = "doz", length = 50)
    private String doz;
    
    @Column(name = "talimatlar")
    private String talimatlar;
} 