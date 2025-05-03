package com.hayvansaglik.yonetim.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class TurRequest {
    
    @NotBlank(message = "Tür ismi boş olamaz")
    @Size(min = 2, max = 50, message = "Tür ismi 2-50 karakter arasında olmalıdır")
    private String isim;
} 