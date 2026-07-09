document.addEventListener("DOMContentLoaded", () => {
  const backButton = document.querySelector(".back-button");
  const savedTabButton = document.querySelector(".saved-tab-button");
  const saveRouteButton = document.querySelector(".save-route-button");

  if (backButton) {
    backButton.addEventListener("click", () => {
      window.location.href = "./routes_safe_routes.html";
    });
  }

  if (savedTabButton) {
    savedTabButton.addEventListener("click", () => {
      window.location.href = "./routes_saved_empty.html";
    });
  }

  if (saveRouteButton) {
    saveRouteButton.addEventListener("click", () => {
      window.location.href = "./routes_new_route.html";
    });
  }
});