document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-box input");
  const searchButton = document.querySelector(".search-button");
  const routeOptions = document.querySelectorAll(".route-option");
  const favoriteButtons = document.querySelectorAll(".favorite-button");
  const backButton = document.querySelector(".back-button");

  const favoriteIcon = "../../assets/images/routes/Favorite.png";
  const noFavoriteIcon = "../../assets/images/routes/No_Favorite.png";

  searchButton.addEventListener("click", () => {
    const destination = searchInput.value.trim();

    if (!destination) {
      alert("Ingresa un destino para buscar una ruta.");
      searchInput.focus();
      return;
    }

    alert(`Buscando ruta hacia: ${destination}`);
  });

  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      searchButton.click();
    }
  });

  routeOptions.forEach((option) => {
    const optionButton = option.querySelector(".route-option-button");
    const optionTitle = option.querySelector("h3").textContent;

    optionButton.addEventListener("click", () => {
      routeOptions.forEach((item) => item.classList.remove("selected"));
      option.classList.add("selected");
      alert(`Seleccionaste: ${optionTitle}`);
    });
  });

  favoriteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const image = button.querySelector("img");
      const isFavorite = button.classList.toggle("active");

      image.src = isFavorite ? favoriteIcon : noFavoriteIcon;
      button.setAttribute(
        "aria-label",
        isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"
      );
    });
  });

  backButton.addEventListener("click", () => {
    window.history.back();
  });
});