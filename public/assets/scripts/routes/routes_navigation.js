document.addEventListener("DOMContentLoaded", () => {
  const backButton = document.querySelector(".back-button");
  const finishRouteButton = document.querySelector(".finish-route-button");
  const safeNodesButton = document.querySelector(".safe-nodes-button");
  const incidentsButton = document.querySelector(".incidents-button");

  if (backButton) {
    backButton.addEventListener("click", () => {
      window.location.href = "./routes_results.html";
    });
  }

  if (finishRouteButton) {
    finishRouteButton.addEventListener("click", () => {
      window.location.href = "./routes_safe_routes.html";
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
});