package com.hayvansaglik.yonetim.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "ekipman")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ekipman {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ekipman_id")
    private Integer id;
    
    @Column(name = "ad", length = 100)
    private String ad;
    
    @Column(name = "model", length = 100)
    private String model;
    
    @Column(name = "seri_no", length = 100)
    private String seriNo;
    
    @Column(name = "satin_alma_tarihi")
    private LocalDate satinAlmaTarihi;
    
    @Column(name = "konum", length = 100)
    private String konum;
    
    @OneToMany(mappedBy = "ekipman", cascade = CascadeType.ALL)
    private Set<Bakim> bakimlar = new HashSet<>();
} 