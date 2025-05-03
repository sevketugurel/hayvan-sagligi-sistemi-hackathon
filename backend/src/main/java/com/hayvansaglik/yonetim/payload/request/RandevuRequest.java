package com.hayvansaglik.yonetim.payload.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RandevuRequest {
    
    @NotNull(message = "Hayvan ID'si boş olamaz")
    private Integer hayvanId;
    
    @NotNull(message = "Veteriner ID'si boş olamaz")
    private Integer veterinerId;
    
    @NotNull(message = "Randevu zamanı boş olamaz")
    private LocalDateTime randevuZamani;
    
    @NotNull(message = "Süre boş olamaz")
    @Min(value = 5, message = "Süre en az 5 dakika olmalıdır")
    private Integer sureDk;
    
    @Size(max = 50, message = "Tür en fazla 50 karakter olmalıdır")
    private String tur;
    
    @Size(max = 20, message = "Durum en fazla 20 karakter olmalıdır")
    private String durum;
    
    private String iptalNotu;
} 