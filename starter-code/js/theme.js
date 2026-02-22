/**
 * Obtiene el tema inicial que se debe aplicar al cargar la página.
 * Prioridad: 1) preferencia guardada en localStorage, 2) preferencia del sistema operativo, 3) 'light' por defecto.
 * @returns {'dark' | 'light'} El tema a aplicar.
 */
function getInitialTheme() {
    try {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) return storedTheme;

        // Si no hay preferencia guardada, se respeta la configuración del sistema
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        return prefersDark.matches ? 'dark' : 'light';
    } catch (error) {
        // localStorage puede fallar en modo privado o con cookies bloqueadas
        console.log("Error getting theme", error);
        return 'light';
    }
}

/**
 * Aplica el tema al documento estableciendo el atributo `data-theme` en el elemento raíz.
 * Las variables CSS definidas en :root[data-theme="dark"] / :root[data-theme="light"] se activan automáticamente.
 * @param {'dark' | 'light'} theme - El tema a aplicar.
 */
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}

/**
 * Actualiza el `src` de los iconos SVG y el texto/ícono del botón de tema
 * para que coincidan con el tema activo.
 * Los SVGs están organizados en carpetas `assets/dark/` y `assets/light/`.
 * @param {'dark' | 'light'} theme - El tema activo.
 */
function updatesIcons(theme) {
    const iconLocation = document.querySelector(".iconlocation");
    const iconTwitter  = document.querySelector(".icontwitter");
    const iconBlog     = document.querySelector(".iconblog");
    const iconCompany  = document.querySelector(".iconcompany");
    const buttonText   = document.querySelector(".theme__text");
    const buttonIcon   = document.querySelector(".theme__icon");

    // Actualiza cada ícono apuntando a la carpeta del tema correspondiente
    if (iconLocation) iconLocation.src = `./assets/${theme}/icon-location-${theme}.svg`;
    if (iconTwitter)  iconTwitter.src  = `./assets/${theme}/icon-twitter-${theme}.svg`;
    if (iconBlog)     iconBlog.src     = `./assets/${theme}/icon-blog-${theme}.svg`;
    if (iconCompany)  iconCompany.src  = `./assets/${theme}/icon-company-${theme}.svg`;

    // El botón muestra el tema al que se puede cambiar (no el actual)
    if (buttonText) buttonText.textContent = theme === "dark" ? "LIGHT" : "DARK";
    if (buttonIcon) buttonIcon.src = theme === "dark"
        ? "./assets/dark/icon-sun.svg"
        : "./assets/light/icon-moon.svg";
}

/**
 * Punto de entrada del sistema de temas.
 * - Determina y aplica el tema inicial.
 * - Registra el listener del botón para alternar entre temas.
 * Debe llamarse una vez que el DOM esté completamente cargado.
 */
export function initTheme() {
    const theme = getInitialTheme();
    applyTheme(theme);
    updatesIcons(theme);

    const buttonTheme = document.querySelector(".theme");
    if (!buttonTheme) {
        console.log("El boton no existe");
        return;
    }

    buttonTheme.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
        const newTheme = currentTheme === "dark" ? "light" : "dark";

        applyTheme(newTheme);
        updatesIcons(newTheme);
        localStorage.setItem("theme", newTheme); // Persiste la preferencia del usuario

        console.log("Nuevo tema:", newTheme);
    });
}
