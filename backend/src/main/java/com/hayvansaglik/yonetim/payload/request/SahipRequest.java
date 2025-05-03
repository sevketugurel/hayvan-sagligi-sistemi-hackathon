package com.hayvansaglik.yonetim.payload.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SahipRequest {
    
    @NotBlank(message = "Ad boş olamaz")
    @Size(min = 2, max = 100, message = "Ad 2-100 karakter arasında olmalıdır")
    private String ad;
    
    @NotBlank(message = "Soyad boş olamaz")
    @Size(min = 2, max = 100, message = "Soyad 2-100 karakter arasında olmalıdır")
    private String soyad;
    
    @Size(max = 20, message = "Telefon numarası en fazla 20 karakter olmalıdır")
    private String telefon1;
    
    @Size(max = 20, message = "Telefon numarası en fazla 20 karakter olmalıdır")
    private String telefon2;
    
    @Email(message = "Geçerli bir e-posta adresi girilmelidir")
    private String ePosta;
    
    private String adres;
    
    @Size(max = 20, message = "Tercih edilen iletişim en fazla 20 karakter olmalıdır")
    private String tercihEdilenIletisim;
} 