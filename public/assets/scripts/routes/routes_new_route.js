document.addEventListener("DOMContentLoaded", () => {
  const backButton = document.querySelector(".back-button");
  const routeChoices = document.querySelectorAll(".route-choice");
  const addRouteButton = document.querySelector(".add-route-button");

  let selectedRoute = null;

  if (backButton) {
    backButton.addEventListener("click", () => {
      window.location.href = "./routes_saved_empty.html";
    });
  }

  routeChoices.forEach((choice) => {
    choice.addEventListener("click", () => {
      routeChoices.forEach((item) => {
        item.classList.remove("selected");
      });

      choice.classList.add("selected");
      selectedRoute = choice.dataset.route;
    });
  });

  if (addRouteButton) {
    addRouteButton.addEventListener("click", () => {
      if (!selectedRoute) {
        alert("Selecciona un tipo de ruta.");
        return;
      }

      window.location.href = "./routes_saved_route.html";
    });
  }
});