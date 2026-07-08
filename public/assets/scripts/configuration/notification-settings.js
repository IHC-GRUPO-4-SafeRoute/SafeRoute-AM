/*
    Pantalla complementaria: Ajustes de notificaciones

    Implementación:
    - Carga preferencias de notificación desde localStorage.
    - Permite activar o desactivar cada preferencia.
    - Guarda los cambios automáticamente.
*/

const NOTIFICATION_SETTINGS_KEY = "safeRouteNotificationSettings";

const backButton = document.getElementById("back-button");
const toggleInputs = document.querySelectorAll(".setting-toggle-input");

const defaultNotificationSettings = {
    vibration: true,
    sound: true,
    emergencyCallSound: true,
    reportNotifications: true
};

function getNotificationSettings() {
    try {
        return {
            ...defaultNotificationSettings,
            ...JSON.parse(localStorage.getItem(NOTIFICATION_SETTINGS_KEY))
        };
    } catch (error) {
        return defaultNotificationSettings;
    }
}

function saveNotificationSettings(settings) {
    localStorage.setItem(NOTIFICATION_SETTINGS_KEY, JSON.stringify(settings));
}

function loadNotificationSettings() {
    const settings = getNotificationSettings();

    toggleInputs.forEach((input) => {
        const settingName = input.dataset.setting;
        input.checked = Boolean(settings[settingName]);
    });
}

function updateNotificationSetting(input) {
    const settings = getNotificationSettings();
    const settingName = input.dataset.setting;

    settings[settingName] = input.checked;
    saveNotificationSettings(settings);
}

toggleInputs.forEach((input) => {
    input.addEventListener("change", () => {
        updateNotificationSetting(input);
    });
});

backButton.addEventListener("click", () => {
    window.location.href = "./settings.html";
});

loadNotificationSettings();