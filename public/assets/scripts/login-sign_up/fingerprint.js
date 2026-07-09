const useFingerprintButton =
    document.getElementById("use-fingerprint");

const fingerprintMessage =
    document.getElementById("fingerprint-message");


useFingerprintButton.addEventListener("click", function () {

    useFingerprintButton.disabled = true;

    useFingerprintButton.textContent =
        "Verificando huella...";

    useFingerprintButton.setAttribute(
        "aria-busy",
        "true"
    );

    fingerprintMessage.textContent =
        "Coloca tu dedo sobre el lector de huella.";


    setTimeout(function () {

        fingerprintMessage.textContent =
            "Huella reconocida correctamente.";

        useFingerprintButton.textContent =
            "Huella reconocida";

    }, 1000);


    setTimeout(function () {

        window.location.href = "../home/home.html";

    }, 2000);

});