/*
    Pantalla: Términos y Condiciones

    HU relacionada:
    Pantalla informativa

    Implementación:
    - Permite expandir y contraer secciones.
    - Cambia el texto Leer más / Leer menos.
    - Permite abrir enlace externo a política de privacidad desde la vista.

    Criterios de aceptación cubiertos:
    - Lectura de secciones informativas con interacción "Leer más" / "Leer menos".

    Nota:
    - No incluye aceptación de términos porque esa acción pertenece a otro flujo posterior al inicio de sesión.
*/

const backButton = document.getElementById("back-button");
const termsCards = document.querySelectorAll(".terms-card");
const acceptTermsCheckbox = document.getElementById("accept-terms-checkbox");
const acceptTermsButton = document.getElementById("accept-terms-button");
const termsMessage = document.getElementById("terms-message");
const TERMS_KEY = "safeRouteTermsAccepted";

function updateAcceptButtonState() {
    if (acceptTermsCheckbox.checked) {
        acceptTermsButton.disabled = false;
        acceptTermsButton.classList.add("is-active");
        return;
    }

    acceptTermsButton.disabled = true;
    acceptTermsButton.classList.remove("is-active");
}

function loadAcceptedState() {
    const acceptedData = JSON.parse(localStorage.getItem(TERMS_KEY) || "null");

    if (!acceptedData?.accepted) {
        updateAcceptButtonState();
        return;
    }

    acceptTermsCheckbox.checked = true;
    updateAcceptButtonState();
    termsMessage.textContent = "Ya aceptaste los términos y condiciones.";
}

termsCards.forEach((card) => {
    const headerButton = card.querySelector(".terms-card-header");
    const readToggleText = card.querySelector(".read-toggle span");

    headerButton.addEventListener("click", () => {
        const isExpanded = card.dataset.expanded === "true";

        card.dataset.expanded = String(!isExpanded);
        readToggleText.textContent = isExpanded ? "Leer más" : "Leer menos";
    });
});

acceptTermsCheckbox.addEventListener("change", () => {
    termsMessage.textContent = "";
    updateAcceptButtonState();
});

acceptTermsButton.addEventListener("click", () => {
    if (!acceptTermsCheckbox.checked) {
        return;
    }

    const acceptedData = {
        accepted: true,
        acceptedAt: new Date().toISOString()
    };

    localStorage.setItem(TERMS_KEY, JSON.stringify(acceptedData));

    termsMessage.textContent = "Términos y condiciones aceptados correctamente.";

    setTimeout(() => {
        window.location.href = "./security-settings.html";
    }, 800);
});

backButton.addEventListener("click", () => {
    window.location.href = "./security-settings.html";
});

loadAcceptedState();