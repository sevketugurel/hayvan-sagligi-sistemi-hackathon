package com.hayvansaglik.yonetim.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;

@Data
public class RaporTakvimiRequest {
    
    @NotNull(message = "Hayvan ID boş olamaz")
    private Integer hayvanId;
    
    @NotBlank(message = "Rapor tipi boş olamaz")
    @Size(max = 100, message = "Rapor tipi en fazla 100 karakter olmalıdır")
    private String raporTipi;
    
    @NotNull(message = "Tarih boş olamaz")
    private LocalDate tarih;
    
    @Size(max = 500, message = "Açıklama en fazla 500 karakter olmalıdır")
    private String aciklama;
    
    private boolean tamamlandi;
} 