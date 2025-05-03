package com.hayvansaglik.yonetim.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RaporTakvimiResponse {
    private Integer id;
    private Integer hayvanId;
    private String hayvanAdi;
    private String raporTipi;
    private LocalDate tarih;
    private String aciklama;
    private boolean tamamlandi;
} 