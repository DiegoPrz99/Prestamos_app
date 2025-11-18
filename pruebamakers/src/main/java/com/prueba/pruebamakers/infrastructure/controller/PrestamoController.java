package com.prueba.pruebamakers.infrastructure.controller;

import com.prueba.pruebamakers.domain.model.Prestamo;
import com.prueba.pruebamakers.application.PrestamoUseCase;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prestamos")
public class PrestamoController {

    private final PrestamoUseCase prestamoUseCase;

    public PrestamoController(PrestamoUseCase prestamoUseCase) {
        this.prestamoUseCase = prestamoUseCase;
    }

    @PostMapping
    public ResponseEntity<Prestamo> solicitarPrestamo(@RequestBody Prestamo prestamo) {
        return ResponseEntity.ok(prestamoUseCase.solicitarPrestamo(prestamo));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/aprobar/{id}")
    public ResponseEntity<Prestamo> aprobarPrestamo(@PathVariable Long id) {
        return ResponseEntity.ok(prestamoUseCase.aprobarPrestamo(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/rechazar/{id}")
    public ResponseEntity<Prestamo> rechazarPrestamo(@PathVariable Long id) {
        return ResponseEntity.ok(prestamoUseCase.rechazarPrestamo(id));
    }

    @GetMapping("/usuario/{usuarioEmail}")
    @Cacheable("prestamosUsuario")
    public ResponseEntity<List<Prestamo>> obtenerPrestamosUsuario(@PathVariable String usuarioEmail) {
        return ResponseEntity.ok(prestamoUseCase.obtenerPrestamosUsuario(usuarioEmail));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Prestamo>> obtenerTodosPrestamos() {
        return ResponseEntity.ok(prestamoUseCase.obtenerTodosPrestamos());
    }
}
