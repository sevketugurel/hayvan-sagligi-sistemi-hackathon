package com.hayvansaglik.yonetim.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HayvanResponse {
    
    private Integer id;
    private Integer sahipId;
    private String sahipAdSoyad;
    private String ad;
    private Integer turId;
    private String turAd;
    private Integer irkId;
    private String irkAd;
    private String cinsiyet;
    private LocalDate dogumTarihi;
    private BigDecimal kilo;
    private String renk;
    private String mikrocipNo;
    private String alerjiler;
    private String kronikHastaliklar;
} 