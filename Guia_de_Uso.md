# Guía de Uso: Generador de Turnos (Esterilización) 🏥

¡Bienvenido/a al Generador Automático de Turnos! Esta herramienta ha sido diseñada especialmente para crear un cuadrante de forma automática, respetando todas las reglas de descanso y cobertura de forma matemática.

Al ser una aplicación web estática, **no necesitas instalar ningún programa** ni conectarte a internet para que funcione.

---

## 👩‍💻 Cómo abrir la aplicación

1. Abre el explorador de archivos de Windows y dirígete a la carpeta donde guardaste el proyecto:
   `c:\Users\david\OneDrive\Escritorio\programacion\Rueda enfermeria`
2. Busca el archivo llamado **`index.html`** (puede aparecer con el ícono de Google Chrome, Edge o tu navegador favorito).
3. Haz **doble clic** sobre `index.html`.
4. ¡Listo! Se abrirá una pestaña nueva en tu navegador con la interfaz del generador.

---

## 🔍 Entendiendo la Interfaz

Al abrir la aplicación, verás de inmediato un panel con fondo oscuro (para cuidar la vista) y una tabla central.

*   **Filas (Izquierda):** Muestran a los 12 enfermeros/as (Numerados del E1 al E12).
*   **Columnas (Centro):** Los días de la semana (Lunes a Domingo).
*   **Columna Final (Derecha):** El conteo "Total" de turnos que el algoritmo le ha asignado a esa persona en esta semana (el máximo es 5 turnos y el mínimo 4 para repartir todo de manera justa).

### Leyenda de Colores
En la parte inferior de la tabla o en las propias celdas verás letras de colores:
*   🔵 **M (Mañana):** Turno de Mañana. Su color es azul claro.
*   🟠 **T (Tarde):** Turno de Tarde. Su color es naranja.
*   🔴 **N (Noche):** Turno de Noche. Su color es rojo.

---

## 🔄 Cómo generar un Cuadrante Nuevo

Cada vez que abres la página por primera vez, el sistema hace los cálculos y genera un cuadrante completamente válido. 

Si el resultado no te convence, o si quieres generar el cuadrante para la *siguiente semana*:
1. Busca el botón azul brillante en la parte superior derecha que dice **"✨ Generar Nuevo Cuadrante"**.
2. Haz clic en él.
3. El algoritmo barajará las posiciones aleatoriamente y creará un **nuevo modelo de cuadrante** en 1 segundo, respetando siempre todas las reglas estrictas (no hacer Noche y trabajar al día siguiente, no empalmar Tarde y Mañana, etc).

---

## 🖨️ Cómo imprimir o guardar el resultado
Como por ahora la herramienta es sencilla y de visualización, si necesitas compartir este cuadrante:
1. Con la tabla en pantalla, puedes pulsar en tu teclado `Ctrl + P` para imprimir la pantalla directamente en papel.
2. También puedes usar la herramienta "Recortes" (Snipping Tool) de Windows (`Windows + Shift + S`) para tomarle una foto a la tabla y enviarla por correo o WhatsApp a tu equipo.

¡Espero que te sea de gran utilidad y te ahorre muchas horas de cálculo manual de cuadrantes! Todo el peso matemático de equilibrar el trabajo y los descansos lo hace el sistema por ti.
