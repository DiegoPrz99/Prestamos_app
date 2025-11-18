package com.prueba.pruebamakers.application;

import com.prueba.pruebamakers.domain.model.Prestamo;
import com.prueba.pruebamakers.domain.service.PrestamoService;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PrestamoUseCase {

    private final PrestamoService prestamoService;

    public PrestamoUseCase(PrestamoService prestamoService) {
        this.prestamoService = prestamoService;
    }

    public Prestamo solicitarPrestamo(Prestamo prestamo) {
        return prestamoService.solicitarPrestamo(prestamo);
    }

    public Prestamo aprobarPrestamo(Long id) {
        return prestamoService.aprobarPrestamo(id);
    }

    public Prestamo rechazarPrestamo(Long id) {
        return prestamoService.rechazarPrestamo(id);
    }

    public List<Prestamo> obtenerPrestamosUsuario(String usuarioId) {
        return prestamoService.obtenerPrestamosUsuario(usuarioId);
    }

    public List<Prestamo> obtenerTodosPrestamos() {
        return prestamoService.obtenerTodosPrestamos();
    }
}
