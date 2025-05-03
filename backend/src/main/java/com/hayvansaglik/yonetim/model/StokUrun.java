package com.hayvansaglik.yonetim.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "stok_urun")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StokUrun {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "urun_id")
    private Integer id;
    
    @Column(name = "ad", nullable = false, length = 100)
    private String ad;
    
    @Column(name = "barkod", length = 50)
    private String barkod;
    
    @Column(name = "lot_no", length = 50)
    private String lotNo;
    
    @Column(name = "uretim_tarihi")
    private LocalDate uretimTarihi;
    
    @Column(name = "son_kullanma_tarihi")
    private LocalDate sonKullanmaTarihi;
    
    @Column(name = "min_stok")
    private Integer minStok = 0;
    
    @Column(name = "max_stok")
    private Integer maxStok = 0;
    
    @OneToMany(mappedBy = "urun", cascade = CascadeType.ALL)
    private Set<StokIslemi> stokIslemleri = new HashSet<>();
}