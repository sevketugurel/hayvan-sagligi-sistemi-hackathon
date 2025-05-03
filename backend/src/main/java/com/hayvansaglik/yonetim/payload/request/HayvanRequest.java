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
    @Size(min = 2, max = 100, message = "Hayvan adı 2-100 karakter arasında olmalıdır")
    private String ad;
    
    @NotNull(message = "Tür ID'si boş olamaz")
    private Integer turId;
    
    @NotNull(message = "Irk ID'si boş olamaz")
    private Integer irkId;
    
    @Size(max = 10, message = "Cinsiyet en fazla 10 karakter olmalıdır")
    private String cinsiyet;
    
    private LocalDate dogumTarihi;
    
    private BigDecimal kilo;
    
    @Size(max = 50, message = "Renk en fazla 50 karakter olmalıdır")
    private String renk;
    
    @Size(max = 50, message = "Mikroçip no en fazla 50 karakter olmalıdır")
    private String mikrocipNo;
    
    private String alerjiler;
    
    private String kronikHastaliklar;
} 