package com.hayvansaglik.yonetim.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "nekropsi_bulgular")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NekropsiBulgular {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "nekropsi_id")
    private Integer id;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "hayvan_id", nullable = false)
    private Hayvan hayvan;
    
    @Column(name = "tarih", nullable = false)
    private LocalDate tarih;
    
    @Column(name = "veteriner", length = 100)
    private String veteriner;
    
    @Column(name = "bulgular", columnDefinition = "NVARCHAR(MAX)")
    private String bulgular;
    
    @Column(name = "rapor_no", length = 50)
    private String raporNo;
    
    @Column(name = "rapor_tarihi")
    private LocalDate raporTarihi;
    
    @Column(name = "uygulayan", length = 100)
    private String uygulayan;
    
    @Column(name = "tur", length = 50)
    private String tur;
    
    @Column(name = "irk", length = 50)
    private String irk;
    
    @Column(name = "yas")
    private Integer yas;
    
    @Column(name = "kimlik_no", length = 50)
    private String kimlikNo;
} 