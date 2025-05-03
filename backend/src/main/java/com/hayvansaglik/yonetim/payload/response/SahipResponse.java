package com.hayvansaglik.yonetim.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SahipResponse {
    private Integer id;
    private String ad;
    private String soyad;
    private String telefon1;
    private String telefon2;
    private String ePosta;
    private String adres;
    private String tercihEdilenIletisim;
    private Integer hayvanSayisi;
} 