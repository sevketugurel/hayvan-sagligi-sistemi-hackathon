package com.hayvansaglik.yonetim.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RandevuResponse {
    private Integer id;
    private Integer hayvanId;
    private String hayvanAd;
    private Integer veterinerId;
    private String veterinerAdSoyad;
    private LocalDateTime randevuZamani;
    private Integer sureDk;
    private String tur;
    private String durum;
    private String iptalNotu;
    private Boolean klinikIncelemeYapildi;
} 