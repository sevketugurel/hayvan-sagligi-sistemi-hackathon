package com.hayvansaglik.yonetim.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HatirlatmaResponse {
    private Integer id;
    private Integer randevuId;
    private LocalDateTime randevuZamani;
    private String hayvanAd;
    private String sahipAd;
    private String sahipIletisim;
    private LocalDateTime gonderimZamani;
    private String kanal;
    private String durum;
} 