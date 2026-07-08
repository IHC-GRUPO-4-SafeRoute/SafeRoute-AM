/*
    Pantalla complementaria: Eliminación de cuenta

    Implementación:
    - Valida que exista una sesión activa.
    - Valida que la contraseña ingresada coincida con la del usuario actual.
    - Muestra modal de confirmación.
    - Elimina el usuario de saferouteUsers.
    - Limpia datos de sesión y redirige al login.
*/

const USERS_KEY = "saferouteUsers";
const CURRENT_USER_KEY = "saferouteCurrentUser";

const backButton = document.getElementById("back-button");
const cancelButton = document.getElementById("cancel-button");
const openDeleteModalButton = document.getElementById("open-delete-modal");
const confirmDeleteButton = document.getElementById("confirm-delete-button");
const modalCancelButton = document.getElementById("modal-cancel-button");
const deleteModal = document.getElementById("delete-modal");
const deletePasswordInput = document.getElementById("delete-password-input");
const deleteMessage = document.getElementById("delete-message");
const showPasswordButton = document.getElementById("show-password-button");

function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
    } catch (error) {
        return null;
    }
}

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

function showMessage(message, type = "error") {
    deleteMessage.textContent = message;
    deleteMessage.style.color = type === "success" ? "#023686" : "#C15A2E";
}

function validatePassword() {
    const currentUser = getCurrentUser();
    const password = deletePasswordInput.value;

    if (!currentUser) {
        showMessage("Debes iniciar sesión para eliminar tu cuenta.");
        return false;
    }

    if (!password) {
        showMessage("Ingresa tu contraseña para continuar.");
        return false;
    }

    if (password !== currentUser.password) {
        showMessage("La contraseña ingresada es incorrecta.");
        return false;
    }

    showMessage("");
    return true;
}

function openDeleteModal() {
    if (!validatePassword()) {
        return;
    }

    deleteModal.classList.add("show");
    deleteModal.setAttribute("aria-hidden", "false");
}

function closeDeleteModal() {
    deleteModal.classList.remove("show");
    deleteModal.setAttribute("aria-hidden", "true");
}

function deleteCurrentAccount() {
    const currentUser = getCurrentUser();

    if (!currentUser) {
        window.location.href = "../login-sign_up/login.html";
        return;
    }

    const users = getUsers();

    const updatedUsers = users.filter((user) => {
        return user.email !== currentUser.email;
    });

    saveUsers(updatedUsers);

    localStorage.removeItem("saferouteCurrentUser");
    localStorage.removeItem("saferoutePendingUser");
    localStorage.removeItem("saferoutePinOrigin");
    localStorage.removeItem("safeRouteUserProfile");

    window.location.href = "../login-sign_up/login.html";
}

function togglePasswordVisibility() {
    const eyeIcon = showPasswordButton.querySelector("img");

    if (deletePasswordInput.type === "password") {
        deletePasswordInput.type = "text";
        eyeIcon.src = "../../assets/images/configuration/open_eye.png";
        showPasswordButton.setAttribute("aria-label", "Ocultar contraseña");
        return;
    }

    deletePasswordInput.type = "password";
    eyeIcon.src = "../../assets/images/configuration/close_eye.png";
    showPasswordButton.setAttribute("aria-label", "Mostrar contraseña");
}

openDeleteModalButton.addEventListener("click", openDeleteModal);

confirmDeleteButton.addEventListener("click", deleteCurrentAccount);

modalCancelButton.addEventListener("click", closeDeleteModal);

deleteModal.addEventListener("click", (event) => {
    if (event.target === deleteModal) {
        closeDeleteModal();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && deleteModal.classList.contains("show")) {
        closeDeleteModal();
    }
});

showPasswordButton.addEventListener("click", togglePasswordVisibility);

backButton.addEventListener("click", () => {
    window.location.href = "./settings.html";
});

cancelButton.addEventListener("click", () => {
    window.location.href = "./settings.html";
});