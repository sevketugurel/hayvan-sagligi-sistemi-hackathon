package com.hayvansaglik.yonetim.payload.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ReceteRequest {
    
    @NotNull(message = "Klinik inceleme ID'si boş olamaz")
    private Integer klinikIncelemeId;
    
    @NotNull(message = "İlaç adı boş olamaz")
    @Size(max = 100, message = "İlaç adı en fazla 100 karakter olmalıdır")
    private String ilac;
    
    @Size(max = 50, message = "Doz en fazla 50 karakter olmalıdır")
    private String doz;
    
    private String talimatlar;
} 