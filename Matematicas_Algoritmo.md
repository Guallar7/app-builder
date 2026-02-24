# Matemáticas y Lógica del Algoritmo de Turnos

Este documento detalla el motor matemático, las heurísticas y el algoritmo base que utiliza la aplicación para generar equitativamente el cuadrante de enfermería de esterilización durante 52 semanas.

## 1. Reglas y Demandas del Servicio (Constraints)

El algoritmo parte de unas **demandas diarias de cobertura estrictas** (Requisitos o Constraint Satisfaction) que deben cumplirse cada día para garantizar el funcionamiento del servicio:

*   **Lunes a Jueves**: 1 Mañana, 5 Tardes, 3 Noches.
*   **Viernes**: 1 Mañana, 4 Tardes, 3 Noches.
*   **Fines de Semana**: 1 Mañana, 1 Tarde, 1 Noche.

### Restricciones Laborales por Trabajador (Hard Constraints)
Además, matemáticamente se programan **prohibiciones (Hard Constraints)** que el sistema no puede saltarse en ningún momento:
1.  **Doble Turno:** Está prohibido asignar más de un turno (M, T o N) al mismo trabajador en un mismo día.
2.  **Límite de Jornada Semanal:** Ningún trabajador puede sobrepasar los **5 turnos semanales**.
3.  **Descanso Post-Noche:** Si un trabajador hace el turno de Noche (N), el algoritmo automáticamente elimina y prohíbe cualquier posible asignación al día siguiente para garantizar el descanso.
4.  **Descanso Post-Tarde:** Si un trabajador tiene un turno de Tarde (T), no se le puede asignar un turno de Mañana (M) al día siguiente.

## 2. Peso y Valor de los Turnos

Para medir el impacto de forma justa, cada turno se pondera matemáticamente por su duración real:
*   **M (Mañana):** 7 Horas
*   **T (Tarde):** 7 Horas
*   **N (Noche):** 10 Horas

## 3. El Motor Principal: Algoritmo Backtracking (DFS)

Para encontrar una solución semanal que encaje todas las piezas de este rompecabezas, se utiliza un modelo de exploración de árboles de decisión llamado **Depth-First Search (DFS) con Backtracking**.

1.  **Apertura Semanal:** El sistema desglosa todas las demandas de la semana en pequeñas "casillas vacías" o *slots*. Por ejemplo, el Lunes tiene 9 casillas (1M, 5T, 3N).
2.  **Rellenado Recursivo (DFS):** El algoritmo intenta rellenar la primera casilla buscando a los trabajadores disponibles (verificando las restricciones estrictas expuestas en el Paso 1). Si puede colocar a alguien, pasa a la siguiente casilla.
3.  **Backtracking (Marcha Atrás):** Si llega a un "callejón sin salida" matemático (por ejemplo, le queda por cubrir un turno de Noche pero todos los descansos de los enfermeros lo prohíben o ya cumplieron 5 turnos a la semana), el sistema  abandona esa rama de la simulación, da "marcha atrás", deshace los últimos turnos asignados e intenta usar otro enfermero diferente para sortear el bloqueo. 
4.  **Aleatoriedad (Shuffle):** El sistema mezcla (baraja) las opciones semanalmente en la creación del "DFS" para no producir el mismo patrón de turnos aburrido o cíclico una y otra vez.

## 4. Heurística de Equidad Anual (Carga de la Mochila Horaria)

Para que al final del año (52 semanas) todos los trabajadores estén perfectamente empatados matemáticamente, no basta con generar cuadrantes semanales independientes. 

Se implementa una función comparativa, un **algoritmo heurístico** o "cerebro local", dentro del Backtracking:

1.  **La mochila de horas:** El sistema crea una variable para cada enfermero donde irá metiendo todas las "Horas" (7 o 10) consumidas durante esa simulación del año.
2.  **Ordenamiento Dinámico (`Array.sort`):** Cada vez que la IA se prepara para asignar un trabajador a un turno de cobertura diario, extrae a toda la lista de enfermeros posibles válidos, y **las reordena de menor horas de trabajo anual trabajadas a la mayor (`a.hours - b.hours`)**.
3.  **Conseguimos el empate perfecto:** El algoritmo fuerza y encaja siempre a hacer los turnos en los puestos libres a las personas que estén "debiendo" horas a la empresa en el cómputo anual. 
    *   Si los Enfermero 1 y 2 van a la par en turnos pero el Enfermero 2 siempre hace de Noche (y, por tanto, lleva una mochila horaria mucho mayor), la Inteligencia Artificial forzará matemáticamente al Enfermero 1 a coger las siguientes guardias de la próxima semana primero hasta conseguir equilibrar de nuevo la mochila entre ambos.

Esta combinación simula cientos o miles de micromovimientos con "penalizaciones y pesos en horas por empleado" permitiendo variaciones finales a terminar el año ínfimas de **cerca de ±2 horas** (empatando a casi todo el equipo para evitar conflictividad laboral).
