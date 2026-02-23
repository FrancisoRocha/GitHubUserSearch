
/**
 * Busca un usuario de GitHub por su nombre de usuario.
 * Utiliza la API pública de GitHub: GET /users/{username}
 *
 * @param {string} username - El nombre de usuario de GitHub a buscar
 * @returns {Object} Los datos del usuario si la petición fue exitosa,
 *                   o un objeto { Error: mensaje } si ocurrió un error
 */
export async function getUser(username){

    // try/catch permite manejar errores de red o de la API de forma controlada
    try{
        // Hace la petición HTTP a la API de GitHub con el nombre de usuario dinámico
        // 'await' pausa la ejecución hasta que el servidor responde
        const response = await fetch(`https://api.github.com/users/${username}`);

        // response.ok es true cuando el status HTTP es 200-299 (éxito)
        // Si no es ok (ej. 404 usuario no encontrado, 403 rate limit), lanzamos un error manualmente
        if (!response.ok) {
            if (response.status === 404) {
                return { error: { title: "No results found!", message: "We couldn't find any GitHub users matching your search. Please double-check the username and try again." }};
            }
            if (response.status === 403) {
                return { error: { title: "Rate limit exceeded", message: "Too many requests. Please wait a moment and try again." }};
            }
            if (response.status === 500) {
                return { error: { title: "Server error", message: "GitHub seems to be having issues right now. Please try again later." }};
            }
            return { error: { title: "Something went wrong", message: `Unexpected error (${response.status}). Please try again.` }};
        }

        // Convierte el cuerpo de la respuesta de JSON (texto) a un objeto JavaScript
        // También es asíncrono, por eso usamos 'await'
        const data = await response.json();
        return data;

    }catch(error){
        // Captura tanto errores de red (sin conexión) como los que lanzamos con throw
        console.error('Request failed:', error);
        // Devuelve un objeto con la clave 'Error' para que el código que llama a esta función
        // pueda detectar que hubo un problema
        return { error: { title: "Connection error", message: "Please check your internet connection and try again." }};
    }

}


