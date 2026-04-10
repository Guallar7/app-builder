// Variables y Nodos DOM
const STORAGE_KEY = 'cataHumsState';

const UI = {
    formSection: document.getElementById('form-section'),
    printSection: document.getElementById('print-section'),
    
    // Inputs
    checkLentaVespertina: document.getElementById('chk-lenta-vespertina'),
    dosisContainer: document.getElementById('dosis-vespertina-container'),
    dosisInput: document.getElementById('dosis-habitual'),
    dosisError: document.getElementById('dosis-error'),
    
    nombreInput: document.getElementById('paciente-nombre'),
    observacionesInput: document.getElementById('observaciones'),
    checkboxes: document.querySelectorAll('input[type="checkbox"]'),
    
    // Botones
    btnProcesar: document.getElementById('btn-procesar'),
    btnReiniciar: document.getElementById('btn-reiniciar'),
    btnImprimir: document.getElementById('btn-imprimir'),
    btnVolver: document.getElementById('btn-volver'),
    
    // Nodos de Impresión
    printPatientInfo: document.getElementById('print-patient-info'),
    printDate: document.getElementById('print-date'),
    printInstructionsList: document.getElementById('print-instructions-list'),
    printObsContainer: document.getElementById('print-observations-container'),
    printObsText: document.getElementById('print-observations'),
    
    // Nodos Notas Internas
    internalNotesContainer: document.getElementById('internal-notes-container'),
    internalNotesList: document.getElementById('internal-notes-list')
};

// =========================================
// INICIALIZACIÓN
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    bindEvents();
    loadState();
});

function bindEvents() {
    // Alerta/Despliegue de dosis
    UI.checkLentaVespertina.addEventListener('change', (e) => {
        if(e.target.checked) {
            UI.dosisContainer.classList.add('show');
        } else {
            UI.dosisContainer.classList.remove('show');
            UI.dosisInput.parentElement.classList.remove('has-error');
        }
        saveState();
    });

    // Guardado automático onChange
    UI.checkboxes.forEach(chk => chk.addEventListener('change', saveState));
    UI.dosisInput.addEventListener('input', saveState);

    // Acciones principales
    UI.btnProcesar.addEventListener('click', handleProcess);
    UI.btnReiniciar.addEventListener('click', handleReset);
    UI.btnVolver.addEventListener('click', handleBack);
    UI.btnImprimir.addEventListener('click', () => window.print());
}

