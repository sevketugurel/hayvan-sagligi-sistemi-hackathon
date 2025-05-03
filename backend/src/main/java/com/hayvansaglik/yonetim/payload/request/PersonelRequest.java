package com.hayvansaglik.yonetim.payload.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;
import java.util.Set;

@Data
public class PersonelRequest {
    
    @NotBlank(message = "Ad boş olamaz")
    @Size(min = 2, max = 100, message = "Ad en az 2, en fazla 100 karakter olmalıdır")
    private String ad;
    
    @NotBlank(message = "Soyad boş olamaz")
    @Size(min = 2, max = 100, message = "Soyad en az 2, en fazla 100 karakter olmalıdır")
    private String soyad;
    
    @Email(message = "Geçerli bir e-posta adresi girin")
    @Size(max = 150, message = "E-posta en fazla 150 karakter olmalıdır")
    private String ePosta;
    
    @Size(max = 20, message = "Telefon en fazla 20 karakter olmalıdır")
    private String telefon;
    
    private LocalDate iseBaslamaTarihi;
    
    private Boolean aktif;
    
    private Set<Integer> rolIdleri;
} 