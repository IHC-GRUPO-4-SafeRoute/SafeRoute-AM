document.addEventListener("DOMContentLoaded", () => {
  const backButton = document.querySelector(".back-button");
  const resultCards = document.querySelectorAll(".result-card");
  const switchRouteButton = document.querySelector(".switch-route-button");

  if (backButton) {
    backButton.addEventListener("click", () => {
      window.location.href = "./routes_safe_routes.html";
    });
  }

  resultCards.forEach((card) => {
    card.addEventListener("click", () => {
      resultCards.forEach((item) => item.classList.remove("selected"));
      card.classList.add("selected");

      const resultType = card.dataset.resultType;

      if (resultType === "safest" || resultType === "fastest") {
        window.location.href = "./routes_navigation.html";
      }
    });
  });

  if (switchRouteButton) {
    switchRouteButton.addEventListener("click", () => {
      alert("Origen y destino intercambiados.");
    });
  }
});