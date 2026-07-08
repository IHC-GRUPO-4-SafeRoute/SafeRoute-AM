/*
    Pantalla: Perfil

    HU-US37: Visualización de resumen de actividad
    - La pantalla muestra datos del usuario, rutas, reportes y logros.

    Integración con HU-US35:
    - Toma como base el usuario que inició sesión.
    - Solo usa el perfil editado si pertenece al mismo correo del usuario actual.
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