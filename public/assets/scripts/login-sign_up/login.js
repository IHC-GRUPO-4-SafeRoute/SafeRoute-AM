const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const showPasswordButton = document.getElementById("show-password");
const passwordEyeIcon = document.getElementById("password-eye-icon");
const loginMessage = document.getElementById("login-message");


showPasswordButton.addEventListener("click", function () {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        passwordEyeIcon.src =
            "../../assets/images/login-sign_up/open_eye.png";

        showPasswordButton.setAttribute(
            "aria-label",
            "Ocultar contraseña"
        );

    } else {

        passwordInput.type = "password";

        passwordEyeIcon.src =
            "../../assets/images/login-sign_up/close_eye.png";

        showPasswordButton.setAttribute(
            "aria-label",
            "Mostrar contraseña"
        );

    }

});


/* Validar inicio de sesión */

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;

    const users =
        JSON.parse(localStorage.getItem("saferouteUsers")) || [];

    const validUser = users.find(function (user) {
        return (
            user.email === email &&
            user.password === password
        );
    });

    if (validUser) {

        /*
            Se guarda temporalmente al usuario mientras
            completa la verificación del PIN.
        */

        localStorage.setItem(
            "saferoutePendingUser",
            JSON.stringify(validUser)
        );


        /*
            Indica que el usuario llegó al PIN
            desde el inicio de sesión.
        */

        localStorage.setItem(
            "saferoutePinOrigin",
            "login"
        );


        loginMessage.textContent = "";


        window.location.href =
            "security_pin.html";

    } else {

        loginMessage.textContent =
            "Usuario o contraseña incorrectos.";

    }

});