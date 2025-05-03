package com.hayvansaglik.yonetim.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RolRequest {
    
    @NotBlank(message = "Rol adı boş olamaz")
    @Size(min = 2, max = 50, message = "Rol adı 2-50 karakter arasında olmalıdır")
    private String ad;
} 