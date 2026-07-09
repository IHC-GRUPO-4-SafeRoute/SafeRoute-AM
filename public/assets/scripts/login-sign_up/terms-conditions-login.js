const TERMS_KEY = "safeRouteTermsAccepted";

const termsCards = document.querySelectorAll(".terms-card");


const acceptTermsCheckbox = document.getElementById("accept-terms-checkbox");

const acceptTermsButton = document.getElementById("accept-terms-button");

const termsMessage = document.getElementById("terms-message");


function updateAcceptButtonState() {
    if (acceptTermsCheckbox.checked) {
        acceptTermsButton.disabled = false;

        acceptTermsButton.classList.add(
            "is-active"
        );
        return;
    }
    acceptTermsButton.disabled = true;

    acceptTermsButton.classList.remove(
        "is-active"
    );

}

function loadAcceptedState() {
    acceptTermsCheckbox.checked = false;
    updateAcceptButtonState();
    termsMessage.textContent = "";
}

termsCards.forEach(function(card) {
    const headerButton =
        card.querySelector(".terms-card-header");

    const readToggleText =
        card.querySelector(".read-toggle span");

    headerButton.addEventListener(
        "click",
        function() {
            const isExpanded =
                card.dataset.expanded === "true";

            card.dataset.expanded =
                String(!isExpanded);

            readToggleText.textContent =
                isExpanded
                    ? "Leer más"
                    : "Leer menos";
        }
    );
});

acceptTermsCheckbox.addEventListener(
    "change",
    function() {
        termsMessage.textContent = "";
        updateAcceptButtonState();
    }
);

acceptTermsButton.addEventListener(
    "click",
    function() {

        if (!acceptTermsCheckbox.checked) {

            return;

        }

        const acceptedData = {
            accepted: true,
            acceptedAt:
                new Date().toISOString()
        };

        localStorage.setItem(
            TERMS_KEY,
            JSON.stringify(acceptedData)
        );

        termsMessage.textContent =
            "Términos y condiciones aceptados correctamente.";

        setTimeout(
            function() {
                window.location.href =
                    "../onboarding/saferoutes.html";
            },
            800
        );
    }
);

loadAcceptedState();