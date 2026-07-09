document.addEventListener("DOMContentLoaded", () => {
  const backButton = document.querySelector(".back-button");
  const returnMapButton = document.querySelector(".return-map-button");

  if (backButton) {
    backButton.addEventListener("click", () => {
      window.history.back();
    });
  }

  if (returnMapButton) {
    returnMapButton.addEventListener("click", () => {
      window.location.href = "./routes_navigation_sure.html";
    });
  }
});