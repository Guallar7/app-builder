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

### **PHASE 1: DISCOVERY & REQUIREMENTS** (Interactive Dialog)

**Step 1: Understand the user's vision**

Start a conversation with the user to deeply understand what they want to build. Ask targeted questions:
- What problem are they solving?
- Who will use this app? (doctors, nurses, patients, etc.)
- What are the main tasks the app should do?
- Any specific calculations or logic needed?

Listen carefully and ask follow-up questions until you understand clearly.

**Step 2: Suggest and agree on an app name**

Based on the conversation, suggest 2-3 app names (in lowercase with underscores, e.g., `calculadora_dosis`, `gestor_pacientes_uci`).

Ask the user to choose or suggest their own name.

IMPORTANT: The name should be descriptive and relevant to the app's purpose.

**Step 3: Write the Instrucciones.md (Draft)**

Based on your conversation, write a **complete and detailed** `Instrucciones.md` file with this structure:

```markdown
# Instrucciones de la Aplicación

## Objetivo Principal
[1-2 sentence summary of what the app does and who uses it]

## Funcionalidades Clave
- [Feature 1 - specific and detailed]
- [Feature 2 - specific and detailed]
- [Feature 3]

## Reglas de Negocio / Lógica
- [Rule 1: Clear business logic or calculation rules]
- [Rule 2]
- [Rule 3]

## Notas Adicionales
[Any special requirements, edge cases, or important considerations]
```

**IMPORTANT**: This should be detailed, not generic. Example:
- ✅ Good: "Calculate pediatric medication dose based on weight in kg, using standard mg/kg/day dosing. Show warning if dose exceeds 100mg/day."
- ❌ Bad: "Medication calculator"

**Step 4: Show the draft to the user and request feedback**

Display the `Instrucciones.md` you wrote to the user and ask:
- "Does this accurately describe what you want?"
- "Is anything missing or incorrect?"
- "Would you like to add, remove, or change anything?"

PAUSE: Wait for the user's feedback. If they request changes, modify the `Instrucciones.md` and show it again.

**Step 5: User approves and you create the workspace**

Once the user confirms the instructions are correct, proceed:

1. Create a **dedicated folder** named after the app (e.g., `calculadora_dosis/`)
2. Create `Instrucciones.md` **inside that folder** with the final, approved content
3. Announce: "✅ App folder and instructions created! Ready to build your app."

### **PHASE 2: BUILD THE APPLICATION**

**Step 6: Set up the workspace files**

Create the necessary files **inside the dedicated app folder** based on the approved instructions:
*   `index.html`
*   `style.css`
*   `app.js`
*   `README.md` (User guide explaining how to open and use the app)

**Step 7: Generate `index.html`**
Write valid HTML5 boilerplate.
*   Include viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
*   Link to Google Fonts.
*   Link to `style.css`.
*   Link to `app.js` just before the closing `</body>` tag.
*   Create a semantic structure (`<header>`, `<main>`, `<footer>`, `<section>`).
*   Follow the app's requirements exactly as described in `Instrucciones.md`.

**Step 8: Generate `style.css`**
Set up the design system with a premium, modern look.
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

**Step 9: Generate `app.js`**
Implement the logic using modern JavaScript (ES6+) based on the rules in `Instrucciones.md`.
*   Use `const` and `let`.
*   Use Arrow Functions.
*   Wait for DOM content to load before attaching event listeners.
*   Keep functions small and focused.
*   Implement all business logic described in the requirements.

**Step 10: Write Documentation (`README.md`)**
Create a simple, friendly guide for the user:
*   Explain that they only need to double-click `index.html` to run the app
*   No installation or servers needed
*   Brief overview of what the app does
*   Simple usage instructions for non-technical users

### **PHASE 3: COMPLETION & DELIVERY**

**Step 11: Final Review**

Before notifying the user, verify:
*   ✅ Does it run without a server? (Just double-click `index.html`)
*   ✅ Is the design premium? (fonts, shadows, radiuses, smooth transitions)
*   ✅ Are no frameworks used? (pure HTML, CSS, JavaScript)
*   ✅ Does it implement ALL requirements from `Instrucciones.md`?
*   ✅ Is the app tested and working correctly?

**Step 12: Notify user and guide next steps**

Message to the user:
```
✅ Your app is ready!

📂 Find your app in the folder: [app_name]/
🖥️ To use it: Double-click on index.html
🌐 To share it: See the README.md for Netlify Drop instructions

The app is fully functional and ready to use!
```

**Step 13: Optional - Guide user on sharing**

If the user wants to share their app:
- Explain Netlify Drop process
- Show them exactly which folder to drag-and-drop
- Provide the link once deployed

---

## 4. Important Notes for the AI

### Dialog and Iteration
- **Phase 1 is interactive**: Ask questions, listen carefully, and iterate until requirements are crystal clear
- Don't rush to coding. Understanding the user's needs is the most important part
- If something is unclear, ask again with different words or examples
- Suggest improvements or clarifications when needed

### Naming Convention
- App names should be: `lowercase_with_underscores`
- Examples: `calculadora_pediatrica`, `generador_turnos_icu`, `gestor_pacientes_covid`
- Short and descriptive (2-4 words max)

### Instructions File Quality
- `Instrucciones.md` is the "spec" for building the app
- It must be detailed, not vague
- Specific calculations, rules, and edge cases should be mentioned
- This is shown to the user and must be understandable to a non-technical person

### Feedback Loop
- Always show drafts to the user before creating files
- Ask explicitly: "Is this correct?" and wait for confirmation
- Make changes if needed and show again
- Only proceed to file creation after explicit approval

### User Experience
- Be friendly and encouraging
- Use emojis and clear formatting
- Celebrate small victories ("Great! I understand now...")
- Break down steps clearly
- Remember: the user is not a programmer, so explain everything in simple terms