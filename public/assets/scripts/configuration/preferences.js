/*
    Pantalla complementaria: Preferencias

    Implementación:
    - Carga preferencias desde localStorage.
    - Permite cambiar idioma.
    - Permite cambiar preferencia de ruta.
    - Permite activar o desactivar zonas de alerta, perfil público y notificaciones.
    - Guarda cambios automáticamente.
*/

const PREFERENCES_KEY = "safeRouteUserPreferences";
const LANGUAGE_KEY = "safeRouteLanguage";

const backButton = document.getElementById("back-button");
const languageButton = document.getElementById("language-button");
const languageOptions = document.getElementById("language-options");
const selectedLanguageFlag = document.getElementById("selected-language-flag");
const selectedLanguageText = document.getElementById("selected-language-text");
const languageOptionButtons = document.querySelectorAll(".language-option");
const routeOptionButtons = document.querySelectorAll(".route-option");
const preferenceToggles = document.querySelectorAll(".preference-toggle");
const preferencesMessage = document.getElementById("preferences-message");

const languageData = {
    es: {
        label: "Español",
        flag: "../../assets/images/configuration/español.png"
    },
    en: {
        label: "English",
        flag: "../../assets/images/configuration/english.png"
    }
};

const defaultPreferences = {
    language: "es",
    routePreference: "safe",
    alertZones: true,
    publicProfile: true,
    notifications: true
};

function getPreferences() {
    try {
        const stored = JSON.parse(localStorage.getItem(PREFERENCES_KEY)) || {};
        const globalLang = localStorage.getItem(LANGUAGE_KEY);
        if (globalLang) {
            stored.language = globalLang;
        }
        return { ...defaultPreferences, ...stored };
    } catch (error) {
        return defaultPreferences;
    }
}

function savePreferences(preferences) {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
}

function showSavedMessage() {
    const language = localStorage.getItem(LANGUAGE_KEY) || "es";
    const messages = {
        es: "Preferencias guardadas correctamente.",
        en: "Preferences saved successfully."
    };
    preferencesMessage.textContent = messages[language] || messages.es;

    setTimeout(() => {
        preferencesMessage.textContent = "";
    }, 1200);
}

function updateLanguageView(language) {
    const selectedLanguage = languageData[language] || languageData.es;

    selectedLanguageFlag.src = selectedLanguage.flag;
    selectedLanguageText.textContent = selectedLanguage.label;
}

function updateRouteView(routePreference) {
    routeOptionButtons.forEach((button) => {
        button.classList.toggle("is-active", button.dataset.route === routePreference);
    });
}

function updateToggleView(preferences) {
    preferenceToggles.forEach((toggle) => {
        const settingName = toggle.dataset.setting;
        toggle.checked = Boolean(preferences[settingName]);
    });
}

function loadPreferences() {
    const preferences = getPreferences();

    updateLanguageView(preferences.language);
    updateRouteView(preferences.routePreference);
    updateToggleView(preferences);
}

function setLanguage(language) {
    const preferences = getPreferences();

    preferences.language = language;
    savePreferences(preferences);
    localStorage.setItem(LANGUAGE_KEY, language);
    updateLanguageView(language);

    languageOptions.classList.add("hidden");
    languageButton.classList.remove("is-open");
    languageButton.setAttribute("aria-expanded", "false");

    if (typeof window.setSafeRouteLanguage === "function") {
        window.setSafeRouteLanguage(language);
    }

    showSavedMessage();
}

function setRoutePreference(routePreference) {
    const preferences = getPreferences();

    preferences.routePreference = routePreference;
    savePreferences(preferences);
    updateRouteView(routePreference);

    showSavedMessage();
}

function updateTogglePreference(toggle) {
    const preferences = getPreferences();
    const settingName = toggle.dataset.setting;

    preferences[settingName] = toggle.checked;
    savePreferences(preferences);

    showSavedMessage();
}

languageButton.addEventListener("click", () => {
    const isOpen = !languageOptions.classList.contains("hidden");

    languageOptions.classList.toggle("hidden", isOpen);
    languageButton.classList.toggle("is-open", !isOpen);
    languageButton.setAttribute("aria-expanded", String(!isOpen));
});

languageOptionButtons.forEach((button) => {
    button.addEventListener("click", () => {
        setLanguage(button.dataset.language);
    });
});

routeOptionButtons.forEach((button) => {
    button.addEventListener("click", () => {
        setRoutePreference(button.dataset.route);
    });
});

preferenceToggles.forEach((toggle) => {
    toggle.addEventListener("change", () => {
        updateTogglePreference(toggle);
    });
});

document.addEventListener("click", (event) => {
    const clickedInsideSelector =
        languageButton.contains(event.target) ||
        languageOptions.contains(event.target);

    if (!clickedInsideSelector) {
        languageOptions.classList.add("hidden");
        languageButton.classList.remove("is-open");
        languageButton.setAttribute("aria-expanded", "false");
    }
});

backButton.addEventListener("click", () => {
    window.location.href = "./profile.html";
});

loadPreferences();