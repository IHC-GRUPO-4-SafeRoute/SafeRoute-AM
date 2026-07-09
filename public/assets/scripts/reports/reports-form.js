const incidentOptions = document.querySelectorAll(".incident-option");
const riskOptions = document.querySelectorAll(".risk-option");

const locationButton = document.querySelector(".location-button");
const descriptionInput = document.getElementById("description");
const micButton = document.getElementById("micButton");
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
        console.log("Ubicación:", reportState.location);
    });
}

if (descriptionInput) {
    descriptionInput.addEventListener("input", (e) => {
        reportState.description = e.target.value;
    });
}

if (micButton) {

    micButton.addEventListener("click", async () => {

        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert("Este navegador no soporta acceso al micrófono.");
            return;
        }

        try {

            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true
            });

            console.log("Micrófono permitido.");

            // Detiene el micrófono inmediatamente
            stream.getTracks().forEach(track => track.stop());

        } catch (error) {

            console.log("Permiso denegado.", error);

        }

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

    const fakeError = Math.random() < 0.2;

    if (fakeError) {
        window.location.href = "report-error.html";
        return;
    }

    const newReport = {
        id: Date.now(),
        type: reportState.incidentType,
        risk: reportState.riskLevel,
        location: reportState.location,
        description: reportState.description,
        evidence: reportState.evidence ? reportState.evidence.name : null,
        anonymous: reportState.anonymous,
        date: new Date().toISOString()
    };

    const reports = JSON.parse(localStorage.getItem("reports")) || [];
    reports.push(newReport);
    localStorage.setItem("reports", JSON.stringify(reports));

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