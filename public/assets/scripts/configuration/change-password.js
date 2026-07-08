/*
    Pantalla: Cambiar clave

    HU-US38: Inicio de sesión seguro

    Implementación funcional:
    - Valida la clave actual del usuario autenticado.
    - Valida reglas mínimas de seguridad para la nueva clave.
    - Actualiza la contraseña en "saferouteUsers".
    - Actualiza también "saferouteCurrentUser".
    - Esto permite que el login use la nueva contraseña después de cerrar sesión.
*/

const USERS_KEY = "saferouteUsers";
const CURRENT_USER_KEY = "saferouteCurrentUser";

const changePasswordForm = document.getElementById("change-password-form");
const currentPasswordInput = document.getElementById("current-password");
const newPasswordInput = document.getElementById("new-password");
const confirmPasswordInput = document.getElementById("confirm-password");
const changePasswordMessage = document.getElementById("change-password-message");
const backButton = document.getElementById("back-button");
const showPasswordButtons = document.querySelectorAll(".show-password-button");

function getUsers() {
    try {
        return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch (error) {
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
    } catch (error) {
        return null;
    }
}

function saveCurrentUser(user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

function showMessage(message, type = "error") {
    changePasswordMessage.textContent = message;
    changePasswordMessage.style.color = type === "success" ? "#023686" : "#C15A2E";
}

function validatePasswordRules(password) {
    if (password.length < 8) {
        return "La nueva clave debe tener al menos 8 caracteres.";
    }

    if (!/[A-Z]/.test(password)) {
        return "La nueva clave debe incluir una letra mayúscula.";
    }

    if (!/[a-z]/.test(password)) {
        return "La nueva clave debe incluir una letra minúscula.";
    }

    if (!/[0-9]/.test(password)) {
        return "La nueva clave debe incluir un número.";
    }

    if (!/[!@#$%^&*(),.?":{}|<>_\-+=]/.test(password)) {
        return "La nueva clave debe incluir un carácter especial.";
    }

    return "";
}

function togglePasswordVisibility(button) {
    const targetInputId = button.dataset.target;
    const targetInput = document.getElementById(targetInputId);
    const eyeIcon = button.querySelector("img");

    if (!targetInput || !eyeIcon) {
        return;
    }

    if (targetInput.type === "password") {
        targetInput.type = "text";
        eyeIcon.src = "../../assets/images/configuration/open_eye.png";
        button.setAttribute("aria-label", "Ocultar clave");
    } else {
        targetInput.type = "password";
        eyeIcon.src = "../../assets/images/configuration/close_eye.png";
        button.setAttribute("aria-label", "Mostrar clave");
    }
}

function redirectIfNoSession() {
    const currentUser = getCurrentUser();

    if (!currentUser) {
        showMessage("Debes iniciar sesión para cambiar tu clave.");

        setTimeout(() => {
            window.location.href = "../login-sign_up/login.html";
        }, 1200);
    }
}

showPasswordButtons.forEach((button) => {
    button.addEventListener("click", () => {
        togglePasswordVisibility(button);
    });
});

changePasswordForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const currentPassword = currentPasswordInput.value;
    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    const currentUser = getCurrentUser();
    const users = getUsers();

    showMessage("");

    if (!currentUser) {
        showMessage("Debes iniciar sesión para cambiar tu clave.");
        return;
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
        showMessage("Completa todos los campos.");
        return;
    }

    if (currentPassword !== currentUser.password) {
        showMessage("La clave actual es incorrecta.");
        currentPasswordInput.focus();
        return;
    }

    if (newPassword === currentPassword) {
        showMessage("La nueva clave debe ser diferente a la actual.");
        newPasswordInput.focus();
        return;
    }

    const passwordValidationMessage = validatePasswordRules(newPassword);

    if (passwordValidationMessage) {
        showMessage(passwordValidationMessage);
        newPasswordInput.focus();
        return;
    }

    if (newPassword !== confirmPassword) {
        showMessage("Las claves no coinciden.");
        confirmPasswordInput.focus();
        return;
    }

    const userIndex = users.findIndex((user) => {
        return user.email === currentUser.email;
    });

    if (userIndex === -1) {
        showMessage("No se encontró el usuario en el registro.");
        return;
    }

    const updatedUser = {
        ...users[userIndex],
        password: newPassword
    };

    users[userIndex] = updatedUser;

    saveUsers(users);
    saveCurrentUser(updatedUser);

    showMessage("Clave actualizada correctamente.", "success");

    changePasswordForm.reset();

    setTimeout(() => {
        window.location.href = "./security-settings.html";
    }, 900);
});

backButton.addEventListener("click", () => {
    window.location.href = "./security-settings.html";
});

redirectIfNoSession();