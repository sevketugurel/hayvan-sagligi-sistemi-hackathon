package com.hayvansaglik.yonetim.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;

@Data
public class AsiRequest {
    
    @NotNull(message = "Hayvan ID boş olamaz")
    private Integer hayvanId;
    
    @NotBlank(message = "Aşı adı boş olamaz")
    @Size(max = 100, message = "Aşı adı en fazla 100 karakter olmalıdır")
    private String asiAdi;
    
    private LocalDate uygulamaTarihi;
    
    private LocalDate sonrakiUygulamaTarihi;
    
    @Size(max = 50, message = "Doz bilgisi en fazla 50 karakter olmalıdır")
    private String doz;
    
    @Size(max = 100, message = "Uygulayan veteriner bilgisi en fazla 100 karakter olmalıdır")
    private String uygulayanVeteriner;
    
    @Size(max = 500, message = "Açıklama en fazla 500 karakter olmalıdır")
    private String aciklama;
    
    @Size(max = 50, message = "Batch no en fazla 50 karakter olmalıdır")
    private String batchNo;
} 