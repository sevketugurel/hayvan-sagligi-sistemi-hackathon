package com.hayvansaglik.yonetim.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "lab_testleri")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LabTestleri {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "test_id")
    private Integer id;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "hayvan_id", nullable = false)
    private Hayvan hayvan;
    
    @Column(name = "tarih", nullable = false)
    private LocalDate tarih;
    
    @Column(name = "test_adi", nullable = false, length = 100)
    private String testAdi;
    
    @Column(name = "sonuclar", columnDefinition = "NVARCHAR(MAX)")
    private String sonuclar;
    
    @Column(name = "rapor_url", length = 255)
    private String raporUrl;
    
    @OneToMany(mappedBy = "labTesti", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<LabTestDetaylari> testDetaylari = new HashSet<>();
} 