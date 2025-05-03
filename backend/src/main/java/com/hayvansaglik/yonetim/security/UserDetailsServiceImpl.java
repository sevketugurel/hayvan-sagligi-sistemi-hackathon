package com.hayvansaglik.yonetim.security;

import com.hayvansaglik.yonetim.model.Kullanici;
import com.hayvansaglik.yonetim.repository.KullaniciRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private KullaniciRepository kullaniciRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Kullanici kullanici = kullaniciRepository.findByKullaniciAdi(username)
                .orElseThrow(() -> new UsernameNotFoundException("Kullanıcı bulunamadı: " + username));

        return UserPrincipal.create(kullanici);
    }

    @Transactional
    public UserDetails loadUserById(Integer id) {
        Kullanici kullanici = kullaniciRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("Kullanıcı bulunamadı, ID: " + id));

        return UserPrincipal.create(kullanici);
    }
} 