const allReportsButton = document.getElementById("allReportsButton");
const myReportsButton = document.getElementById("myReportsButton");

const allReportsSection = document.getElementById("allReportsSection");
const myReportsSection = document.getElementById("myReportsSection");

allReportsButton.addEventListener("click", () => {

    allReportsButton.classList.add("active");
    myReportsButton.classList.remove("active");

    allReportsSection.style.display = "flex";
    myReportsSection.style.display = "none";

});

myReportsButton.addEventListener("click", () => {

    myReportsButton.classList.add("active");
    allReportsButton.classList.remove("active");

    allReportsSection.style.display = "none";
    myReportsSection.style.display = "flex";

});

const newReportButton = document.getElementById("newReportButton");

newReportButton.addEventListener("click", () => {
    window.location.href = "../reports/reports-form.html";
});

const reportState = {
    incidentType: null,
    riskLevel: null,
    location: "Av. Caminos del Inca 1250, Surco",
    description: "",
    evidence: null,
    anonymous: false
};

const anonymousCheck = document.getElementById("anonymousCheck");
const submitButton = document.getElementById("submitReport");

// checkbox
anonymousCheck.addEventListener("change", (e) => {
    reportState.anonymous = e.target.checked;
});

// guardar reporte
function saveReport(report) {
    const reports = JSON.parse(localStorage.getItem("reports")) || [];

    const newReport = {
        ...report,
        id: Date.now(),
        time: "Ahora"
    };

    reports.unshift(newReport);
    localStorage.setItem("reports", JSON.stringify(reports));
}

submitButton.addEventListener("click", () => {

    const isValid =
        reportState.incidentType &&
        reportState.riskLevel &&
        reportState.description &&
        reportState.location;

    if (!isValid) {
        window.location.href = "report-failed.html";
        return;
    }

    saveReport(reportState);

    window.location.href = "report-success.html";
});