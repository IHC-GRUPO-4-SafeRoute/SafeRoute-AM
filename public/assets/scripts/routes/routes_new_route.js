document.addEventListener("DOMContentLoaded", () => {
  const backButton = document.querySelector(".back-button");
  const typeOptions = document.querySelectorAll(".type-option");
  const addRouteButton = document.querySelector(".add-route-button");

  let selectedType = "";

  if (backButton) {
    backButton.addEventListener("click", () => {
      window.location.href = "./routes_saved_empty.html";
    });
  }

  typeOptions.forEach((option) => {
    option.addEventListener("click", () => {
      selectedType = option.dataset.type;

      typeOptions.forEach((item) => {
        item.classList.remove("is-selected");
      });

      option.classList.add("is-selected");
    });
  });

  if (addRouteButton) {
    addRouteButton.addEventListener("click", () => {
      window.location.href = "./routes_saved_route.html";
    });
  }
});