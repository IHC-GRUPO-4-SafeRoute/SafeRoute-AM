const registerForm =
    document.getElementById("register-form");

const registerMessage =
    document.getElementById("register-message");

const nameInput =
    document.getElementById("name");

const emailInput =
    document.getElementById("register-email");

const phoneInput =
    document.getElementById("phone");

const birthDateInput =
    document.getElementById("birth-date");

const registerPassword =
    document.getElementById("register-password");

const confirmPassword =
    document.getElementById("confirm-password");

const showRegisterPassword =
    document.getElementById("show-register-password");

const showConfirmPassword =
    document.getElementById("show-confirm-password");

const registerEyeIcon =
    document.getElementById("register-eye-icon");

const confirmEyeIcon =
    document.getElementById("confirm-eye-icon");



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


showRegisterPassword.addEventListener("click", function () {

    togglePasswordVisibility(
        registerPassword,
        registerEyeIcon,
        showRegisterPassword
    );

});



showConfirmPassword.addEventListener("click", function () {

    togglePasswordVisibility(
        confirmPassword,
        confirmEyeIcon,
        showConfirmPassword
    );

});


registerForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name =
        nameInput.value.trim();

    const email =
        emailInput.value.trim().toLowerCase();

    const phone =
        phoneInput.value.trim();

    const birthDate =
        birthDateInput.value;

    const password =
        registerPassword.value;

    const passwordConfirmation =
        confirmPassword.value;

    registerMessage.textContent = "";


    if (
        name === "" ||
        email === "" ||
        phone === "" ||
        birthDate === "" ||
        password === "" ||
        passwordConfirmation === ""
    ) {

        registerMessage.textContent =
            "Completa todos los campos.";

        return;
    }


    if (password.length < 8) {

        registerMessage.textContent =
            "La contraseña debe tener al menos 8 caracteres.";

        return;
    }

    if (!/[A-Z]/.test(password)) {

        registerMessage.textContent =
            "La contraseña debe incluir al menos una letra mayúscula.";

        return;
    }


    if (!/[a-z]/.test(password)) {

        registerMessage.textContent =
            "La contraseña debe incluir al menos una letra minúscula.";

        return;
    }


    if (!/[0-9]/.test(password)) {

        registerMessage.textContent =
            "La contraseña debe incluir al menos un número.";

        return;
    }


    if (!/[!@#$%^&*(),.?":{}|<>_\-+=]/.test(password)) {

        registerMessage.textContent =
            "La contraseña debe incluir al menos un carácter especial.";

        return;
    }


    if (password !== passwordConfirmation) {

        registerMessage.textContent =
            "Las contraseñas no coinciden.";

        return;
    }


    if (password !== passwordConfirmation) {

        registerMessage.textContent =
            "Las contraseñas no coinciden.";

        return;
    }


    const users =
        JSON.parse(
            localStorage.getItem("saferouteUsers")
        ) || [];


    const userAlreadyExists =
        users.some(function (user) {

            return user.email === email;

        });

    if (userAlreadyExists) {

        registerMessage.textContent =
            "Ya existe una cuenta con este correo.";

        return;
    }


    const newUser = {
        name: name,
        email: email,
        phone: phone,
        birthDate: birthDate,
        password: password
    };


    users.push(newUser);

    localStorage.setItem(
        "saferouteUsers",
        JSON.stringify(users)
    );


    alert("Cuenta registrada correctamente.");


    window.location.href = "login.html";

});