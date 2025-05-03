package com.hayvansaglik.yonetim.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class KlinikIncelemeResponse {
    
    private Integer id;
    private Integer randevuId;
    private Integer hayvanId;
    private String hayvanAd;
    private Integer veterinerId;
    private String veterinerAdSoyad;
    private String sikayetler;
    private String anamnez;
    private String bulgular;
    private String birincilTani;
    private String ikincilTani;
    private String islemler;
    private String notlar;
    private Integer receteSayisi;
} 