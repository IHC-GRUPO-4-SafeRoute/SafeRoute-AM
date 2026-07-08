/*
    Pantalla: Perfil

    HU relacionada:
    US37 - Visualización de resumen de actividad
    Relación secundaria: US35 - Edición de perfil de usuario (acceso a edición)

    Implementación:
    - Carga los datos del usuario autenticado y del perfil editado asociado.
    - Mantiene la información de perfil para visualización consistente.
    - Gestiona acciones de salida de sesión desde la pantalla de perfil.

    Criterios de aceptación cubiertos:
    - Escenario 1: visualización de resumen con datos persistidos del usuario.
    - Escenario 2: soporte de valores iniciales cuando no hay datos previos.
*/

const STORAGE_KEY = "safeRouteUserProfile";

const defaultProfile = {
    name: "Usuario SafeRoute",
    email: "usuario@saferoute.com",
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

function getCurrentSessionUser() {
    try {
        return JSON.parse(localStorage.getItem("saferouteCurrentUser"));
    } catch (error) {
        return null;
    }
}

function getSavedEditedProfile() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch (error) {
        return null;
    }
}

function getSavedProfile() {
    const currentUser = getCurrentSessionUser();
    const editedProfile = getSavedEditedProfile();

    const sessionProfile = {
        ...defaultProfile,
        name: currentUser?.name || defaultProfile.name,
        email: currentUser?.email || defaultProfile.email,
        phone: currentUser?.phone || defaultProfile.phone,
        avatar: currentUser?.avatar || defaultProfile.avatar
    };

    const profileBelongsToCurrentUser =
        editedProfile &&
        currentUser &&
        editedProfile.email === currentUser.email;

    if (!profileBelongsToCurrentUser) {
        return sessionProfile;
    }

    return {
        ...sessionProfile,
        ...editedProfile
    };
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
    localStorage.removeItem("saferouteCurrentUser");
    localStorage.removeItem("saferoutePendingUser");
    localStorage.removeItem("saferoutePinOrigin");

    window.location.href = "../login-sign_up/login.html";
});

renderProfileData();