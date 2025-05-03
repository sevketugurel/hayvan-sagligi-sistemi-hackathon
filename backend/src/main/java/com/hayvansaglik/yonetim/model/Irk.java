package com.hayvansaglik.yonetim.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "irk")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Irk {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "irk_id")
    private Integer id;
    
    @ManyToOne
    @JoinColumn(name = "tur_id", nullable = false)
    private Tur tur;
    
    @Column(name = "isim", nullable = false, length = 100)
    private String isim;
    
    @OneToMany(mappedBy = "irk")
    private Set<Hayvan> hayvanlar = new HashSet<>();
}