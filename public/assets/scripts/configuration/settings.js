/*
    Pantalla complementaria: Ajustes

    Implementación:
    - Permite volver al perfil.
    - Las opciones principales se navegan desde el HTML.
*/

const backButton = document.getElementById("back-button");

backButton.addEventListener("click", () => {
    window.location.href = "./profile.html";
});