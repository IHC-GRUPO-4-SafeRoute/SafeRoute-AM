/*
    Pantalla: Acceso Biométrico

    HU-US43: Activación de acceso biométrico

    Implementación funcional:
    - Toma el nombre del usuario actual desde saferouteCurrentUser.
    - Muestra la huella dactilar del usuario actual.
    - Al agregar acceso biométrico, guarda el estado en localStorage.
    - Redirige a una pantalla de confirmación con animación.
*/

const BIOMETRIC_KEY = "safeRouteBiometricAccess";
const SECURITY_KEY = "safeRouteSecuritySettings";
const CURRENT_USER_KEY = "saferouteCurrentUser";

const backButton = document.getElementById("back-button");
const addBiometricButton = document.getElementById("add-biometric-button");
const registeredBiometricButton = document.getElementById("registered-biometric-button");
const registeredBiometricLabel = document.getElementById("registered-biometric-label");
const biometricMessage = document.getElementById("biometric-message");

function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
    } catch (error) {
        return null;
    }
}

function getFirstName(fullName) {
    if (!fullName) {
        return "usuario";
    }

    return fullName.trim().split(" ")[0];
}

function getBiometricAccess() {
    try {
        return JSON.parse(localStorage.getItem(BIOMETRIC_KEY)) || {};
    } catch (error) {
        return {};
    }
}

function saveBiometricAccess(data) {
    localStorage.setItem(BIOMETRIC_KEY, JSON.stringify(data));
}

function getSecuritySettings() {
    try {
        return JSON.parse(localStorage.getItem(SECURITY_KEY)) || {};
    } catch (error) {
        return {};
    }
}

function saveSecuritySettings(settings) {
    localStorage.setItem(SECURITY_KEY, JSON.stringify(settings));
}

function getCurrentUserKey() {
    const currentUser = getCurrentUser();
    return currentUser?.email || "demo-user";
}

function renderBiometricUser() {
    const currentUser = getCurrentUser();
    const firstName = getFirstName(currentUser?.name);

    registeredBiometricLabel.textContent = `Huella dactilar de ${firstName}`;
}

function updateSecurityBiometricState() {
    const settings = getSecuritySettings();

    saveSecuritySettings({
        ...settings,
        biometricAccess: true
    });
}

function registerBiometricAccess() {
    const biometricAccess = getBiometricAccess();
    const currentUserKey = getCurrentUserKey();

    biometricAccess[currentUserKey] = {
        enabled: true,
        registeredAt: new Date().toISOString()
    };

    saveBiometricAccess(biometricAccess);
    updateSecurityBiometricState();

    window.location.href = "./biometric-success.html";
}

registeredBiometricButton.addEventListener("click", () => {
    biometricMessage.textContent = "Acceso biométrico principal activo.";
});

addBiometricButton.addEventListener("click", registerBiometricAccess);

backButton.addEventListener("click", () => {
    window.location.href = "./security-settings.html";
});

renderBiometricUser();