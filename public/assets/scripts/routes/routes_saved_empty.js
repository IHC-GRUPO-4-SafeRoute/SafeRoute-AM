document.addEventListener("DOMContentLoaded", () => {
  const backButton = document.querySelector(".back-button");
  const saveRouteButton = document.querySelector(".save-route-button");
  const favoritesTab = document.querySelector(".tab-button:first-child");

  if (backButton) {
    backButton.addEventListener("click", () => {
      window.location.href = "./routes_frequent_routes.html";
    });
  }

  if (saveRouteButton) {
    saveRouteButton.addEventListener("click", () => {
      window.location.href = "./routes_new_route.html";
    });
  }

  if (favoritesTab) {
    favoritesTab.addEventListener("click", () => {
      window.location.href = "./routes_frequent_routes.html";
    });
  }
});