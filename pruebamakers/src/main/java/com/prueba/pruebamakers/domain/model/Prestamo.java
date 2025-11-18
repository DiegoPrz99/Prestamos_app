package com.prueba.pruebamakers.domain.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "prestamos")
public class Prestamo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Min(100)
    private double monto;

    @Min(1)
    private int plazo;

    @Enumerated(EnumType.STRING)
    private EstadoPrestamo estado;

    private String usuarioEmail;
}