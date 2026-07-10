document.addEventListener("DOMContentLoaded", () => {
  const backButton = document.querySelector(".back-button");
  const trainingStartButton = document.querySelector(".training-start-button");
  const notificationButton = document.querySelector(".ring-button");

  if (backButton) {
    backButton.addEventListener("click", () => {
      window.location.href = "./routes_safe_routes.html";
    });
  }

  if (trainingStartButton) {
    trainingStartButton.addEventListener("click", () => {
      window.location.href = "./routes_navigation_training.html";
    });
  }

  if (notificationButton) {
    notificationButton.addEventListener("click", () => {
      window.location.href = "../notifications/notifications.html?returnTo=../routes/routes_results_training.html";
    });
  }
});