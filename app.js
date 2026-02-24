const WORKERS = 12;
const DAYS = 7;
const SHIFT_M = 'M';
const SHIFT_T = 'T';
const SHIFT_N = 'N';
const DAY_NAMES = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

// Necesidades de cobertura de turnos por día
const REQ = [
    { M: 1, T: 5, N: 3 }, // Lunes
    { M: 1, T: 5, N: 3 }, // Martes
    { M: 1, T: 5, N: 3 }, // Miércoles
    { M: 1, T: 5, N: 3 }, // Jueves
    { M: 1, T: 4, N: 3 }, // Viernes
    { M: 1, T: 1, N: 1 }, // Sábado
    { M: 1, T: 1, N: 1 }  // Domingo
];

// Preparamos los "huecos" a rellenar: un slot por cada trabajador que necesitamos
const slots = [];
REQ.forEach((req, day) => {
    for (let i = 0; i < req.M; i++) slots.push({ day, shift: SHIFT_M });
    for (let i = 0; i < req.T; i++) slots.push({ day, shift: SHIFT_T });
    for (let i = 0; i < req.N; i++) slots.push({ day, shift: SHIFT_N });
});

// Función matemática para generar un cuadrante válido usando Backtracking (DFS)
function generateSchedule() {
    let best_schedule = null;
    let worker_schedule = Array.from({ length: WORKERS }, () => new Array(DAYS).fill(''));
    let worker_counts = new Array(WORKERS).fill(0);

    // Función auxiliar para barajar un array aleatoriamente (Fisher-Yates)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function dfs(idx) {
        // Encontramos solución válida!
        if (idx === slots.length) {
            return true;
        }

        const slot = slots[idx];
        const day = slot.day;
        const shift = slot.shift;

        let validWorkers = [];
        for (let w = 0; w < WORKERS; w++) {
            // Ya tiene un turno el mismo día
            if (worker_schedule[w][day] !== '') continue;
            // Balance equitativo: Límite matemático estricto de 5 turnos a la semana máximo
            if (worker_counts[w] >= 5) continue;

            // Regla de transición (día previo)
            if (day > 0) {
                const prevShift = worker_schedule[w][day - 1];
                // Después de cada turno Noche, no se trabaja al día siguiente (ni un solo turno)
                if (prevShift === SHIFT_N) continue;
                // Después de cada "Tarde" no puede haber una "Mañana"
                if (prevShift === SHIFT_T && shift === SHIFT_M) continue;
            }

            validWorkers.push(w);
        }

        // Optimización Heurística para Backtracking:
        // Priorizar empleados con MENOS turnos trabajados, y desempatar aleatoriamente
        // para asegurar diversidad generacional
        shuffleArray(validWorkers);
        validWorkers.sort((a, b) => worker_counts[a] - worker_counts[b]);

        for (let w of validWorkers) {
            // Asignar
            worker_schedule[w][day] = shift;
            worker_counts[w]++;

            // Recursión para el siguiente hueco
            if (dfs(idx + 1)) return true;

            // Backtracking: Deshacer
            worker_counts[w]--;
            worker_schedule[w][day] = '';
        }

        return false;
    }

    const found = dfs(0);
    if (found) {
        return worker_schedule;
    }
    return null;
}

// Interfaz de Usuario: DOM
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('generateBtn');
    const tbody = document.getElementById('scheduleBody');
    const overlay = document.getElementById('loadingOverlay');

    function renderSchedule() {
        // Envolver en setTimeout para permitir que el DOM renderice el loading overlay
        overlay.classList.remove('hidden');

        setTimeout(() => {
            const schedule = generateSchedule();

            if (!schedule) {
                alert("No se ha encontrado ninguna distribución válida con estas reglas estrictas.");
            } else {
                tbody.innerHTML = '';

                let statsHTML = '';
                let totalAssigned = 0;

                schedule.forEach((workerDays, workerIdx) => {
                    const tr = document.createElement('tr');

                    // Columna Empleado
                    const workerTd = document.createElement('td');
                    workerTd.innerHTML = `
                        <div class="worker-name">
                            <div class="avatar">E${workerIdx + 1}</div>
                            Enfermero/a ${workerIdx + 1}
                        </div>
                    `;
                    tr.appendChild(workerTd);

                    // Columnas Días
                    let count = 0;
                    workerDays.forEach(shift => {
                        const td = document.createElement('td');
                        if (shift !== '') {
                            td.innerHTML = `<span class="shift-tag shift-${shift}">${shift}</span>`;
                            count++;
                        } else {
                            td.innerHTML = `<span class="shift-tag shift-"></span>`;
                        }
                        tr.appendChild(td);
                    });

                    // Columna Total
                    const totalTd = document.createElement('td');
                    totalTd.innerHTML = `<span class="total-count">${count}</span>`;
                    tr.appendChild(totalTd);

                    tbody.appendChild(tr);
                    totalAssigned += count;
                });

                // Generar fila de totales
                const tfoot = document.getElementById('scheduleFoot');
                if (tfoot) {
                    tfoot.innerHTML = '';
                    const tr = document.createElement('tr');
                    tr.style.background = 'rgba(0,0,0,0.2)';
                    tr.style.borderTop = '2px solid var(--border-color)';

                    const labelTd = document.createElement('td');
                    labelTd.innerHTML = '<div class="worker-name" style="justify-content: flex-end; color: var(--text-secondary);"><strong>Suma M/T/N</strong></div>';
                    tr.appendChild(labelTd);

                    for (let day = 0; day < DAYS; day++) {
                        let countM = 0;
                        let countT = 0;
                        let countN = 0;

                        schedule.forEach(workerDays => {
                            if (workerDays[day] === SHIFT_M) countM++;
                            else if (workerDays[day] === SHIFT_T) countT++;
                            else if (workerDays[day] === SHIFT_N) countN++;
                        });

                        const td = document.createElement('td');
                        td.innerHTML = `
                            <div style="display: flex; gap: 4px; justify-content: center; opacity: 0.9;">
                                <span class="badge m-badge" style="width: 20px; height: 20px; font-size: 0.7rem;">${countM}</span>
                                <span class="badge t-badge" style="width: 20px; height: 20px; font-size: 0.7rem;">${countT}</span>
                                <span class="badge n-badge" style="width: 20px; height: 20px; font-size: 0.7rem;">${countN}</span>
                            </div>
                        `;
                        tr.appendChild(td);
                    }

                    const totalTd = document.createElement('td');
                    totalTd.innerHTML = `<span class="total-count">${totalAssigned}</span>`;
                    tr.appendChild(totalTd);

                    tfoot.appendChild(tr);
                }
            }
            overlay.classList.add('hidden');
        }, 100);
    }

    btn.addEventListener('click', renderSchedule);

    // Auto-generar inicial
    renderSchedule();
});
