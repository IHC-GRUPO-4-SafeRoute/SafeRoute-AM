document.addEventListener("DOMContentLoaded", () => {

    const nextButton = document.getElementById("next-button");
    const skipButton = document.getElementById("skip-button");

    nextButton.addEventListener("click", () => {
        window.location.href = "alerts.html";
    });

    skipButton.addEventListener("click", () => {
    window.location.href = "../home/home.html";
    });

});