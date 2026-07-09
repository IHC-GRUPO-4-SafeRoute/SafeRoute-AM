document.addEventListener("DOMContentLoaded", () => {
  const backButton = document.querySelector(".back-button");
  const safestRouteButton = document.querySelector(".result-card.safest");
  const fastRouteButton = document.querySelector(".result-card.fast");
  const alternativeRouteButton = document.querySelector(".result-card.alternative");

  if (backButton) {
    backButton.addEventListener("click", () => {
      window.location.href = "./routes_safe_routes.html";
    });
  }

  if (safestRouteButton) {
    safestRouteButton.addEventListener("click", () => {
      window.location.href = "./routes_navigation_error.html";
    });
  }

  if (fastRouteButton) {
    fastRouteButton.addEventListener("click", () => {
      window.location.href = "./routes_navigation.html";
    });
  }

  if (alternativeRouteButton) {
    alternativeRouteButton.addEventListener("click", () => {
      window.location.href = "./routes_navigation.html";
    });
  }
});