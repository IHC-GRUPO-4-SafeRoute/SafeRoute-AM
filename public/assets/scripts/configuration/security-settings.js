/*
    Pantalla: Configuración de Seguridad

    HU-US24: Activación de botón SOS
    - El botón "Probar SOS" simula una alerta de emergencia.
    - El usuario puede cancelar la alerta de prueba.

    HU-US26: Temporizador de seguridad
    - El switch activa/desactiva el temporizador y guarda el estado.

    HU-US27 / HU-US42: Compartir ubicación y privacidad
    - El switch solicita permiso de ubicación cuando se activa.
    - El estado se almacena en localStorage.

    HU-US43: Acceso biométrico
    - Se intenta validar disponibilidad de autenticación biométrica mediante WebAuthn.
*/

const STORAGE_KEY = "safeRouteSecuritySettings";

const defaultSettings = {
    securityTimer: true,
    locationSharing: true,
    microphone: true,
    pushNotifications: true,
    biometricAccess: false,
    lastSosTest: null
};

const backButton = document.getElementById("back-button");
const statusMessage = document.getElementById("status-message");

const changePasswordButton = document.getElementById("change-password-button");
const biometricButton = document.getElementById("biometric-button");
const termsButton = document.getElementById("terms-button");

const timerToggle = document.getElementById("timer-toggle");
const locationToggle = document.getElementById("location-toggle");
const microphoneToggle = document.getElementById("microphone-toggle");
const pushToggle = document.getElementById("push-toggle");

const testSosButton = document.getElementById("test-sos-button");
const sosModal = document.getElementById("sos-modal");
const sosModalMessage = document.getElementById("sos-modal-message");
const cancelSosButton = document.getElementById("cancel-sos-button");
const closeSosButton = document.getElementById("close-sos-button");

function getSavedSettings() {
    const savedSettings = localStorage.getItem(STORAGE_KEY);

    if (!savedSettings) {
        saveSettings(defaultSettings);
        return defaultSettings;
    }

    try {
        return {
            ...defaultSettings,
            ...JSON.parse(savedSettings)
        };
    } catch (error) {
        saveSettings(defaultSettings);
        return defaultSettings;
    }
}

function saveSettings(settings) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

function updateSetting(key, value) {
    const settings = getSavedSettings();
    settings[key] = value;
    saveSettings(settings);
}

function showStatus(message, type = "success") {
    statusMessage.textContent = message;
    statusMessage.style.color = type === "error" ? "#C15A2E" : "#023686";

    window.clearTimeout(showStatus.timeoutId);

    showStatus.timeoutId = window.setTimeout(() => {
        statusMessage.textContent = "";
    }, 2600);
}

function renderSettings() {
    const settings = getSavedSettings();

    timerToggle.checked = settings.securityTimer;
    locationToggle.checked = settings.locationSharing;
    microphoneToggle.checked = settings.microphone;
    pushToggle.checked = settings.pushNotifications;
}

function requestLocationPermission() {
    return new Promise((resolve) => {
        if (!("geolocation" in navigator)) {
            resolve(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            () => resolve(true),
            () => resolve(false),
            {
                enableHighAccuracy: true,
                timeout: 6000,
                maximumAge: 0
            }
        );
    });
}

async function requestMicrophonePermission() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        return false;
    }

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach((track) => track.stop());
        return true;
    } catch (error) {
        return false;
    }
}

async function requestPushPermission() {
    if (!("Notification" in window)) {
        return false;
    }

    if (Notification.permission === "granted") {
        return true;
    }

    if (Notification.permission === "denied") {
        return false;
    }

    const permission = await Notification.requestPermission();
    return permission === "granted";
}

async function enableBiometricAccess() {
    if (!window.PublicKeyCredential) {
        showStatus("Este navegador no permite verificar acceso biométrico.", "error");
        updateSetting("biometricAccess", false);
        return;
    }

    try {
        const isAvailable = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();

        if (!isAvailable) {
            showStatus("El dispositivo no tiene biometría disponible.", "error");
            updateSetting("biometricAccess", false);
            return;
        }

        updateSetting("biometricAccess", true);
        showStatus("Acceso biométrico habilitado correctamente.");
    } catch (error) {
        updateSetting("biometricAccess", false);
        showStatus("No se pudo habilitar el acceso biométrico.", "error");
    }
}

timerToggle.addEventListener("change", () => {
    updateSetting("securityTimer", timerToggle.checked);

    if (timerToggle.checked) {
        showStatus("Temporizador de seguridad activado.");
    } else {
        showStatus("Temporizador de seguridad desactivado.");
    }
});

locationToggle.addEventListener("change", async () => {
    if (!locationToggle.checked) {
        updateSetting("locationSharing", false);
        showStatus("Compartir ubicación desactivado.");
        return;
    }

    const granted = await requestLocationPermission();

    if (!granted) {
        locationToggle.checked = false;
        updateSetting("locationSharing", false);
        showStatus("No se pudo activar la ubicación. Revisa los permisos.", "error");
        return;
    }

    updateSetting("locationSharing", true);
    showStatus("Compartir ubicación activado.");
});

microphoneToggle.addEventListener("change", async () => {
    if (!microphoneToggle.checked) {
        updateSetting("microphone", false);
        showStatus("Micrófono desactivado.");
        return;
    }

    const granted = await requestMicrophonePermission();

    if (!granted) {
        microphoneToggle.checked = false;
        updateSetting("microphone", false);
        showStatus("No se pudo activar el micrófono. Revisa los permisos.", "error");
        return;
    }

    updateSetting("microphone", true);
    showStatus("Micrófono habilitado.");
});

pushToggle.addEventListener("change", async () => {
    if (!pushToggle.checked) {
        updateSetting("pushNotifications", false);
        showStatus("Notificaciones push desactivadas.");
        return;
    }

    const granted = await requestPushPermission();

    if (!granted) {
        pushToggle.checked = false;
        updateSetting("pushNotifications", false);
        showStatus("No se pudieron activar las notificaciones.", "error");
        return;
    }

    updateSetting("pushNotifications", true);
    showStatus("Notificaciones push activadas.");
});

changePasswordButton.addEventListener("click", () => {
    window.location.href = "./change-password.html";
});

biometricButton.addEventListener("click", () => {
    window.location.href = "./biometric-access.html";
});

termsButton.addEventListener("click", () => {
    showStatus("Términos y condiciones disponibles próximamente.");
});

testSosButton.addEventListener("click", () => {
    const settings = getSavedSettings();

    settings.lastSosTest = new Date().toISOString();
    saveSettings(settings);

    if (settings.locationSharing) {
        sosModalMessage.textContent = "Se simuló el envío de una alerta y la ubicación a tus contactos de emergencia.";
    } else {
        sosModalMessage.textContent = "Se simuló el envío de una alerta. Activa compartir ubicación para incluirla en el SOS.";
    }

    sosModal.classList.add("show");
});

cancelSosButton.addEventListener("click", () => {
    sosModal.classList.remove("show");
    showStatus("SOS de prueba cancelado.");
});

closeSosButton.addEventListener("click", () => {
    sosModal.classList.remove("show");
});

sosModal.addEventListener("click", (event) => {
    if (event.target === sosModal) {
        sosModal.classList.remove("show");
    }
});

backButton.addEventListener("click", () => {
    window.location.href = "./profile.html";
});

renderSettings();