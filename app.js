const WORKERS = 12;
const DAYS = 7;
const YEAR_WEEKS = 52;

const SHIFT_M = 'M';
const SHIFT_T = 'T';
const SHIFT_N = 'N';

const REQ = [
    { M: 1, T: 5, N: 3 }, // Lunes
    { M: 1, T: 5, N: 3 }, // Martes
    { M: 1, T: 5, N: 3 }, // Miércoles
    { M: 1, T: 5, N: 3 }, // Jueves
    { M: 1, T: 4, N: 3 }, // Viernes
    { M: 1, T: 1, N: 1 }, // Sábado
    { M: 1, T: 1, N: 1 }  // Domingo
];

const slots = [];
REQ.forEach((req, day) => {
    for (let i = 0; i < req.M; i++) slots.push({ day, shift: SHIFT_M });
    for (let i = 0; i < req.T; i++) slots.push({ day, shift: SHIFT_T });
    for (let i = 0; i < req.N; i++) slots.push({ day, shift: SHIFT_N });
});

let globalYearSchedule = null;
let globalYearlyCounts = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generateWeekSchedule(prevSundayShifts, yearlyCounts) {
    let worker_schedule = Array.from({ length: WORKERS }, () => new Array(DAYS).fill(''));
    let weekly_counts = new Array(WORKERS).fill(0);

    function dfs(idx) {
        if (idx === slots.length) return true;

        const slot = slots[idx];
        const day = slot.day;
        const shift = slot.shift;

        let validWorkers = [];
        for (let w = 0; w < WORKERS; w++) {
            if (worker_schedule[w][day] !== '') continue;
            if (weekly_counts[w] >= 5) continue;

            let prevShift = '';
            if (day > 0) {
                prevShift = worker_schedule[w][day - 1];
            } else if (prevSundayShifts) {
                prevShift = prevSundayShifts[w];
            }

            if (prevShift === SHIFT_N) continue;
            if (prevShift === SHIFT_T && shift === SHIFT_M) continue;

            validWorkers.push(w);
        }

        // Priority heuristics: least shifts worked this year total
        shuffleArray(validWorkers);
        validWorkers.sort((a, b) => yearlyCounts[a] - yearlyCounts[b]);

        for (let w of validWorkers) {
            worker_schedule[w][day] = shift;
            weekly_counts[w]++;
            yearlyCounts[w]++;

            if (dfs(idx + 1)) return true;

            yearlyCounts[w]--;
            weekly_counts[w]--;
            worker_schedule[w][day] = '';
        }
        return false;
    }

    if (dfs(0)) return worker_schedule;
    return null;
}

function generateYear() {
    let yearSchedule = [];
    let yearlyCounts = new Array(WORKERS).fill(0);
    let prevSundayShifts = null;

    for (let week = 0; week < YEAR_WEEKS; week++) {
        // En caso de que se atasque muy puntual por "callejón sin salida"
        // Le damos hasta 3 intentos a esa semana barajando diferente
        let success = false;
        let originalYearlyCounts = [...yearlyCounts];

        for (let attempt = 0; attempt < 10; attempt++) {
            // Restore counts if retry
            yearlyCounts = [...originalYearlyCounts];
            const weekSchedule = generateWeekSchedule(prevSundayShifts, yearlyCounts);
            if (weekSchedule) {
                yearSchedule.push(weekSchedule);
                // Extraer lo trabajado el domingo para la siguiente semana
                prevSundayShifts = weekSchedule.map(w => w[6]);
                success = true;
                break;
            }
        }

        if (!success) {
            console.error("No se pudo generar la semana", week);
            return null;
        }
    }

    globalYearSchedule = yearSchedule;
    globalYearlyCounts = yearlyCounts;
    return true;
}

function calculateDetailedYearStats() {
    let detailedStats = Array.from({ length: WORKERS }, () => ({ M: 0, T: 0, N: 0, Total: 0 }));

    if (globalYearSchedule) {
        globalYearSchedule.forEach(weekSchedule => {
            weekSchedule.forEach((workerDays, workerIdx) => {
                workerDays.forEach(shift => {
                    if (shift === SHIFT_M) detailedStats[workerIdx].M++;
                    else if (shift === SHIFT_T) detailedStats[workerIdx].T++;
                    else if (shift === SHIFT_N) detailedStats[workerIdx].N++;

                    if (shift !== '') detailedStats[workerIdx].Total++;
                });
            });
        });
    }
    return detailedStats;
}

