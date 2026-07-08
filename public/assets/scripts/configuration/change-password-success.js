/*
    Pantalla: Confirmación de cambio de clave

    HU-US38: Inicio de sesión seguro

    Implementación:
    - Reproduce la animación una sola vez usando imágenes por secuencia.
    - Mantiene el último frame unos segundos.
    - Luego redirige a Configuración de Seguridad.
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