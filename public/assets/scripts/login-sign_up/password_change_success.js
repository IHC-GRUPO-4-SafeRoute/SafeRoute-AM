const statusImage =
    document.getElementById("password-status-image");

const successTitle =
    document.querySelector(".success-information h1");

const successText =
    document.querySelector(".success-information p");



const animationImages = [
    "../../assets/images/login-sign_up/Property1=Default.png",
    "../../assets/images/login-sign_up/Property1=Variant2.png",
    "../../assets/images/login-sign_up/Property1=Variant3.png",
    "../../assets/images/login-sign_up/Property1=Variant4.png"
];


statusImage.src = animationImages[0];

statusImage.alt =
    "Procesando el cambio de contraseña";


setTimeout(function () {

    statusImage.src = animationImages[1];

}, 500);


setTimeout(function () {

    statusImage.src = animationImages[2];

}, 1000);


setTimeout(function () {

    statusImage.src = animationImages[3];

    statusImage.alt =
        "Contraseña cambiada correctamente";

    successTitle.textContent =
        "La contraseña se cambió correctamente";

    successText.textContent =
        "En unos segundos regresarás al inicio de sesión.";

}, 1500);


setTimeout(function () {

    window.location.href = "login.html";

}, 3500);