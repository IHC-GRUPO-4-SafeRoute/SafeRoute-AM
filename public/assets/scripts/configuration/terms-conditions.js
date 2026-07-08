/*
    Pantalla: Términos y Condiciones

    Implementación funcional:
    - Expande/contrae secciones.
    - Cambia texto Leer más / Leer menos.
    - Activa el botón Aceptar solo cuando el checkbox está marcado.
    - Guarda aceptación en localStorage.
*/

const TERMS_KEY = "safeRouteTermsAccepted";

const backButton = document.getElementById("back-button");
const termsCards = document.querySelectorAll(".terms-card");
const acceptTermsCheckbox = document.getElementById("accept-terms-checkbox");
const acceptTermsButton = document.getElementById("accept-terms-button");
const termsMessage = document.getElementById("terms-message");

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