document.addEventListener("DOMContentLoaded", () => {
  const backButton = document.querySelector(".back-button");
  const returnMapButton = document.querySelector(".return-map-button");

  const goBackToMap = () => {
    window.location.href = "./routes_navigation.html?route=safe";
  };

  if (backButton) {
    backButton.addEventListener("click", goBackToMap);
  }

  if (returnMapButton) {
    returnMapButton.addEventListener("click", goBackToMap);
  }
});