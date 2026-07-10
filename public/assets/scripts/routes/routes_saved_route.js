document.addEventListener("DOMContentLoaded", () => {
  const backButton = document.querySelector(".back-button");
  const notificationButton = document.querySelector(".ring-button");
  const favoriteTabButton = document.querySelector(".favorite-tab-button");
  const saveRouteButton = document.querySelector(".save-route-button");
  const deleteRouteButton = document.querySelector(".delete-route-button");

  const deleteRouteModal = document.querySelector("#deleteRouteModal");
  const deleteConfirmButton = document.querySelector(".delete-confirm-button");
  const deleteCancelButton = document.querySelector(".delete-cancel-button");

  if (backButton) {
    backButton.addEventListener("click", () => {
      window.location.href = "./routes_saved_empty.html";
    });
  }

  if (notificationButton) {
    notificationButton.addEventListener("click", () => {
      window.location.href = "../notifications/notifications.html?returnTo=../routes/routes_saved_route.html";
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

  if (deleteRouteButton && deleteRouteModal) {
    deleteRouteButton.addEventListener("click", () => {
      deleteRouteModal.classList.add("is-visible");
    });
  }

  if (deleteConfirmButton) {
    deleteConfirmButton.addEventListener("click", () => {
      window.location.href = "./routes_saved_empty.html";
    });
  }

  if (deleteCancelButton && deleteRouteModal) {
    deleteCancelButton.addEventListener("click", () => {
      deleteRouteModal.classList.remove("is-visible");
    });
  }
});