document.addEventListener("DOMContentLoaded", () => {
  const backButton = document.querySelector(".back-button");
  const finishButton = document.querySelector(".finish-route-button");
  const modal = document.querySelector("#trainingModal");
  const returnButton = document.querySelector(".training-return-button");
  const safeNodesButton = document.querySelector(".safe-nodes-button");
  const incidentsButton = document.querySelector(".incidents-button");

  if (backButton) {
    backButton.addEventListener("click", () => {
      window.location.href = "./routes_results_training.html";
    });
  }

  if (finishButton) {
    finishButton.addEventListener("click", () => {
      modal.classList.add("is-visible");
    });
  }

  if (returnButton) {
    returnButton.addEventListener("click", () => {
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