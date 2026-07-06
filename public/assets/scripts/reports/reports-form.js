
const incidentOptions = document.querySelectorAll(".incident-option");
const riskOptions = document.querySelectorAll(".risk-option");

const locationButton = document.querySelector(".location-button");

const descriptionInput = document.getElementById("description");

const micButton = document.getElementById("micButton");
const micModal = document.getElementById("micModal");
const cancelButton = document.getElementById("cancelMic");
const allowButton = document.getElementById("allowMic");

const uploadBox = document.getElementById("uploadBox");
const evidenceInput = document.getElementById("evidenceInput");

/* =========================
   ESTADO GLOBAL
========================= */

const reportState = {
    incidentType: null,
    riskLevel: null,
    description: "",
    evidence: null
};

/* =========================
   INCIDENTES
========================= */

incidentOptions.forEach(option => {
    option.addEventListener("click", () => {

        incidentOptions.forEach(o => {
            o.classList.remove("selected");

            const img = o.querySelector("img");
            if (img) img.src = img.dataset.default;
        });

        option.classList.add("selected");

        const img = option.querySelector("img");
        if (img) img.src = img.dataset.selected;

        reportState.incidentType = option.dataset.type;
    });
});

/* =========================
   RIESGO
========================= */

riskOptions.forEach(option => {
    option.addEventListener("click", () => {

        riskOptions.forEach(o => o.classList.remove("selected"));

        option.classList.add("selected");

        reportState.riskLevel = option.dataset.level;
    });
});

/* =========================
   UBICACIÓN
========================= */

if (locationButton) {
    locationButton.addEventListener("click", () => {
        console.log("Cambiar ubicación (GPS futuro)");
    });
}

/* =========================
   DESCRIPCIÓN
========================= */

if (descriptionInput) {
    descriptionInput.addEventListener("input", (e) => {
        reportState.description = e.target.value;
    });
}


/* =========================
   EVIDENCIA
========================= */

if (uploadBox && evidenceInput) {

    uploadBox.addEventListener("click", () => {
        evidenceInput.click();
    });

    evidenceInput.addEventListener("change", (e) => {
        const file = e.target.files[0];

        if (file) {
            reportState.evidence = file;
            console.log("Imagen cargada:", file.name);
        }
    });
}

/* =========================
   MIC MODAL
========================= */

if (micButton && micModal) {
    micButton.addEventListener("click", () => {
        micModal.classList.add("show");
    });
}

if (cancelButton) {
    cancelButton.addEventListener("click", () => {
        micModal.classList.remove("show");
    });
}

if (allowButton) {
    allowButton.addEventListener("click", () => {
        console.log("Micrófono permitido");
        micModal.classList.remove("show");
    });
}

/* cerrar al click fuera */
if (micModal) {
    micModal.addEventListener("click", (e) => {
        if (e.target === micModal) {
            micModal.classList.remove("show");
        }
    });
}