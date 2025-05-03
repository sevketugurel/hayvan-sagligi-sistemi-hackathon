package com.hayvansaglik.yonetim.repository;

import com.hayvansaglik.yonetim.model.Irk;
import com.hayvansaglik.yonetim.model.Tur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IrkRepository extends JpaRepository<Irk, Integer> {
    List<Irk> findByTur(Tur tur);
    Optional<Irk> findByIsimAndTur(String isim, Tur tur);
} 