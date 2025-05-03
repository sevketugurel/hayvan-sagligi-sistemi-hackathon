package com.hayvansaglik.yonetim.payload.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class HatirlatmaRequest {
    
    @NotNull(message = "Randevu ID'si boş olamaz")
    private Integer randevuId;
    
    @NotNull(message = "Gönderim zamanı boş olamaz")
    private LocalDateTime gonderimZamani;
    
    @NotNull(message = "Kanal boş olamaz")
    @Size(max = 10, message = "Kanal en fazla 10 karakter olmalıdır")
    private String kanal;
    
    @Size(max = 20, message = "Durum en fazla 20 karakter olmalıdır")
    private String durum;
} 