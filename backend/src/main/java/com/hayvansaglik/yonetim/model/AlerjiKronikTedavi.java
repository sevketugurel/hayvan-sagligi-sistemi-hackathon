package com.hayvansaglik.yonetim.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "alerji_kronik_tedavi")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlerjiKronikTedavi {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tedavi_id")
    private Integer id;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "alerji_id", nullable = false)
    private AlerjiKronik alerji;
    
    @Column(name = "tedavi", nullable = false, length = 255)
    private String tedavi;
} 