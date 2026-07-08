/*
    Pantalla: Perfil

    HU-US37: Visualización de resumen de actividad
    - La pantalla muestra datos del usuario, rutas, reportes y logros.

    Integración con HU-US35:
    - Lee desde localStorage los cambios realizados en edit-profile.html.
    - Refleja nombre, correo y foto actualizada en la pantalla de perfil.
*/

const STORAGE_KEY = "safeRouteUserProfile";

const defaultProfile = {
    name: "Lucía Martínez",
    email: "lucia@gmail.com",
    phone: "+1 555-0100",
    avatar: "../../assets/images/configuration/profile1.png"
};

const profileAvatar = document.getElementById("profile-avatar");
const profileName = document.getElementById("profile-name");
const profileEmail = document.getElementById("profile-email");

const openLogoutModalButton = document.getElementById("open-logout-modal");
const logoutModal = document.getElementById("logout-modal");
const cancelLogoutButton = document.getElementById("cancel-logout");
const confirmLogoutButton = document.getElementById("confirm-logout");

function getSavedProfile() {
    const savedProfile = localStorage.getItem(STORAGE_KEY);

    if (!savedProfile) {
        return defaultProfile;
    }

    try {
        return {
            ...defaultProfile,
            ...JSON.parse(savedProfile)
        };
    } catch (error) {
        return defaultProfile;
    }
}

function renderProfileData() {
    const profile = getSavedProfile();

    if (profileAvatar) {
        profileAvatar.src = profile.avatar;
    }

    if (profileName) {
        profileName.textContent = profile.name;
    }

    if (profileEmail) {
        profileEmail.textContent = profile.email;
    }
}

function openLogoutModal() {
    logoutModal.classList.add("show");
}

function closeLogoutModal() {
    logoutModal.classList.remove("show");
}

openLogoutModalButton.addEventListener("click", openLogoutModal);
cancelLogoutButton.addEventListener("click", closeLogoutModal);

logoutModal.addEventListener("click", (event) => {
    if (event.target === logoutModal) {
        closeLogoutModal();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && logoutModal.classList.contains("show")) {
        closeLogoutModal();
    }
});

confirmLogoutButton.addEventListener("click", () => {
    window.location.href = "../login-sign_up/login.html";
});

renderProfileData();