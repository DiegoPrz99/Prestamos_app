package com.prueba.pruebamakers.domain.repository;

import com.prueba.pruebamakers.domain.model.Prestamo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PrestamoRepository extends JpaRepository<Prestamo, Long> {
    List<Prestamo> findByUsuarioEmail(String usuarioEmail);
}