package com.hayvansaglik.yonetim.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "dokuman")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Dokuman {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dokuman_id")
    private Integer id;
    
    @ManyToOne
    @JoinColumn(name = "sahip_id")
    private Sahip sahip;
    
    @ManyToOne
    @JoinColumn(name = "hayvan_id")
    private Hayvan hayvan;
    
    @Column(name = "tur", length = 50)
    private String tur;
    
    @Column(name = "dosya_url")
    private String dosyaUrl;
    
    @Column(name = "olusturma_tarihi")
    private LocalDateTime olusturmaTarihi = LocalDateTime.now();
} 