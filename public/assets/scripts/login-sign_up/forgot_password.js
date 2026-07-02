const forgotPasswordForm =
    document.getElementById("forgot-password-form");

const forgotEmailInput =
    document.getElementById("forgot-email");

const forgotMessage =
    document.getElementById("forgot-message");



forgotPasswordForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email =
        forgotEmailInput.value.trim().toLowerCase();

    forgotMessage.textContent = "";


    if (email === "") {

        forgotMessage.textContent =
            "Ingresa tu correo electrónico.";

        forgotEmailInput.focus();

        return;
    }


    if (!forgotEmailInput.checkValidity()) {

        forgotMessage.textContent =
            "Ingresa un correo electrónico válido.";

        forgotEmailInput.focus();

        return;
    }


    let registeredUsers = [];

    try {

        registeredUsers =
            JSON.parse(
                localStorage.getItem("saferouteUsers")
            ) || [];

    } catch (error) {

        forgotMessage.textContent =
            "No se pudieron cargar los usuarios registrados.";

        return;
    }


    const foundUser =
        registeredUsers.find(function (user) {

            return user.email === email;

        });


    if (!foundUser) {

        forgotMessage.textContent =
            "El correo ingresado no está registrado.";

        forgotEmailInput.focus();

        return;
    }


    localStorage.setItem(
        "saferouteRecoveryEmail",
        email
    );


    window.location.href = "security-pin.html";

});