// =========================================
// LÓGICA CLÍNICA Y PROCESAMIENTO
// =========================================
function handleProcess() {
    // 1. Validar
    if (!validateForm()) return;

    // 2. Extraer opciones marcadas
    const selectedTreatments = Array.from(UI.checkboxes)
        .filter(chk => chk.checked)
        .map(chk => chk.value);

    // Early return: Asegurarse de que hay al menos una opción marcada?
    // Aunque un paciente podría estar "solo dieta", la app está diseñada para manejo farmaco.
    if(selectedTreatments.length === 0) {
        alert("Por favor, seleccione al menos una opción de tratamiento.");
        return;
    }

    // 3. Limpiar áreas de resultados
    UI.printInstructionsList.innerHTML = '';
    UI.internalNotesList.innerHTML = '';
    
    let hasInternalNotes = false;

    // 4. Evaluar Reglas Clínicas
    selectedTreatments.forEach(tratamiento => {
        let title = '';
        let desc = '';
        let highlighted = false;

        switch (tratamiento) {
            case 'orales':
                title = 'Comprimidos / Otros antidiabéticos orales';
                desc = 'Debe continuarlos igual que siempre.';
                break;
            case 'bomba':
                title = 'Bomba de Insulina';
                desc = 'Debe continuarla como siempre y <strong>debe traerla el día de la cirugía.</strong>';
                // Agregar nota interna
                hasInternalNotes = true;
                const li = document.createElement('li');
                li.innerHTML = '<strong>Bomba de insulina:</strong> Esta indicación solo es válida si NO va a emplearse bisturí eléctrico. Lo habitual es <u>no usar bisturí eléctrico</u> en este procedimiento.';
                UI.internalNotesList.appendChild(li);
                break;
            case 'rapida':
                title = 'Insulina Rápida / Correctora';
                desc = 'Sin cambios.';
                break;
            case 'matutina':
                title = 'Insulina Lenta Matutina';
                desc = 'Debe llevarla al hospital. <strong>Debe ponérsela DESPUÉS de la cirugía.</strong>';
                break;
            case 'vespertina':
                const dosisIntroducida = parseFloat(UI.dosisInput.value);
                const dosisCalculada = Math.round(dosisIntroducida * 0.70);
                title = 'Insulina Lenta Vespertina (Noche previa)';
                desc = `Debe ponerse el <strong>70% de su dosis habitual</strong> la noche anterior a la cirugía.<br><br>
                       ➔ Su dosis habitual: ${dosisIntroducida} UI<br>
                       ➔ <strong>Debe ponerse: <span style="font-size: 1.2em; color: var(--primary-color)">${dosisCalculada} UI</span> la noche previa.</strong>`;
                highlighted = true;
                break;
        }

        // Crear elemento HTML
        if (title) {
            const div = document.createElement('div');
            div.className = `instruction-item ${highlighted ? 'highlighted' : ''}`;
            div.innerHTML = `<h5>${title}</h5><p>${desc}</p>`;
            UI.printInstructionsList.appendChild(div);
        }
    });

    // 5. Mostrar / Ocultar notas internas
    if (hasInternalNotes) {
        UI.internalNotesContainer.classList.remove('hidden');
    } else {
        UI.internalNotesContainer.classList.add('hidden');
    }

    // 6. Rellenar Metadatos del informe
    const patientName = UI.nombreInput.value.trim();
    UI.printPatientInfo.innerHTML = patientName ? `<strong>Paciente:</strong> ${patientName}` : '';
    
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth()+1).toString().padStart(2, '0')}/${today.getFullYear()}`;
    UI.printDate.innerHTML = `<strong>Fecha:</strong> ${formattedDate}`;

    // 7. Observaciones adicionales
    const obs = UI.observacionesInput.value.trim();
    if (obs) {
        UI.printObsText.textContent = obs;
        UI.printObsContainer.classList.remove('hidden');
    } else {
        UI.printObsContainer.classList.add('hidden');
    }

    // 8. Transición de UI
    UI.formSection.classList.add('hidden');
    UI.printSection.classList.remove('hidden');
    window.scrollTo(0, 0);
}

function validateForm() {
    let isValid = true;
    
    if (UI.checkLentaVespertina.checked) {
        const value = parseInt(UI.dosisInput.value, 10);
        if (isNaN(value) || value <= 0) {
            UI.dosisInput.parentElement.classList.add('has-error');
            isValid = false;
        } else {
            UI.dosisInput.parentElement.classList.remove('has-error');
        }
    }

    return isValid;
}

function handleBack() {
    UI.printSection.classList.add('hidden');
    UI.formSection.classList.remove('hidden');
}

function handleReset() {
    if(confirm('¿Estás seguro de querer reiniciar el formulario?')) {
        document.getElementById('cata-form').reset();
        UI.dosisContainer.classList.remove('show');
        UI.dosisInput.parentElement.classList.remove('has-error');
        localStorage.removeItem(STORAGE_KEY);
    }
}

// =========================================
// LOCAL STORAGE (PRESERVACIÓN DE ESTADO)
// =========================================
function saveState() {
    // Solo guardamos configuraciones pesadas para agilizar, no nombres por default.
    const state = {
        orales: document.getElementById('chk-orales').checked,
        bomba: document.getElementById('chk-bomba').checked,
        rapida: document.getElementById('chk-rapida').checked,
        matutina: document.getElementById('chk-lenta-matutina').checked,
        vespertina: UI.checkLentaVespertina.checked,
        dosis: UI.dosisInput.value
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
        const state = JSON.parse(saved);
        
        document.getElementById('chk-orales').checked = !!state.orales;
        document.getElementById('chk-bomba').checked = !!state.bomba;
        document.getElementById('chk-rapida').checked = !!state.rapida;
        document.getElementById('chk-lenta-matutina').checked = !!state.matutina;
        
        UI.checkLentaVespertina.checked = !!state.vespertina;
        if (state.vespertina) {
            UI.dosisContainer.classList.add('show');
            if(state.dosis) UI.dosisInput.value = state.dosis;
        }
        
    } catch (e) {
        console.warn("Estado guardado corrupto. Limpiando.");
        localStorage.removeItem(STORAGE_KEY);
    }
}
