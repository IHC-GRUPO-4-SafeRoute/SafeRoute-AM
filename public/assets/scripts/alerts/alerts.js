document.addEventListener("DOMContentLoaded", () => {

    const openSOS = document.getElementById("open-sos-modal");
    const closeSOS = document.getElementById("cancel-sos");
    const confirmSOS = document.getElementById("confirm-sos");
    const modal = document.getElementById("sos-modal");
    const showMore = document.getElementById("show-more");

    if (openSOS && modal) {
        openSOS.addEventListener("click", () => {
            modal.classList.add("active");
        });
    }

    if (closeSOS && modal) {
        closeSOS.addEventListener("click", () => {
            modal.classList.remove("active");
        });
    }

    if (modal) {
        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.classList.remove("active");
            }
        });
    }

    if (confirmSOS) {
        confirmSOS.addEventListener("click", () => {
            window.location.href = "../home/home.html";
        });
    }

    if (showMore) {
        showMore.addEventListener("click", () => {
            window.location.href = "alerts-secondary.html";
        });
    }

});