/*
    Pantalla: Registro de huella dactilar

    HU-US43: Activación de acceso biométrico

    Implementación:
    - Permite nombrar una nueva huella.
    - Primero el usuario toca la huella.
    - Luego se habilita el botón de identificación táctil.
    - Guarda más de una huella por usuario.
*/

const BIOMETRIC_KEY = "safeRouteBiometricAccess";
const SECURITY_KEY = "safeRouteSecuritySettings";
const CURRENT_USER_KEY = "saferouteCurrentUser";
const PROFILE_KEY = "safeRouteUserProfile";

const backButton = document.getElementById("back-button");
const fingerprintScanButton = document.getElementById("fingerprint-scan-button");
const useFingerprintButton = document.getElementById("use-fingerprint-button");
const fingerprintNameInput = document.getElementById("fingerprint-name-input");
const fingerprintMessage = document.getElementById("fingerprint-message");

let fingerprintWasScanned = false;

function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
    } catch (error) {
        return null;
    }
}

function getEditedProfile() {
    try {
        return JSON.parse(localStorage.getItem(PROFILE_KEY));
    } catch (error) {
        return null;
    }
}

function getUserName() {
    const currentUser = getCurrentUser();
    const editedProfile = getEditedProfile();

    const profileBelongsToCurrentUser =
        editedProfile &&
        currentUser &&
        editedProfile.email === currentUser.email;

    if (profileBelongsToCurrentUser) {
        return editedProfile.name;
    }

    return currentUser?.name || "Usuario";
}

function getFirstName(fullName) {
    return fullName.trim().split(" ")[0];
}

function getDefaultFingerprintLabel() {
    return `Huella dactilar de ${getFirstName(getUserName())}`;
}

function getCurrentUserKey() {
    const currentUser = getCurrentUser();
    return currentUser?.email || "demo-user";
}

function getBiometricData() {
    try {
        return JSON.parse(localStorage.getItem(BIOMETRIC_KEY)) || {};
    } catch (error) {
        return {};
    }
}

function saveBiometricData(data) {
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

function updateSecurityBiometricState(isEnabled) {
    const settings = getSecuritySettings();

    saveSecuritySettings({
        ...settings,
        biometricAccess: isEnabled
    });
}

function normalizeUserBiometricData() {
    const data = getBiometricData();
    const userKey = getCurrentUserKey();

    if (!data[userKey] || !Array.isArray(data[userKey].records)) {
        data[userKey] = {
            records: []
        };

        saveBiometricData(data);
    }

    return data[userKey];
}

function showMessage(message, type = "error") {
    fingerprintMessage.textContent = message;
    fingerprintMessage.style.color = type === "success" ? "#023686" : "#C15A2E";
}

function updateButtonState() {
    const hasName = fingerprintNameInput.value.trim().length > 0;

    if (fingerprintWasScanned && hasName) {
        useFingerprintButton.disabled = false;
        useFingerprintButton.classList.add("is-active");
        return;
    }

    useFingerprintButton.disabled = true;
    useFingerprintButton.classList.remove("is-active");
}

function registerFingerprint() {
    const label = fingerprintNameInput.value.trim();

    if (!label) {
        showMessage("Ingresa un nombre para la huella.");
        return;
    }

    if (!fingerprintWasScanned) {
        showMessage("Primero toca la huella para escanearla.");
        return;
    }

    const data = getBiometricData();
    const userKey = getCurrentUserKey();
    const userData = normalizeUserBiometricData();

    const newFingerprint = {
        id: crypto.randomUUID(),
        label,
        enabled: true,
        registeredAt: new Date().toISOString()
    };

    userData.records.push(newFingerprint);
    data[userKey] = userData;

    saveBiometricData(data);
    updateSecurityBiometricState(true);

    window.location.href = "./biometric-success.html?action=save";
}

function loadDefaultName() {
    fingerprintNameInput.value = getDefaultFingerprintLabel();
    updateButtonState();
}

fingerprintScanButton.addEventListener("click", () => {
    fingerprintWasScanned = true;
    fingerprintScanButton.classList.add("is-scanned");
    showMessage("Huella detectada. Ya puedes guardarla.", "success");
    updateButtonState();
});

fingerprintNameInput.addEventListener("input", updateButtonState);

useFingerprintButton.addEventListener("click", () => {
    if (useFingerprintButton.disabled) {
        return;
    }

    registerFingerprint();
});

backButton.addEventListener("click", () => {
    window.location.href = "./biometric-access.html";
});

loadDefaultName();