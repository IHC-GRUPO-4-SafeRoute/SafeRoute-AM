document.addEventListener("DOMContentLoaded", () => {
  const backButton = document.querySelector(".back-button");
  const finishButton = document.querySelector(".finish-route-button");
  const safeNodesButton = document.querySelector(".safe-nodes-button");
  const incidentsButton = document.querySelector(".incidents-button");

  const mapErrorAlert = document.querySelector("#mapErrorAlert");
  const mapErrorViewButton = document.querySelector(".map-error-view-button");
  const gpsErrorOverlay = document.querySelector("#gpsErrorOverlay");
  const gpsErrorButton = document.querySelector(".gps-error-button");

  const errorDelay = 10000;

  setTimeout(() => {
    if (mapErrorAlert) {
      mapErrorAlert.classList.add("is-visible");
    }
  }, errorDelay);

  if (mapErrorViewButton) {
    mapErrorViewButton.addEventListener("click", () => {
      mapErrorAlert.classList.remove("is-visible");

      if (gpsErrorOverlay) {
        gpsErrorOverlay.classList.add("is-visible");
      }
    });
  }

  if (gpsErrorButton) {
    gpsErrorButton.addEventListener("click", () => {
      location.reload();
    });
  }

  if (safeNodesButton) {
    safeNodesButton.addEventListener("click", () => {
      window.location.href = "./routes_safe_nodes.html";
    });
  }

  if (incidentsButton) {
    incidentsButton.addEventListener("click", () => {
      window.location.href = "./routes_incidents.html";
    });
  }

  if (finishButton) {
    finishButton.addEventListener("click", () => {
      window.location.href = "./routes_safe_routes.html";
    });
  }

  if (backButton) {
  backButton.addEventListener("click", () => {
    window.location.href = "./routes_results_sure.html";
  });
  }
});