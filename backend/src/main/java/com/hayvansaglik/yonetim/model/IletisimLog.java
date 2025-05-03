package com.hayvansaglik.yonetim.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "iletisim_log")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class IletisimLog {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "iletisim_id")
    private Integer id;
    
    @ManyToOne
    @JoinColumn(name = "sahip_id")
    private Sahip sahip;
    
    @Column(name = "gonderim_tarihi", nullable = false)
    private LocalDateTime gonderimTarihi;
    
    @Column(name = "kanal", length = 10)
    private String kanal;  // SMS, EMAIL
    
    @Column(name = "konu", length = 200)
    private String konu;
    
    @Column(name = "mesaj")
    private String mesaj;
    
    @Column(name = "durum", length = 20)
    private String durum;
} 