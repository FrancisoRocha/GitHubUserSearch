import { initTheme } from "./theme.js";

/**
 * Inicializa los módulos de la aplicación.
 * Se ejecuta una vez que el DOM está completamente cargado.
 */
function init() {
    initTheme();
}

document.addEventListener("DOMContentLoaded", init);
