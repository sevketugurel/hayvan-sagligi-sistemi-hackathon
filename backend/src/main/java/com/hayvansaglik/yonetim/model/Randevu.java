package com.hayvansaglik.yonetim.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "randevu")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Randevu {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "randevu_id")
    private Integer id;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "hayvan_id", nullable = false)
    private Hayvan hayvan;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "veteriner_id", nullable = false)
    private Personel veteriner;
    
    @Column(name = "randevu_zamani", nullable = false)
    private LocalDateTime randevuZamani;
    
    @Column(name = "sure_dk", nullable = false)
    private Integer sureDk;
    
    @Column(name = "tur", length = 50)
    private String tur;
    
    @Column(name = "durum", length = 20)
    private String durum;  // ONAYLANDI, BEKLEMEDE, İPTAL
    
    @Column(name = "iptal_notu")
    private String iptalNotu;
    
    @OneToMany(mappedBy = "randevu", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Hatirlatma> hatirlatmalar = new HashSet<>();
    
    @OneToOne(mappedBy = "randevu", cascade = CascadeType.ALL, orphanRemoval = true)
    private KlinikInceleme klinikInceleme;
} 