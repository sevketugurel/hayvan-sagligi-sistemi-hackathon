package com.hayvansaglik.yonetim.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "recete_ilaclari")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReceteIlaclari {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recete_ilac_id")
    private Integer id;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "recete_id", nullable = false)
    private Recete recete;
    
    @Column(name = "ilac_adi", nullable = false, length = 255)
    private String ilacAdi;
} 