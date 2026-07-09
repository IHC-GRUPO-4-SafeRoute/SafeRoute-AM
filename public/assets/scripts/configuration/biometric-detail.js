/*
    Pantalla: Detalle de huella dactilar

    HU relacionada:
    US43 - Activar acceso biométrico

    Implementación:
    - Abre una huella específica mediante query param ?id=...
    - Permite editar su nombre.
    - Permite eliminar solo esa huella.
    - Actualiza localStorage y muestra confirmación al eliminar.

    Criterios de aceptación cubiertos:
    - Extensión funcional de la gestión biométrica asociada a US43.

    Nota:
    - Edición y eliminación son extensiones funcionales, no escenarios oficiales separados.
*/

const BIOMETRIC_KEY = "safeRouteBiometricAccess";
const SECURITY_KEY = "safeRouteSecuritySettings";
const CURRENT_USER_KEY = "saferouteCurrentUser";

const backButton = document.getElementById("back-button");
const deleteFingerprintButton = document.getElementById("delete-fingerprint-button");
const saveFingerprintNameButton = document.getElementById("save-fingerprint-name-button");
const fingerprintTitle = document.getElementById("fingerprint-title");
const fingerprintLabelInput = document.getElementById("fingerprint-label-input");
const fingerprintMessage = document.getElementById("fingerprint-message");

const params = new URLSearchParams(window.location.search);
const fingerprintId = params.get("id");

function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
    } catch (error) {
        return null;
    }
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

function updateSecurityBiometricState() {
    const data = getBiometricData();
    const userKey = getCurrentUserKey();
    const records = data[userKey]?.records || [];

    const hasAnyEnabledFingerprint = records.some((record) => {
        return record.enabled;
    });

    const settings = getSecuritySettings();

    saveSecuritySettings({
        ...settings,
        biometricAccess: hasAnyEnabledFingerprint
    });
}

function getUserRecords() {
    const data = getBiometricData();
    const userKey = getCurrentUserKey();

    return data[userKey]?.records || [];
}

function saveUserRecords(records) {
    const data = getBiometricData();
    const userKey = getCurrentUserKey();

    data[userKey] = {
        records
    };

    saveBiometricData(data);
}

function findCurrentFingerprint() {
    const records = getUserRecords();

    return records.find((record) => {
        return record.id === fingerprintId && record.enabled;
    });
}

function showFingerprintMessage(message, type = "success") {
    fingerprintMessage.textContent = message;
    fingerprintMessage.style.color = type === "error" ? "#C15A2E" : "#023686";

    setTimeout(() => {
        fingerprintMessage.textContent = "";
    }, 1800);
}

function renderFingerprintData() {
    const record = findCurrentFingerprint();

    if (!record) {
        window.location.href = "./biometric-access.html";
        return;
    }

    fingerprintTitle.textContent = record.label;
    fingerprintLabelInput.value = record.label;
}

function saveFingerprintName() {
    const newLabel = fingerprintLabelInput.value.trim();

    if (!newLabel) {
        showFingerprintMessage("El nombre de la huella no puede estar vacío.", "error");
        return;
    }

    const records = getUserRecords();

    const updatedRecords = records.map((record) => {
        if (record.id !== fingerprintId) {
            return record;
        }

        return {
            ...record,
            label: newLabel,
            updatedAt: new Date().toISOString()
        };
    });

    saveUserRecords(updatedRecords);

    fingerprintTitle.textContent = newLabel;
    showFingerprintMessage("Nombre de huella actualizado.");
}

function deleteFingerprint() {
    const records = getUserRecords();

    const updatedRecords = records.map((record) => {
        if (record.id !== fingerprintId) {
            return record;
        }

        return {
            ...record,
            enabled: false,
            deletedAt: new Date().toISOString()
        };
    });

    saveUserRecords(updatedRecords);
    updateSecurityBiometricState();

    window.location.href = "./biometric-success.html?action=delete";
}

saveFingerprintNameButton.addEventListener("click", saveFingerprintName);

fingerprintLabelInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        saveFingerprintName();
    }
});

deleteFingerprintButton.addEventListener("click", deleteFingerprint);

backButton.addEventListener("click", () => {
    window.location.href = "./biometric-access.html";
});

renderFingerprintData();