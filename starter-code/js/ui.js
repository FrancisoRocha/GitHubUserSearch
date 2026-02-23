

/**
 * Muestra un mensaje de error en la sección del perfil.
 * Reemplaza el contenido de .header__info con el título y mensaje recibidos.
 *
 * @param {string} title   - Título del error (ej. "No results found!")
 * @param {string} message - Descripción del error para el usuario
 */
export function displayError(title = "No results found!", message = "We couldn't find any GitHub users matching your search. Please double-check the username and try again.") {

    const containerInfo = document.querySelector(".header__info");

    if (!containerInfo) {
        console.log("El Container Info no existe");
        return;
    }

    // Reemplaza todo el contenido del contenedor con el mensaje de error
    containerInfo.innerHTML = `
        <div class="message__error">
            <p class="title__error">${title}</p>
            <p class="text__error">${message}</p>
        </div>
    `;

}

/**
 * Renderiza los datos de un usuario de GitHub en la sección del perfil.
 * Reemplaza el contenido de .header__info con la información del usuario.
 *
 * @param {Object} data - Objeto con los datos devueltos por la API de GitHub
 */
export function displayUser(data) {

    const containerInfoUser = document.querySelector(".header__info");

    if (!containerInfoUser) {
        console.log("El Container Info del user no existe");
        return;
    }

    // Desestructuración: extrae solo las propiedades que necesitamos del objeto data
    const { avatar_url, name, login, created_at, bio, public_repos, followers, following, location, twitter_username, blog, company } = data;

    // Convierte la fecha ISO de la API (ej. "2011-01-25T18:44:36Z") a formato legible
    const date = new Date(created_at);
    const formattedDate = date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

    // Lee el tema activo del atributo data-theme del <html> para cargar los iconos correctos
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";

    containerInfoUser.innerHTML = `
        <div class="img__header">
            <img src="${avatar_url}" alt="avatar" class="avatar__profile"/>
        </div>
        <div class="profile__section--info">
            <!-- PROFILE HEADER -->
            <div class="profile__header">
                <div class="user__details">
                    <h3 class="name">${name || login}</h3>
                    <p class="user__name">@<span class="user">${login}</span></p>
                </div>
                <p class="account__creation">Joined ${formattedDate}</p>
            </div>
        </div>
        <!-- BIOGRAFIA -->
        <div class="profile__bio">
            <p class="bio">${ bio || "This profile has no bio" }</p>
        </div>
        <!-- PROFILE STATS -->
        <dl class="profile__stats">
            <div class="repos__stats">
                <dt class="repos">Repos</dt>
                <dd class="number__repos">${public_repos}</dd>
            </div>
            <div class="followers__stats">
                <dt class="followers">Followers</dt>
                <dd class="number__followers">${followers}</dd>
            </div>
            <div class="following__stats">
                <dt class="following">Following</dt>
                <dd class="number__following">${following}</dd>
            </div>
        </dl>

        <!-- LINKS -->
            <div class="links__container">
                <div class="location__link">
                    <img src="./assets/${currentTheme}/icon-location-${currentTheme}.svg" alt="icon location" class="iconlocation"/>
                    <p class="location">${ location || "Not available" }</p>
                </div>
                <div class="twitter__link">
                    <img src="./assets/${currentTheme}/icon-twitter-${currentTheme}.svg" alt="icon twitter" class="icontwitter"/>
                    ${twitter_username 
                        ? `<a href="https://twitter.com/${twitter_username}" target="_blank" id="twitter" rel="noopener noreferrer">@${twitter_username}</a>` 
                        : `<span class="not-available">Not available</span>`
                    }
                </div>
                <div class="blog__link">
                <img src="./assets/${currentTheme}/icon-blog-${currentTheme}.svg" alt="icon blog" class="iconblog" />
                    ${blog
                        ? `<a href="${blog}" target="_blank" rel="noopener noreferrer" id="blog">${blog}</a>`
                        : `<span class="not-available">Not available</span>`
                    }
                </div>
                <div class="company__link">
                    <img src="./assets/${currentTheme}/icon-company-${currentTheme}.svg" alt="icon company" class="iconcompany"/>
                    ${company
                        ? `<a href="https://github.com/${company.replace('@', '')}" target="_blank" rel="noopener noreferrer">${company}</a>`
                        : `<span class="not-available">Not available</span>`
                    }
                </div>
            </div>
    `;

}


