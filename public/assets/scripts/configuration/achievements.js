/*
    Pantalla: Logros

    HU relacionada:
    US40 - Visualización de logros y progreso

    Implementación:
    - Maneja la navegación de retorno desde Logros hacia Perfil.

    Criterios de aceptación cubiertos:
    - Complementa la visualización de logros y progreso con navegación dentro del flujo de configuración.
*/

const backButton = document.getElementById("back-button");

backButton.addEventListener("click", () => {
    window.location.href = "./profile.html";
});