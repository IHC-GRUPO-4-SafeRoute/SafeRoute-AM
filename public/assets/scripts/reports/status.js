document.addEventListener("DOMContentLoaded", () => {

    const icon = document.getElementById("statusIcon");
    const title = document.getElementById("statusTitle");
    const text = document.getElementById("statusText");
    const button = document.getElementById("statusButton");

    const path = window.location.pathname;

    if (path.includes("failed")) {

        icon.src = "../../assets/images/reports/failure.png";
        title.textContent = "Reporte fallido";
        text.textContent = "Tu reporte está incompleto, falta información obligatoria";
        button.textContent = "Reintentar";

        button.onclick = () => history.back();
    }

    else if (path.includes("error")) {

        icon.src = "../../assets/images/reports/failure.png";
        title.textContent = "Error de envío";
        text.textContent = "Ha ocurrido algo inesperado";
        button.textContent = "Actualizar";

        button.onclick = () => history.back();
    }

    else if (path.includes("success")) {

        icon.src = "../../assets/images/reports/success.png";
        title.textContent = "¡Reporte enviado!";
        text.textContent = "Tu reporte ha sido enviado a la comunidad";
        button.textContent = "Volver a reportes";

        button.onclick = () => {
            window.location.href = "../reports/reports.html";
        };
    }

});