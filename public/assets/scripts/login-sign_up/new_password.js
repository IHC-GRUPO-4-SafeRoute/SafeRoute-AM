const newPasswordForm =
    document.getElementById("new-password-form");

const newPasswordInput =
    document.getElementById("new-password");

const confirmNewPasswordInput =
    document.getElementById("confirm-new-password");

const showNewPasswordButton =
    document.getElementById("show-new-password");

const showConfirmNewPasswordButton =
    document.getElementById("show-confirm-new-password");

const newPasswordEyeIcon =
    document.getElementById("new-password-eye-icon");

const confirmNewPasswordEyeIcon =
    document.getElementById("confirm-new-password-eye-icon");

const newPasswordMessage =
    document.getElementById("new-password-message");


function togglePasswordVisibility(
    passwordInput,
    eyeIcon,
    eyeButton
) {
    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        eyeIcon.src =
            "../../assets/images/login-sign_up/open_eye.png";

        eyeButton.setAttribute(
            "aria-label",
            "Ocultar contraseña"
        );

    } else {

        passwordInput.type = "password";

        eyeIcon.src =
            "../../assets/images/login-sign_up/close_eye.png";

        eyeButton.setAttribute(
            "aria-label",
            "Mostrar contraseña"
        );

    }
}


showNewPasswordButton.addEventListener("click", function () {

    togglePasswordVisibility(
        newPasswordInput,
        newPasswordEyeIcon,
        showNewPasswordButton
    );

});


showConfirmNewPasswordButton.addEventListener("click", function () {

    togglePasswordVisibility(
        confirmNewPasswordInput,
        confirmNewPasswordEyeIcon,
        showConfirmNewPasswordButton
    );

});


newPasswordForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const newPassword =
        newPasswordInput.value;

    const confirmNewPassword =
        confirmNewPasswordInput.value;

    newPasswordMessage.textContent = "";


    if (
        newPassword === "" ||
        confirmNewPassword === ""
    ) {

        newPasswordMessage.textContent =
            "Completa ambos campos.";

        return;
    }


    if (newPassword.length !== 13) {

        newPasswordMessage.textContent =
            "La contraseña debe tener exactamente 13 caracteres.";

        newPasswordInput.focus();

        return;
    }

        if (!/[A-Z]/.test(newPassword)) {

        newPasswordMessage.textContent =
            "La contraseña debe incluir al menos una letra mayúscula.";

        newPasswordInput.focus();

        return;
    }


    if (!/[a-z]/.test(newPassword)) {

        newPasswordMessage.textContent =
            "La contraseña debe incluir al menos una letra minúscula.";

        newPasswordInput.focus();

        return;
    }


    if (!/[0-9]/.test(newPassword)) {

        newPasswordMessage.textContent =
            "La contraseña debe incluir al menos un número.";

        newPasswordInput.focus();

        return;
    }


    if (!/[!@#$%^&*(),.?":{}|<>_\-+=]/.test(newPassword)) {

        newPasswordMessage.textContent =
            "La contraseña debe incluir al menos un carácter especial.";

        newPasswordInput.focus();

        return;
    }


    if (newPassword !== confirmNewPassword) {

        newPasswordMessage.textContent =
            "Las contraseñas no coinciden.";

        confirmNewPasswordInput.focus();

        return;
    }


    const recoveryEmail =
        localStorage.getItem("saferouteRecoveryEmail");

    if (!recoveryEmail) {

        newPasswordMessage.textContent =
            "No existe una recuperación de contraseña activa.";

        return;
    }


    let registeredUsers = [];

    try {

        registeredUsers =
            JSON.parse(
                localStorage.getItem("saferouteUsers")
            ) || [];

    } catch (error) {

        newPasswordMessage.textContent =
            "No se pudieron cargar los usuarios registrados.";

        return;
    }


    const userIndex =
        registeredUsers.findIndex(function (user) {

            return user.email === recoveryEmail;

        });

    if (userIndex === -1) {

        newPasswordMessage.textContent =
            "No se encontró el usuario registrado.";

        return;
    }


    registeredUsers[userIndex].password =
        newPassword;

    localStorage.setItem(
        "saferouteUsers",
        JSON.stringify(registeredUsers)
    );


    localStorage.removeItem("saferouteRecoveryEmail");
    localStorage.removeItem("saferouteRecoveryPin");


    window.location.href =
        "password_change_success.html";
});