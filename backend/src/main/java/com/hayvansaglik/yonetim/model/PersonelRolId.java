package com.hayvansaglik.yonetim.model;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonelRolId implements Serializable {
    
    private static final long serialVersionUID = 1L;
    
    private Integer personelId;
    private Integer rolId;
} 