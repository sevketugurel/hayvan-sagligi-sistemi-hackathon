package com.hayvansaglik.yonetim.controller;

import com.hayvansaglik.yonetim.model.Kullanici;
import com.hayvansaglik.yonetim.model.Personel;
import com.hayvansaglik.yonetim.model.PersonelRol;
import com.hayvansaglik.yonetim.model.PersonelRolId;
import com.hayvansaglik.yonetim.model.Rol;
import com.hayvansaglik.yonetim.payload.request.LoginRequest;
import com.hayvansaglik.yonetim.payload.request.SignupRequest;
import com.hayvansaglik.yonetim.payload.response.JwtResponse;
import com.hayvansaglik.yonetim.payload.response.MessageResponse;
import com.hayvansaglik.yonetim.repository.KullaniciRepository;
import com.hayvansaglik.yonetim.repository.PersonelRepository;
import com.hayvansaglik.yonetim.repository.RolRepository;
import com.hayvansaglik.yonetim.security.JwtTokenProvider;
import com.hayvansaglik.yonetim.security.UserPrincipal;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private KullaniciRepository kullaniciRepository;

    @Autowired
    private PersonelRepository personelRepository;

    @Autowired
    private RolRepository rolRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);
        
        UserPrincipal userDetails = (UserPrincipal) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(
                jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles
        ));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        // Kullanıcı adı kontrolü
        if (kullaniciRepository.existsByKullaniciAdi(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Hata: Bu kullanıcı adı zaten kullanılıyor!"));
        }

        // Personel oluşturma
        final Personel personel = new Personel();
        personel.setAd(signUpRequest.getFirstName());
        personel.setSoyad(signUpRequest.getLastName());
        personel.setEPosta(signUpRequest.getEmail());
        personel.setTelefon(signUpRequest.getPhone());
        personel.setIseBaslamaTarihi(LocalDate.now());
        personel.setAktif(true);
        
        // Personel kaydedilmesi
        personelRepository.save(personel);
        
        // Kullanıcı oluşturma
        Kullanici kullanici = new Kullanici();
        kullanici.setKullaniciAdi(signUpRequest.getUsername());
        kullanici.setParolaHash(passwordEncoder.encode(signUpRequest.getPassword()));
        kullanici.setPersonel(personel);
        kullanici.setOlusturmaTarihi(LocalDateTime.now());
        
        // Kullanıcı kaydedilmesi
        kullaniciRepository.save(kullanici);
        
        // Rol atama işlemi
        Set<String> strRoles = signUpRequest.getRoles();
        
        if (strRoles == null || strRoles.isEmpty()) {
            // Varsayılan rol atama (SAHIP)
            Rol sahipRol = rolRepository.findByAd("SAHIP")
                    .orElseThrow(() -> new RuntimeException("Hata: Rol bulunamadı."));
            
            PersonelRol personelRol = new PersonelRol();
            PersonelRolId rolId = new PersonelRolId(personel.getId(), sahipRol.getId());
            personelRol.setId(rolId);
            personelRol.setPersonel(personel);
            personelRol.setRol(sahipRol);
            
            personel.getPersonelRoller().add(personelRol);
            personelRepository.save(personel);
        } else {
            strRoles.forEach(role -> {
                Rol userRole;
                switch (role) {
                    case "admin":
                        userRole = rolRepository.findByAd("ADMIN")
                                .orElseThrow(() -> new RuntimeException("Hata: Rol bulunamadı."));
                        break;
                    case "veteriner":
                        userRole = rolRepository.findByAd("VETERINER")
                                .orElseThrow(() -> new RuntimeException("Hata: Rol bulunamadı."));
                        break;
                    case "laborant":
                        userRole = rolRepository.findByAd("LABORANT")
                                .orElseThrow(() -> new RuntimeException("Hata: Rol bulunamadı."));
                        break;
                    case "hemsire":
                        userRole = rolRepository.findByAd("HEMSIRE")
                                .orElseThrow(() -> new RuntimeException("Hata: Rol bulunamadı."));
                        break;
                    case "muhasebe":
                        userRole = rolRepository.findByAd("MUHASEBE")
                                .orElseThrow(() -> new RuntimeException("Hata: Rol bulunamadı."));
                        break;
                    default:
                        userRole = rolRepository.findByAd("SAHIP")
                                .orElseThrow(() -> new RuntimeException("Hata: Rol bulunamadı."));
                }
                
                PersonelRol personelRol = new PersonelRol();
                PersonelRolId rolId = new PersonelRolId(personel.getId(), userRole.getId());
                personelRol.setId(rolId);
                personelRol.setPersonel(personel);
                personelRol.setRol(userRole);
                
                personel.getPersonelRoller().add(personelRol);
            });
            
            personelRepository.save(personel);
        }

        return ResponseEntity.ok(new MessageResponse("Kullanıcı başarıyla kaydedildi!"));
    }
} 