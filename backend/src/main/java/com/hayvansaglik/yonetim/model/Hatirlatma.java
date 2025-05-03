package com.hayvansaglik.yonetim.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "hatirlatma")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Hatirlatma {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hatirlatma_id")
    private Integer id;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "randevu_id", nullable = false)
    private Randevu randevu;
    
    @Column(name = "gonderim_zamani", nullable = false)
    private LocalDateTime gonderimZamani;
    
    @Column(name = "kanal", length = 10)
    private String kanal;  // SMS, EMAIL
    
    @Column(name = "durum", length = 20)
    private String durum;
} 