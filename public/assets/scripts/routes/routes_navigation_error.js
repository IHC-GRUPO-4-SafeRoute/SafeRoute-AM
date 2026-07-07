document.addEventListener("DOMContentLoaded", () => {
  const navigationPage = document.querySelector(".navigation-page");
  const backButton = document.querySelector(".back-button");

  const mapErrorAlert = document.querySelector("#mapErrorAlert");
  const mapErrorViewButton = document.querySelector(".map-error-view-button");
  const gpsErrorOverlay = document.querySelector("#gpsErrorOverlay");
  const gpsErrorButton = document.querySelector(".gps-error-button");

  if (navigationPage) {
    navigationPage.addEventListener("click", (event) => {
      const clickedInsideError =
        event.target.closest(".map-error-alert") ||
        event.target.closest(".gps-error-overlay") ||
        event.target.closest(".back-button");

      if (clickedInsideError) return;

      mapErrorAlert.classList.add("is-visible");
      gpsErrorOverlay.classList.remove("is-visible");
    });
  }

  if (mapErrorViewButton) {
    mapErrorViewButton.addEventListener("click", (event) => {
      event.stopPropagation();
      mapErrorAlert.classList.remove("is-visible");
      gpsErrorOverlay.classList.add("is-visible");
    });
  }

  if (gpsErrorButton) {
    gpsErrorButton.addEventListener("click", (event) => {
      event.stopPropagation();
      gpsErrorOverlay.classList.remove("is-visible");
    });
  }

  if (backButton) {
    backButton.addEventListener("click", (event) => {
      event.stopPropagation();
      window.location.href = "./routes_navigation.html?route=safe";
    });
  }
});