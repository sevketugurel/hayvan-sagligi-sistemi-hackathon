package com.hayvansaglik.yonetim.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class HayvanRequest {
    
    @NotNull(message = "Sahip ID'si boş olamaz")
    private Integer sahipId;
    
    @NotBlank(message = "Hayvan adı boş olamaz")
    @Size(max = 100, message = "Hayvan adı en fazla 100 karakter olmalıdır")
    private String ad;
    
    @NotNull(message = "Tür ID'si boş olamaz")
    private Integer turId;
    
    @NotNull(message = "Irk ID'si boş olamaz")
    private Integer irkId;
    
    private String cinsiyet;
    
    private LocalDate dogumTarihi;
    
    private BigDecimal kilo;
    
    private String renk;
    
    private String mikrocipNo;
    
    private String alerjiler;
    
    private String kronikHastaliklar;
} 