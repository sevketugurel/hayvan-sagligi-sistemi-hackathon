package com.hayvansaglik.yonetim;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class HayvanSaglikApplication {

    public static void main(String[] args) {
        SpringApplication.run(HayvanSaglikApplication.class, args);
    }
} 