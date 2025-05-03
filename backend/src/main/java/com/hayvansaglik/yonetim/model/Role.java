package com.hayvansaglik.yonetim.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "roles")
@NoArgsConstructor
@AllArgsConstructor
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ERole name;

    public enum ERole {
        ROLE_ADMIN,
        ROLE_VETERINER,
        ROLE_LABORANT,
        ROLE_HEMSIRE,
        ROLE_MUHASEBE,
        ROLE_SAHIP
    }
    
    // Getters ve Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public ERole getName() {
        return name;
    }
    
    public void setName(ERole name) {
        this.name = name;
    }
} 