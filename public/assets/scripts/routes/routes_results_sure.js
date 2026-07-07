document.addEventListener("DOMContentLoaded", () => {
  const backButton = document.querySelector(".back-button");
  const safeCard = document.querySelector('[data-route="safe"]');
  const fastCard = document.querySelector('[data-route="fast"]');

  if (backButton) {
    backButton.addEventListener("click", () => {
      window.location.href = "./routes_safe_routes.html";
    });
  }

  if (safeCard) {
    safeCard.addEventListener("click", () => {
      window.location.href = "./routes_navigation.html?route=safe";
    });
  }

  if (fastCard) {
    fastCard.addEventListener("click", () => {
      window.location.href = "./routes_navigation.html?route=fast";
    });
  }
});