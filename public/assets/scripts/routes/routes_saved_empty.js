document.addEventListener("DOMContentLoaded", () => {
  const backButton = document.querySelector(".back-button");
  const notificationButton = document.querySelector(".notification-button");
  const favoriteTabButton = document.querySelector(".favorite-tab-button");
  const saveRouteButton = document.querySelector(".save-route-button");

  if (backButton) {
    backButton.addEventListener("click", () => {
      window.location.href = "./routes_frequent_routes.html";
    });
  }

  if (notificationButton) {
    notificationButton.addEventListener("click", () => {
      window.location.href = "../notifications/notifications.html?returnTo=../routes/routes_saved_empty.html";
    });
  }

  if (favoriteTabButton) {
    favoriteTabButton.addEventListener("click", () => {
      window.location.href = "./routes_frequent_routes.html";
    });
  }

  if (saveRouteButton) {
    saveRouteButton.addEventListener("click", () => {
      window.location.href = "./routes_new_route.html";
    });
  }
});