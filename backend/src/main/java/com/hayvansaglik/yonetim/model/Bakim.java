package com.hayvansaglik.yonetim.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "bakim")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bakim {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bakim_id")
    private Integer id;
    
    @ManyToOne
    @JoinColumn(name = "ekipaman_id", nullable = false)
    private Ekipman ekipman;
    
    @Column(name = "bakim_tarihi", nullable = false)
    private LocalDate bakimTarihi;
    
    @Column(name = "notlar")
    private String notlar;
} 