/*
    Pantalla: Logros

    HU-US40: Visualización de logros y progreso
    - La pantalla muestra logros obtenidos y pendientes en achievements.html.
    - Este archivo complementa el flujo permitiendo volver al perfil desde la pantalla de logros.
*/

const backButton = document.getElementById("back-button");

backButton.addEventListener("click", () => {
    window.location.href = "./profile.html";
});