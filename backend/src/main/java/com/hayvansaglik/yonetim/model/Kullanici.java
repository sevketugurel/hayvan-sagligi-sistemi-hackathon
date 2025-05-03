package com.hayvansaglik.yonetim.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "kullanici")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Kullanici {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "kullanici_id")
    private Integer id;
    
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "personel_id", nullable = false)
    private Personel personel;
    
    @Column(name = "kullanici_adi", length = 50, nullable = false, unique = true)
    private String kullaniciAdi;
    
    @Column(name = "parola_hash", length = 255, nullable = false)
    private String parolaHash;
    
    @Column(name = "salt", length = 255)
    private String salt;
    
    @Column(name = "olusturma_tarihi")
    private LocalDateTime olusturmaTarihi;
    
    @Column(name = "son_giris")
    private LocalDateTime sonGiris;
} 