document.addEventListener("DOMContentLoaded", () => {
  const backButton = document.querySelector(".back-button");
  const tabButtons = document.querySelectorAll(".tab-button");
  const saveRouteButton = document.querySelector(".save-route-button");
  const routeItems = document.querySelectorAll(".saved-route");

  if (backButton) {
    backButton.addEventListener("click", () => {
      window.location.href = "./routes_safe_routes.html";
    });
  }

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      tabButtons.forEach((tab) => tab.classList.remove("active"));
      button.classList.add("active");
    });
  });

  routeItems.forEach((route) => {
    route.addEventListener("click", () => {
      const routeName = route.querySelector("h2").textContent;
      alert(`Ruta seleccionada: ${routeName}`);
    });
  });

  if (saveRouteButton) {
    saveRouteButton.addEventListener("click", () => {
      alert("Aquí podrás guardar una nueva ruta.");
    });
  }
});