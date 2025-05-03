package com.hayvansaglik.yonetim.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "rapor_takvimi")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RaporTakvimi {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "hayvan_id", nullable = false)
    private Hayvan hayvan;
    
    @Column(nullable = false, length = 100)
    private String raporTipi;
    
    @Column(nullable = false)
    private LocalDate tarih;
    
    @Column(length = 500)
    private String aciklama;
    
    @Column(nullable = false)
    private boolean tamamlandi = false;
} 