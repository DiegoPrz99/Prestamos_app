package com.prueba.pruebamakers.application;

import com.prueba.pruebamakers.domain.model.Prestamo;
import com.prueba.pruebamakers.domain.service.PrestamoService;
import org.springframework.stereotype.Component;
import org.springframework.cache.CacheManager;

import java.util.List;

@Component
public class PrestamoUseCase {

    private final PrestamoService prestamoService;
    private final CacheManager cacheManager;

    public PrestamoUseCase(PrestamoService prestamoService, CacheManager cacheManager) {
        this.prestamoService = prestamoService;
        this.cacheManager = cacheManager;
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

    public List<Prestamo> obtenerPrestamosUsuario(String email) {
        return prestamoService.obtenerPrestamosUsuario(email);
    }

    public List<Prestamo> obtenerTodosPrestamos() {
        return prestamoService.obtenerTodosPrestamos();
    }

    public void evictCache(String email) { 
        if (cacheManager.getCache("prestamosUsuario") != null) { 
            cacheManager.getCache("prestamosUsuario").evict(email); 
        } 
    }
    
}
