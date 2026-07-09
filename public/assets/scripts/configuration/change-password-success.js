/*
    Pantalla: Confirmación de cambio de clave

    HU relacionada:
    Pantalla complementaria

    Implementación:
    - Reproduce animación de éxito una sola vez.
    - Muestra mensaje de clave cambiada exitosamente.
    - Redirige a Configuración de Seguridad.

    Criterios de aceptación cubiertos:
    - Confirmación visual del cambio exitoso dentro del flujo complementario de cambio de clave.
*/

const successAnimation = document.getElementById("success-animation");

const animationFrames = [
    "../../assets/images/configuration/password_success_1.png",
    "../../assets/images/configuration/password_success_2.png",
    "../../assets/images/configuration/password_success_3.png",
    "../../assets/images/configuration/password_success_4.png"
];

let currentFrame = 0;

function playSuccessAnimation() {
    successAnimation.src = animationFrames[currentFrame];

    const frameInterval = setInterval(() => {
        currentFrame += 1;

        if (currentFrame >= animationFrames.length) {
            clearInterval(frameInterval);
            successAnimation.src = animationFrames[animationFrames.length - 1];
            return;
        }

        successAnimation.src = animationFrames[currentFrame];
    }, 650);
}

playSuccessAnimation();

setTimeout(() => {
    window.location.href = "./security-settings.html";
}, 3600);