package com.hayvansaglik.yonetim.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class IrkRequest {
    
    @NotBlank(message = "Irk ismi boş olamaz")
    @Size(min = 2, max = 100, message = "Irk ismi 2-100 karakter arasında olmalıdır")
    private String isim;
    
    @NotNull(message = "Tür ID'si boş olamaz")
    private Integer turId;
} 