// UI
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('generateBtn');
    const tbody = document.getElementById('scheduleBody');
    const overlay = document.getElementById('loadingOverlay');
    const weekSelector = document.getElementById('weekSelector');
    const yearStats = document.getElementById('yearStats');

    // Popular selector de semanas
    for (let i = 0; i < YEAR_WEEKS; i++) {
        let opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = `Semana ${i + 1}`;
        weekSelector.appendChild(opt);
    }

    function renderActiveWeek() {
        if (!globalYearSchedule) return;
        const weekIdx = parseInt(weekSelector.value);
        const schedule = globalYearSchedule[weekIdx];

        tbody.innerHTML = '';
        // Constants for hour calculations
        const HOURS_M = 7;
        const HOURS_T = 7;
        const HOURS_N = 10;

        let totalAssigned = 0;
        let totalHoursAssigned = 0;

        schedule.forEach((workerDays, workerIdx) => {
            const tr = document.createElement('tr');

            const workerTd = document.createElement('td');
            workerTd.innerHTML = `
                <div class="worker-name">
                    <div class="avatar">E${workerIdx + 1}</div>
                    E${workerIdx + 1}
                </div>
            `;
            tr.appendChild(workerTd);

            let count = 0;
            let weeklyHours = 0;

            workerDays.forEach(shift => {
                const td = document.createElement('td');
                if (shift !== '') {
                    td.innerHTML = `<span class="shift-tag shift-${shift}">${shift}</span>`;
                    count++;

                    if (shift === SHIFT_M) weeklyHours += HOURS_M;
                    else if (shift === SHIFT_T) weeklyHours += HOURS_T;
                    else if (shift === SHIFT_N) weeklyHours += HOURS_N;

                } else {
                    td.innerHTML = `<span class="shift-tag shift-"></span>`;
                }
                tr.appendChild(td);
            });

            // Count column
            const countTd = document.createElement('td');
            countTd.innerHTML = `<span class="total-count">${count}</span>`;
            tr.appendChild(countTd);

            // Hours column
            const hoursTd = document.createElement('td');
            hoursTd.innerHTML = `<span class="total-count" style="background: rgba(139, 92, 246, 0.4);">${weeklyHours}h</span>`;
            tr.appendChild(hoursTd);

            tbody.appendChild(tr);
            totalAssigned += count;
            totalHoursAssigned += weeklyHours;
        });

        // TFoot totales
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
                let countM = 0; let countT = 0; let countN = 0;
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

            const totalHoursTd = document.createElement('td');
            totalHoursTd.innerHTML = `<span class="total-count" style="background: rgba(139, 92, 246, 0.4);">${totalHoursAssigned}h</span>`;
            tr.appendChild(totalHoursTd);

            tfoot.appendChild(tr);
        }

        // Year stats display
        let min = Math.min(...globalYearlyCounts);
        let max = Math.max(...globalYearlyCounts);
        yearStats.innerHTML = `Desviación total/empleado: min <b>${min}</b> - max <b>${max}</b> turnos`;

        // Detailed Year Stats per Worker
        const detailedStatsDiv = document.getElementById('detailedYearStats');
        if (detailedStatsDiv) {
            detailedStatsDiv.innerHTML = '';
            const stats = calculateDetailedYearStats();

            stats.forEach((workerStat, idx) => {
                const totalYearlyHours = (workerStat.M * HOURS_M) + (workerStat.T * HOURS_T) + (workerStat.N * HOURS_N);

                const card = document.createElement('div');
                card.style.background = 'rgba(0,0,0,0.2)';
                card.style.border = '1px solid var(--border-color)';
                card.style.borderRadius = '8px';
                card.style.padding = '10px';

                card.innerHTML = `
                    <div style="font-weight: 600; font-size: 0.95rem; margin-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 4px; display: flex; justify-content: space-between;">
                        <span>
                            <span class="avatar" style="width: 20px; height: 20px; font-size: 0.6rem; display: inline-flex; margin-right: 5px;">E${idx + 1}</span>
                            Enfermero/a ${idx + 1}
                        </span>
                        <span style="color: var(--primary-color);">${totalYearlyHours}h / año</span>
                    </div>
                    <div style="display: flex; gap: 8px; font-size: 0.85rem; color: var(--text-secondary);">
                        <span title="Total Mañanas"><span style="color: var(--shift-m)">M</span>: ${workerStat.M}</span>
                        <span title="Total Tardes"><span style="color: var(--shift-t)">T</span>: ${workerStat.T}</span>
                        <span title="Total Noches"><span style="color: var(--shift-n)">N</span>: ${workerStat.N}</span>
                        <strong style="margin-left: auto; color: white;">Total: ${workerStat.Total}</strong>
                    </div>
                `;
                detailedStatsDiv.appendChild(card);
            });
        }
    }

    weekSelector.addEventListener('change', renderActiveWeek);

    function startGeneration() {
        overlay.classList.remove('hidden');
        overlay.querySelector('p').innerText = "Generando 52 semanas matemáticas (esto puede tomar un momento)...";

        setTimeout(() => {
            const success = generateYear();
            if (!success) {
                alert("Hubo un bloqueo matemático muy complejo al conectar las 52 semanas. Por favor, intenta de nuevo.");
            } else {
                weekSelector.value = 0;
                renderActiveWeek();
            }
            overlay.classList.add('hidden');
        }, 100);
    }

    btn.addEventListener('click', startGeneration);
    startGeneration(); // Genera al cargar

    // Función de exportación a CSV (Excel)
    const exportBtn = document.getElementById('exportBtn');
    exportBtn.addEventListener('click', () => {
        if (!globalYearSchedule) {
            alert("No hay datos para exportar. Genera primero el año.");
            return;
        }

        const HOURS_M = 7;
        const HOURS_T = 7;
        const HOURS_N = 10;

        // Cabeceras CSV con punto y coma
        let csvContent = "\uFEFF";
        csvContent += "Semana;Trabajador;Lunes;Martes;Miércoles;Jueves;Viernes;Sábado;Domingo;Total Turnos;Total Horas\n";

        globalYearSchedule.forEach((weekSchedule, weekIdx) => {
            weekSchedule.forEach((workerDays, workerIdx) => {
                let row = `Semana ${weekIdx + 1};E${workerIdx + 1};`;
                let count = 0;
                let hours = 0;

                workerDays.forEach(shift => {
                    row += `${shift};`;
                    if (shift !== '') {
                        count++;
                        if (shift === SHIFT_M) hours += HOURS_M;
                        else if (shift === SHIFT_T) hours += HOURS_T;
                        else if (shift === SHIFT_N) hours += HOURS_N;
                    }
                });
                row += `${count};${hours}h\n`;
                csvContent += row;
            });
            csvContent += ";;;;;;;;;;\n";
        });

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "Cuadrante_Esterilizacion_52Semanas.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
