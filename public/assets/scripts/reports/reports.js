document.addEventListener("DOMContentLoaded", () => {

    const allReportsButton = document.getElementById("allReportsButton");
    const myReportsButton = document.getElementById("myReportsButton");

    const allReportsSection = document.getElementById("allReportsSection");
    const myReportsSection = document.getElementById("myReportsSection");

    const newReportButton = document.getElementById("newReportButton");

    if (allReportsButton && myReportsButton) {

        allReportsButton.addEventListener("click", () => {

            allReportsButton.classList.add("active");
            myReportsButton.classList.remove("active");

            if (allReportsSection) allReportsSection.style.display = "flex";
            if (myReportsSection) myReportsSection.style.display = "none";
        });

        myReportsButton.addEventListener("click", () => {

            myReportsButton.classList.add("active");
            allReportsButton.classList.remove("active");

            if (allReportsSection) allReportsSection.style.display = "none";
            if (myReportsSection) myReportsSection.style.display = "flex";

            loadReports();
        });
    }

    if (newReportButton) {
        newReportButton.addEventListener("click", () => {
            window.location.href = "../reports/reports-form.html";
        });
    }

    const icons = {
        asalto: "../../assets/images/reports/assault-card.png",
        violencia: "../../assets/images/reports/violence-card.png",
        accidente: "../../assets/images/reports/accident-card.png",
        iluminacion: "../../assets/images/reports/lighting-card.png",
        sospechoso: "../../assets/images/reports/suspicious-card.png",
        otro: "../../assets/images/reports/other-card.png"
    };

    const riskMap = {
        alto: "high",
        medio: "medium",
        bajo: "low"
    };

    const riskText = {
        alto: "Riesgo alto",
        medio: "Riesgo medio",
        bajo: "Riesgo bajo"
    };

    function formatDate(dateString) {

        if (!dateString) return "";

        const now = new Date();
        const date = new Date(dateString);

        const diffMin = Math.floor((now - date) / 60000);

        if (diffMin <= 1) return "1 min";

        return `${diffMin} min`;
    }

    function capitalize(text) {
        if (!text) return "";
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    function loadReports() {

        const container = document.getElementById("myReportsList");

        if (!container) return;

        const reports = JSON.parse(localStorage.getItem("reports")) || [];

        container.innerHTML = "";

        reports.forEach((r) => {

            const card = document.createElement("article");
            card.className = "report-card";

            card.innerHTML = `
                <div class="report-left">

                    <div class="report-icon">
                        <img src="${icons[r.type] || icons.otro}">
                    </div>

                    <div class="report-information">
                        <h3>${capitalize(r.type || "Sin tipo")}</h3>
                        <p>${r.location || "Ubicación no definida"}</p>
                    </div>

                </div>

                <div class="report-right">

                    <span class="report-time">
                        ${formatDate(r.date)}
                    </span>

                    <span class="risk ${riskMap[r.risk] || "low"}">
                        ${riskText[r.risk] || "Riesgo bajo"}
                    </span>

                </div>
            `;

            container.appendChild(card);
        });
    }

    loadReports();
});