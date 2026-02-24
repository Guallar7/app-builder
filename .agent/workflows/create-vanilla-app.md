---
description: Scaffold a premium Vanilla HTML/CSS/JS web application
---

This workflow defines the standard process for generating a high-quality, zero-build-step web application using pure HTML5, vanilla CSS, and vanilla JavaScript. 

The goal is to create a premium, modern user interface without relying on heavy frameworks (like React or Vue) or build tools (like Webpack or Vite), maximizing portability and ease of use for non-developers.

## 1. Architectural Principles
*   **Static Execution:** The app must be fully functional by simply opening the `index.html` file in a browser. No local servers (`npm run dev`) or backend required unless explicitly requested.
*   **Separation of Concerns:** 
    *   `index.html`: Pure semantic structure. No inline styles.
    *   `style.css`: All styling, using a robust CSS Variable design system.
    *   `app.js`: Application logic and DOM manipulation. No inline `<script>` tags in HTML.
*   **Documentation:** Always generate a `README.md` (User Guide & Setup) and `Instrucciones.md` (Technical constraints/logic) alongside the code.

## 2. Design Constraints (Premium UI)
To ensure the application looks premium and modern, adhere strictly to the following CSS rules:
*   **Typography:** Import and use modern fonts like `Inter`, `Roboto`, or `Outfit` from Google Fonts. Do NOT use default browser fonts (Times New Roman, Arial).
*   **Color Palette (CSS Variables):** Define a harmonious color palette in `:root`. Include `--primary-color`, `--secondary-color`, `--background-dark` (or light), `--surface-color`, `--text-primary`, `--border-color`. Avoid raw, generic colors (e.g., `red`, `blue`).
*   **Layout:** Use modern CSS Layouts (`display: flex` and `display: grid`). Avoid floats or absolute positioning for structural layouts.
*   **Aesthetics:** 
    *   Use generous padding (`1rem` to `2rem`).
    *   Apply subtle rounded corners (`border-radius: 8px` or `12px`).
    *   Add soft box-shadows to floating elements or cards (`box-shadow: 0 4px 6px rgba(0,0,0,0.1)`).
    *   Implement smooth transitions on interactive elements (`transition: all 0.2s ease`).
    *   Ensure an excellent hover state for buttons.
*   **Responsiveness:** Use `@media` queries to ensure the design is usable on mobile devices.

## 3. Workflow Steps

Follow these exact steps when the user asks to create an app using this workflow.

// turbo-all

**Step 1: Ask for app name and set up the requirements**
1. Ask the user for an **app name** (e.g., "mi_calculadora_clinica", "gestor_pacientes")
2. Create a **dedicated folder** with that name (e.g., `mi_calculadora_clinica/`)
3. Create `Instrucciones.md` inside that folder with the following template and ask the user to fill it out:
*   `Instrucciones.md`:
```markdown
# Instrucciones de la Aplicación

## Objetivo Principal
[Describe qué hace la aplicación en 1-2 frases]

## Funcionalidades Clave
- [Funcionalidad 1]
- [Funcionalidad 2]

## Reglas de Negocio / Lógica
- [Regla 1]
- [Regla 2]
```
PAUSE: Wait for the user to provide the requirements before continuing.

**Step 2: Set up the workspace**
Create the necessary files **inside the dedicated app folder** based on the instructions:
*   `index.html`
*   `style.css`
*   `app.js`
*   `README.md` (User guide explaining how to open and use the app)

**Step 3: Generate `index.html`**
Write valid HTML5 boilerplate.
*   Include viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
*   Link to Google Fonts.
*   Link to `style.css`.
*   Link to `app.js` just before the closing `</body>` tag.
*   Create a semantic structure (`<header>`, `<main>`, `<footer>`, `<section>`).

**Step 4: Generate `style.css`**
Set up the design system.
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

:root {
    --bg-color: #0f172a; /* Example dark mode */
    --surface-color: #1e293b;
    --primary-color: #3b82f6;
    --text-primary: #f8fafc;
    --text-secondary: #94a3b8;
    --border-radius: 12px;
}

body {
    font-family: 'Inter', sans-serif;
    background-color: var(--bg-color);
    color: var(--text-primary);
    margin: 0;
    padding: 2rem;
    box-sizing: border-box;
}

/* Add premium styling for buttons, cards, and inputs here */
```

**Step 5: Generate `app.js`**
Implement the logic using modern JavaScript (ES6+).
*   Use `const` and `let`.
*   Use Arrow Functions.
*   Wait for DOM content to load before attaching event listeners.
*   Keep functions small and focused.

**Step 6: Write Documentation**
*   **`README.md`**: Explain to the user (who might be non-technical) that they only need to double-click `index.html` to run the app. No installation needed. Include a brief overview of what the app does based on `Instrucciones.md`.

## 4. Final Review
Before notifying the user, verify:
*   Does it run without a server?
*   Is the design premium (fonts, shadows, radiuses)?
*   Are no frameworks used?