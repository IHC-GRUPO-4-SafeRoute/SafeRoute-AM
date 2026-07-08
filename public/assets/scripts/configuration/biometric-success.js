/*
    Pantalla: Confirmación biométrica

    HU-US43: Activación y gestión de acceso biométrico

    Implementación:
    - Reproduce la animación completa una sola vez.
    - Cambia el texto según la acción: guardar o eliminar.
    - Redirige a Acceso Biométrico.
*/

const successAnimation = document.getElementById("success-animation");
const successMessage = document.getElementById("success-message");

const params = new URLSearchParams(window.location.search);
const action = params.get("action");

const animationFrames = [
    "../../assets/images/configuration/password_success_1.png",
    "../../assets/images/configuration/password_success_2.png",
    "../../assets/images/configuration/password_success_3.png",
    "../../assets/images/configuration/password_success_4.png"
];

let currentFrame = 0;

function renderSuccessMessage() {
    if (action === "delete") {
        successMessage.textContent = "La huella dactilar ha sido eliminada exitosamente";
        return;
    }

    if (action === "save") {
        successMessage.textContent = "La huella dactilar ha sido guardada exitosamente";
        return;
    }

    successMessage.textContent = "La huella dactilar ha sido actualizada exitosamente";
}

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

renderSuccessMessage();
playSuccessAnimation();

setTimeout(() => {
    window.location.href = "./biometric-access.html";
}, 3600);