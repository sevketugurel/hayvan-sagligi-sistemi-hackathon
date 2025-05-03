package com.hayvansaglik.yonetim.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RolRequest {
    
    @NotBlank(message = "Rol adı boş olamaz")
    @Size(min = 2, max = 50, message = "Rol adı en az 2, en fazla 50 karakter olmalıdır")
    private String ad;
} 