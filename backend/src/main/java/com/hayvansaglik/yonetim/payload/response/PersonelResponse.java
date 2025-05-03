package com.hayvansaglik.yonetim.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonelResponse {
    
    private Integer id;
    private String ad;
    private String soyad;
    private String ePosta;
    private String telefon;
    private LocalDate iseBaslamaTarihi;
    private Boolean aktif;
    private Set<Integer> rolIdleri;
    private Set<String> rolAdlari;
} 