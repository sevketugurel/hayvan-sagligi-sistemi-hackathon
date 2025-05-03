package com.hayvansaglik.yonetim.payload.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class KlinikIncelemeRequest {
    
    @NotNull(message = "Randevu ID'si boş olamaz")
    private Integer randevuId;
    
    private String sikayetler;
    
    private String anamnez;
    
    private String bulgular;
    
    private String birincilTani;
    
    private String ikincilTani;
    
    private String islemler;
    
    private String notlar;
} 