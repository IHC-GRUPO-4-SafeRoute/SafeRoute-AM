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

const anonymousCheck = document.getElementById("anonymousCheck");

const submitBtn = document.getElementById("submitReport");

const reportState = {
    incidentType: null,
    riskLevel: null,
    location: "Av. Caminos del Inca 1250, Surco",
    description: "",
    evidence: null,
    anonymous: false
};

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

riskOptions.forEach(option => {
    option.addEventListener("click", () => {

        riskOptions.forEach(o => o.classList.remove("selected"));

        option.classList.add("selected");

        reportState.riskLevel = option.dataset.level;
    });
});

if (locationButton) {
    locationButton.addEventListener("click", () => {
        console.log("Ubicación fija:", reportState.location);
    });
}

if (descriptionInput) {
    descriptionInput.addEventListener("input", (e) => {
        reportState.description = e.target.value;
    });
}

if (uploadBox && evidenceInput) {
    uploadBox.addEventListener("click", () => {
        evidenceInput.click();
    });

    evidenceInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) reportState.evidence = file;
    });
}

if (micButton && micModal) {
    micButton.addEventListener("click", () => {
        micModal.classList.add("show");
    });

    micModal.addEventListener("click", (e) => {
        if (e.target === micModal) {
            micModal.classList.remove("show");
        }
    });
}

if (cancelButton) {
    cancelButton.addEventListener("click", () => {
        micModal.classList.remove("show");
    });
}

if (allowButton) {
    allowButton.addEventListener("click", () => {
        micModal.classList.remove("show");
    });
}

if (anonymousCheck) {
    anonymousCheck.addEventListener("change", (e) => {
        reportState.anonymous = e.target.checked;
    });
}

if (submitBtn) {
    submitBtn.addEventListener("click", handleSubmit);
}

function handleSubmit() {

    if (!isFormValid()) {
        window.location.href = "report-failed.html";
        return;
    }

    const fakeServerError = Math.random() < 0.2;

    if (fakeServerError) {
        window.location.href = "report-error.html";
        return;
    }

    sessionStorage.setItem("pendingReport", JSON.stringify(reportState));

    window.location.href = "report-success.html";
}

function isFormValid() {
    return (
        reportState.incidentType &&
        reportState.riskLevel &&
        reportState.description &&
        reportState.description.trim().length > 0
    );
}