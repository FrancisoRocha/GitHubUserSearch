import { getUser } from "./api.js";
import { initTheme } from "./theme.js";
import { displayError, displayUser } from "./ui.js";

/**
 * Maneja el flujo completo de una búsqueda de usuario.
 * Muestra el loading, llama a la API y renderiza el resultado o el error.
 *
 * @param {string} username - El nombre de usuario ingresado en el formulario
 */
async function handleSearch(username){

    const profileContainer = document.querySelector(".profile__section--container");
    const notResult = document.querySelector(".noResults");

    // Activa la animación de borde gradiente mientras espera la respuesta de la API
    profileContainer.classList.add("is-loading");

    const result = await getUser(username);

    // Desactiva la animación una vez que la API responde (con éxito o error)
    profileContainer.classList.remove("is-loading");

    if(result.error){
        // Muestra el mensaje de error en la sección del perfil
        displayError(result.error.title, result.error.message);
        // Muestra el texto "No results" dentro del formulario de búsqueda
        notResult.style.display = "block";
    }else{
        // Renderiza los datos del usuario en la sección del perfil
        displayUser(result);
        // Oculta el texto "No results" si la búsqueda fue exitosa
        notResult.style.display = "none";
    }

}

/**
 * Inicializa los módulos de la aplicación.
 * Se ejecuta una vez que el DOM está completamente cargado.
 */
function init() {
    // Configura el tema (dark/light) según la preferencia guardada
    initTheme();

    const form = document.querySelector(".container__form");

    // Escucha el evento submit del formulario de búsqueda
    form.addEventListener("submit", (e) => {
        // Previene que el formulario recargue la página (comportamiento por defecto)
        e.preventDefault();

        const input = document.querySelector("#searchInput");
        // .trim() elimina espacios en blanco al inicio y al final del texto
        const username = input.value.trim();

        // Solo dispara la búsqueda si el campo no está vacío
        if(username){
            handleSearch(username);
        }

    });

}

// Espera a que el HTML esté completamente cargado antes de ejecutar init()
document.addEventListener("DOMContentLoaded", init);
