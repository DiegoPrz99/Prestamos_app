package com.prueba.pruebamakers.domain.service;

import com.prueba.pruebamakers.domain.repository.PrestamoRepository;
import com.prueba.pruebamakers.domain.model.EstadoPrestamo;
import com.prueba.pruebamakers.domain.model.Prestamo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class PrestamoService {

    private final PrestamoRepository repository;

    public PrestamoService(PrestamoRepository repository) {
        this.repository = repository;
    }

    public Prestamo solicitarPrestamo(Prestamo prestamo) {
        prestamo.setEstado(EstadoPrestamo.PENDIENTE);
        return repository.save(prestamo);
    }

    @Transactional
    public Prestamo aprobarPrestamo(Long id) {
        Prestamo prestamo = repository.findById(id).orElseThrow();
        prestamo.setEstado(EstadoPrestamo.APROBADO);
        return repository.save(prestamo);
    }

    @Transactional
    public Prestamo rechazarPrestamo(Long id) {
        Prestamo prestamo = repository.findById(id).orElseThrow();
        prestamo.setEstado(EstadoPrestamo.RECHAZADO);
        return repository.save(prestamo);
    }

    public List<Prestamo> obtenerPrestamosUsuario(String email) {
        return repository.findByEmail(email);
    }

    public List<Prestamo> obtenerTodosPrestamos() {
        return repository.findAll();
    }
}