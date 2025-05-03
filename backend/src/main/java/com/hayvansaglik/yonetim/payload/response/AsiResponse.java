package com.hayvansaglik.yonetim.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AsiResponse {
    private Integer id;
    private Integer hayvanId;
    private String hayvanAdi;
    private String asiAdi;
    private LocalDate uygulamaTarihi;
    private LocalDate sonrakiUygulamaTarihi;
    private String doz;
    private String uygulayanVeteriner;
    private String aciklama;
    private String batchNo;
    private boolean zamanGeldi;
} 