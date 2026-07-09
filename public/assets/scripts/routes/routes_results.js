document.addEventListener("DOMContentLoaded", () => {
  const backButton = document.querySelector(".back-button");
  const resultCards = document.querySelectorAll(".result-card");

  if (backButton) {
    backButton.addEventListener("click", () => {
      window.location.href = "./routes_safe_routes.html";
    });
  }

  resultCards.forEach((card) => {
    card.addEventListener("click", () => {
      const resultType = card.dataset.resultType;

      if (resultType === "safest") {
        window.location.href = "./routes_navigation_sure.html";
        return;
      }

      if (resultType === "fastest") {
        window.location.href = "./routes_navigation.html?route=fast";
        return;
      }

      if (resultType === "alternative") {
        window.location.href = "./routes_navigation.html?route=alternative";
      }
    });
  });
});