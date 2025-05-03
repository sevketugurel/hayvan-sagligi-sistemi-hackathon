package com.hayvansaglik.yonetim.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "asi")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Asi {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "hayvan_id", nullable = false)
    private Hayvan hayvan;
    
    @Column(name = "asi_adi", nullable = false, length = 100)
    private String asiAdi;
    
    @Column(name = "uygulama_tarihi")
    private LocalDate uygulamaTarihi;
    
    @Column(name = "sonraki_uygulama_tarihi")
    private LocalDate sonrakiUygulamaTarihi;
    
    @Column(name = "doz", length = 50)
    private String doz;
    
    @Column(name = "uygulayan_veteriner", length = 100)
    private String uygulayanVeteriner;
    
    @Column(name = "aciklama", length = 500)
    private String aciklama;
    
    @Column(name = "batch_no", length = 50)
    private String batchNo;
} 