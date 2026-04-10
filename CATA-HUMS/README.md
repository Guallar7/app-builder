# CATA-HUMS: Gestor Preoperatorio de Insulina para Cataratas

## ¿Qué es CATA-HUMS?
CATA-HUMS es una aplicación clínica sencilla y ultrarrápida diseñada exclusivamente para el manejo preoperatorio de insulina y antidiabéticos en pacientes que serán sometidos a cirugía de cataratas en el Hospital Universitario Miguel Servet (HUMS). 

Genera un parte de instrucciones automatizado, personalizado y listo para imprimir, ahorrando tiempo en consulta y evitando errores en la dosificación.

## ¿Cómo utilizarla?
1. **Ejecución estática**: Solo necesitas hacer `doble-click` sobre el archivo `index.html` para abrir la aplicación de forma local en tu navegador web. No requiere internet, servidores, ni instalaciones complejas.
2. **Introducir datos**: Rellena los datos opcionales (Nombre del paciente).
3. **Selecciona pautas**: Marca las modalidades de terapia antidiabética del paciente.
4. **Calcula**: Haz click en `Procesar`.
5. **Imprime**: Revisa que las instrucciones sean correctas y presiona `Imprimir` para enviar directamente el informe limpio a la impresora y entregárselo al paciente.

## Seguridad y Privacidad
Al ser ejecutada en navegadores directamente de disco y utilizar solo `LocalStorage` (que no sale de tu ordenador), no existe riesgo de filtración de datos sanitarios a la red. Las opciones marcadas de pautas previas pueden quedar en memoria para el siguiente paciente (para ser más ágil). Múltiples consultas simultáneas usarán perfiles limpios por pestaña siempre que lo requieras pulsar "Reiniciar".
