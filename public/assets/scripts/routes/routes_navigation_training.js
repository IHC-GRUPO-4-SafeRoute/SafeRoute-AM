document.addEventListener("DOMContentLoaded", () => {
  const backButton = document.querySelector(".back-button");
  const finishButton = document.querySelector(".finish-route-button");
  const safeNodesButton = document.querySelector(".safe-nodes-button");
  const incidentsButton = document.querySelector(".incidents-button");
  const trainingModal = document.querySelector("#trainingModal");
  const trainingReturnButton = document.querySelector(".training-return-button");

  if (backButton) {
    backButton.addEventListener("click", () => {
      window.location.href = "./routes_results_training.html";
    });
  }

  if (finishButton && trainingModal) {
    finishButton.addEventListener("click", () => {
      trainingModal.classList.add("is-visible");
    });
  }

  if (trainingReturnButton) {
    trainingReturnButton.addEventListener("click", () => {
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