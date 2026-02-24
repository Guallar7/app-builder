# Instrucciones de la Aplicación

## Objetivo Principal
Crear una automatización para asignar puestos de trabajo de enfermeria en el área de Esterilización, generando un cuadrante de turnos equitativo que respete de forma estricta los descansos legales de los trabajadores.

## Funcionalidades Clave
- Generar un cuadrante semanal equilibrado para 12 trabajadores (E1 a E12).
- Distribuir tres tipos de turnos diarios: Mañana, Tarde y Noche.
- Asegurar la cobertura exacta por días: 
  - Lunes a Jueves: 1 Mañana, 5 Tardes, 3 Noches.
  - Viernes: 1 Mañana, 4 Tardes, 3 Noches.
  - Sábados y Domingos: 1 Mañana, 1 Tarde, 1 Noche.

## Reglas de Negocio / Lógica
- **Regla 1**: Después de cada turno de Noche, el trabajador no puede trabajar al día siguiente (día de descanso obligatorio).
- **Regla 2**: Un trabajador no puede hacer 2 turnos seguidos en el mismo día (ej. Mañana y luego Tarde).
- **Regla 3**: Después de realizar un turno de "Tarde", el trabajador no puede tener un turno de "Mañana" al día siguiente.
