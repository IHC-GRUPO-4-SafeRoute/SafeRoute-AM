const pinNumbers =
    document.querySelectorAll(".pin-number");

const acceptPinButton =
    document.getElementById("accept-pin");

const resendPinButton =
    document.getElementById("resend-pin");

const pinMessage =
    document.getElementById("pin-message");


let selectedPinNumbers = [];




pinNumbers.forEach(function (pinNumber) {

    pinNumber.addEventListener("click", function () {

        const number =
            pinNumber.dataset.number;

        const numberIndex =
            selectedPinNumbers.indexOf(number);


        if (numberIndex !== -1) {

            selectedPinNumbers.splice(numberIndex, 1);

            pinNumber.classList.remove("selected");

        } else {


            if (selectedPinNumbers.length >= 6) {

                pinMessage.textContent =
                    "Solo puedes seleccionar 6 números.";

                return;
            }

            selectedPinNumbers.push(number);

            pinNumber.classList.add("selected");

        }


        pinMessage.textContent = "";

    });

});


acceptPinButton.addEventListener("click", function () {

    if (selectedPinNumbers.length !== 6) {

        pinMessage.textContent =
            "Debes seleccionar los 6 números.";

        return;
    }


    const pinOrigin =
        localStorage.getItem("saferoutePinOrigin");


    /*
        Flujo de inicio de sesión
    */

    if (pinOrigin === "login") {

        const pendingUser =
            localStorage.getItem("saferoutePendingUser");


        if (!pendingUser) {

            pinMessage.textContent =
                "No se encontró un inicio de sesión pendiente.";

            return;
        }


        /*
            Después de aceptar el PIN, el usuario
            ya queda registrado como usuario actual.
        */

        localStorage.setItem(
            "saferouteCurrentUser",
            pendingUser
        );


        localStorage.removeItem(
            "saferoutePendingUser"
        );

        localStorage.removeItem(
            "saferoutePinOrigin"
        );


        window.location.href =
            "../home/home.html";

        return;
    }


    /*
        Flujo de recuperación de contraseña
    */

    if (pinOrigin === "forgot-password") {

        localStorage.setItem(
            "saferouteRecoveryPin",
            selectedPinNumbers.join("")
        );


        localStorage.removeItem(
            "saferoutePinOrigin"
        );


        window.location.href =
            "new_password.html";

        return;
    }


    pinMessage.textContent =
        "No se pudo identificar el proceso.";

});



resendPinButton.addEventListener("click", function () {

    selectedPinNumbers = [];

    pinNumbers.forEach(function (pinNumber) {

        pinNumber.classList.remove("selected");

    });

    pinMessage.textContent =
        "Se envió nuevamente el PIN de demostración.";

});