package com.hayvansaglik.yonetim.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReceteResponse {
    
    private Integer id;
    private Integer klinikIncelemeId;
    private Integer randevuId;
    private Integer hayvanId;
    private String hayvanAd;
    private String ilac;
    private String doz;
    private String talimatlar;
} 