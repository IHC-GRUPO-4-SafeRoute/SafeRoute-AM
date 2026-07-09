const allowLocationButton = document.getElementById("allow-location-button");
const laterButton = document.getElementById("later-button");
const skipButton = document.getElementById("skip-button");

allowLocationButton.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("Latitud:", position.coords.latitude);
                console.log("Longitud:", position.coords.longitude);
                window.location.href = "../home/home.html";
            },
            (error) => {
                alert("No se pudo obtener la ubicación");
                window.location.href = "../home/home.html";
            }
        );
    } else {
        
        alert("Tu navegador no soporta geolocalización");
        window.location.href = "../home/home.html";
    }
});

laterButton.addEventListener("click", () => {
    window.location.href = "../home/home.html";
});
