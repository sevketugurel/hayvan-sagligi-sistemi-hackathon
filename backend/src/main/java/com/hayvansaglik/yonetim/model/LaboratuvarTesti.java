package com.hayvansaglik.yonetim.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "laboratuvar_testi")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LaboratuvarTesti {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "test_id")
    private Integer id;
    
    @ManyToOne
    @JoinColumn(name = "hayvan_id", nullable = false)
    private Hayvan hayvan;
    
    @Column(name = "ornek_no", length = 50)
    private String ornekNo;
    
    @Column(name = "test_tipi", length = 50)
    private String testTipi;
    
    @Column(name = "ornek_tarihi", nullable = false)
    private LocalDateTime ornekTarihi;
    
    @OneToMany(mappedBy = "test", cascade = CascadeType.ALL)
    private Set<LaboratuvarSonucu> sonuclar = new HashSet<>();
} 