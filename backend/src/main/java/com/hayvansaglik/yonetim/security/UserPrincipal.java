package com.hayvansaglik.yonetim.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hayvansaglik.yonetim.model.Kullanici;
import com.hayvansaglik.yonetim.model.PersonelRol;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class UserPrincipal implements UserDetails {
    private Integer id;
    private String name;
    private String username;
    private String email;
    
    @JsonIgnore
    private String password;
    
    private Collection<? extends GrantedAuthority> authorities;

    public UserPrincipal(Integer id, String name, String username, String email, String password, 
                         Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
    }

    public static UserPrincipal create(Kullanici kullanici) {
        List<GrantedAuthority> authorities = kullanici.getPersonel().getPersonelRoller().stream()
                .map(personelRol -> new SimpleGrantedAuthority("ROLE_" + personelRol.getRol().getAd().toUpperCase()))
                .collect(Collectors.toList());

        // Personel'in adı ve soyadını birleştirme
        String fullName = (kullanici.getPersonel().getAd() != null ? kullanici.getPersonel().getAd() : "") + 
                          (kullanici.getPersonel().getSoyad() != null ? " " + kullanici.getPersonel().getSoyad() : "");
        fullName = fullName.trim();
        
        return new UserPrincipal(
                kullanici.getId(),
                fullName,
                kullanici.getKullaniciAdi(),
                kullanici.getPersonel().getEPosta(),
                kullanici.getParolaHash(),
                authorities
        );
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserPrincipal that = (UserPrincipal) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
} 