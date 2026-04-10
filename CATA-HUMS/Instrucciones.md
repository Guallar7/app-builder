# Instrucciones de la Aplicación

## Objetivo Principal
Herramienta clínica orientada a la consulta de oftalmología del HUMS para el manejo preoperatorio rápido y sencillo de la insulinoterapia y medicación antidiabética en pacientes sometidos a cirugía de cataratas, generando unas instrucciones claras e imprimibles para el paciente.

## Funcionalidades Clave
- **Bloque de Datos del Paciente (Opcional)**: Campos textuales para Nombre y Apellidos.
- **Selección de Tratamiento Antidiabético**: Interfaz simple con opciones combinables (Múltiple elección).
- **Cálculo Condicional de Dosis**: Si se selecciona "Insulina lenta vespertina", se muestra un campo numérico para ingresar la dosis habitual (UI) y se calcula automáticamente el 70% recomendado, redondeado a un valor entero.
- **Generación de Informe Transitable a Impresión**: Zona de resultados limpia y clara para entregar al paciente, ocultando botones y todo el ruido visual de la aplicación al usar la función nativa de impresión del navegador.
- **Extras incluídos**: Memoria local (localStorage) para agilizar consultas, fecha automática en el informe, y bloque de observaciones libres.

## Reglas de Negocio / Lógica Clínica
- **Otros antidiabéticos orales**: "Debe continuarlos igual que siempre."
- **Bomba de insulina**: "Debe continuarla como siempre." y "Debe traerla el día de la cirugía." | Nota Interna: "Esta indicación solo es válida si NO va a emplearse bisturí eléctrico. Lo habitual es no usarlo."
- **Insulina rápida/correctora**: "Sin cambios."
- **Insulina lenta matutina**: "Debe llevarla al hospital." y "Debe ponérsela DESPUÉS de la cirugía."
- **Insulina lenta vespertina**: "Debe ponerse el 70% de la dosis habitual la noche anterior a la cirugía." -> Requiere dosis habitual para procesar.

## Notas Adicionales
- La impresión oculta la interfaz. Las notas internas solo se muestran en pantalla para el oftalmólogo.
