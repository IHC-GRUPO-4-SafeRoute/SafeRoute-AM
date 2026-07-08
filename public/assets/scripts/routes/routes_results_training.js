document.addEventListener("DOMContentLoaded", () => {
  const backButton = document.querySelector(".back-button");
  const trainingStartButton = document.querySelector(".training-start-button");

  if (backButton) {
    backButton.addEventListener("click", () => {
      window.location.href = "./routes_safe_routes.html";
    });
  }

  if (trainingStartButton) {
    trainingStartButton.addEventListener("click", () => {
      window.location.href = "./routes_navigation.html?route=training";
    });
  }
});