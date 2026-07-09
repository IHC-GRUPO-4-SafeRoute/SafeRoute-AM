/*
    Script global de internacionalización (i18n) para SafeRoute.

    Implementación:
    - Lee el idioma guardado en localStorage con la key "safeRouteLanguage".
    - Carga automáticamente el JSON correcto según la ubicación real del script.
    - Funciona tanto si el proyecto se abre desde /public como si public es la raíz del servidor.
    - Aplica traducciones a data-i18n, data-i18n-placeholder, data-i18n-aria-label y data-i18n-title.
*/

const SAFE_ROUTE_LANGUAGE_KEY = "safeRouteLanguage";
const DEFAULT_LANGUAGE = "es";

const i18nScriptUrl = document.currentScript
    ? document.currentScript.src
    : "";

function getTranslationsUrl(language) {
    if (i18nScriptUrl) {
        return new URL(`../../i18n/${language}.json`, i18nScriptUrl).href;
    }

    return `../../assets/i18n/${language}.json`;
}

async function loadTranslations(language) {
    try {
        const response = await fetch(getTranslationsUrl(language), {
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const text = await response.text();
        return JSON.parse(text.replace(/^\uFEFF/, ""));
    } catch (error) {
        console.warn(`[i18n] No se pudo cargar el idioma "${language}". Usando "${DEFAULT_LANGUAGE}".`, error);

        const fallbackResponse = await fetch(getTranslationsUrl(DEFAULT_LANGUAGE), {
            cache: "no-store"
        });

        const fallbackText = await fallbackResponse.text();
        return JSON.parse(fallbackText.replace(/^\uFEFF/, ""));
    }
}

function getNestedTranslation(translations, key) {
    return key.split(".").reduce((value, part) => {
        return value && value[part] !== undefined ? value[part] : null;
    }, translations);
}

function getCurrentLanguage() {
    return localStorage.getItem(SAFE_ROUTE_LANGUAGE_KEY) || DEFAULT_LANGUAGE;
}

async function applySafeRouteTranslations() {
    const language = getCurrentLanguage();
    const translations = await loadTranslations(language);

    document.documentElement.lang = language;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.dataset.i18n;
        const value = getNestedTranslation(translations, key);

        if (value !== null) {
            element.textContent = value;
        }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
        const key = element.dataset.i18nPlaceholder;
        const value = getNestedTranslation(translations, key);

        if (value !== null) {
            element.placeholder = value;
        }
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
        const key = element.dataset.i18nAriaLabel;
        const value = getNestedTranslation(translations, key);

        if (value !== null) {
            element.setAttribute("aria-label", value);
        }
    });

    document.querySelectorAll("[data-i18n-title]").forEach((element) => {
        const key = element.dataset.i18nTitle;
        const value = getNestedTranslation(translations, key);

        if (value !== null) {
            element.setAttribute("title", value);
        }
    });
}

window.setSafeRouteLanguage = async function (language) {
    localStorage.setItem(SAFE_ROUTE_LANGUAGE_KEY, language);
    await applySafeRouteTranslations();
};

window.applySafeRouteTranslations = applySafeRouteTranslations;

document.addEventListener("DOMContentLoaded", () => {
    applySafeRouteTranslations();
});
window.getTranslation = async function (key) {
    const language = getCurrentLanguage();
    const translations = await loadTranslations(language);
    return getNestedTranslation(translations, key);
};