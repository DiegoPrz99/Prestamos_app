package com.prueba.pruebamakers.infrastructure.controller;

import com.prueba.pruebamakers.domain.model.Prestamo;
import com.prueba.pruebamakers.application.PrestamoUseCase;
import org.springframework.cache.annotation.CacheEvict;
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
@CacheEvict(value = "prestamosUsuario", key = "#prestamo.email")
public ResponseEntity<Prestamo> solicitarPrestamo(@RequestBody Prestamo prestamo) {
    return ResponseEntity.ok(prestamoUseCase.solicitarPrestamo(prestamo));
}

@PreAuthorize("hasRole('ADMIN')")
@PutMapping("/aprobar/{id}")
public ResponseEntity<Prestamo> aprobarPrestamo(@PathVariable Long id) {
    Prestamo prestamo = prestamoUseCase.aprobarPrestamo(id);
    prestamoUseCase.evictCache(prestamo.getEmail());
    return ResponseEntity.ok(prestamo);
}

@PreAuthorize("hasRole('ADMIN')")
@PutMapping("/rechazar/{id}")
public ResponseEntity<Prestamo> rechazarPrestamo(@PathVariable Long id) {
    Prestamo prestamo = prestamoUseCase.rechazarPrestamo(id);
    prestamoUseCase.evictCache(prestamo.getEmail());
    return ResponseEntity.ok(prestamo);
}

@GetMapping("/usuario/{email:.+}")
@Cacheable("prestamosUsuario")
public ResponseEntity<List<Prestamo>> obtenerPrestamosUsuario(@PathVariable String email) {
    return ResponseEntity.ok(prestamoUseCase.obtenerPrestamosUsuario(email));
}

@GetMapping
@PreAuthorize("hasRole('ADMIN')")
public ResponseEntity<List<Prestamo>> obtenerTodosPrestamos() {
    return ResponseEntity.ok(prestamoUseCase.obtenerTodosPrestamos());
}

}
