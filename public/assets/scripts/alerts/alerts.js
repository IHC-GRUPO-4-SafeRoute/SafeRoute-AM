document.addEventListener("DOMContentLoaded", () => {

    const openSOS = document.getElementById("open-sos-modal");
    const closeSOS = document.getElementById("cancel-sos");
    const confirmSOS = document.getElementById("confirm-sos");
    const modal = document.getElementById("sos-modal");
    const showMore = document.getElementById("show-more");
    const backButton = document.getElementById("back-button");
    const sosActivePanel = document.getElementById("sos-active-panel");
    const cancelActiveSosButton = document.getElementById("cancel-active-sos");

    if (sosActivePanel) {
    sosActivePanel.classList.add("hidden");
    }

    if (backButton) {
        backButton.addEventListener("click", () => {
            window.history.back();
        });
    }

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

            modal.classList.remove("active");

            sosActivePanel.classList.remove("hidden");

        });
    }
    
    if (showMore) {
        showMore.addEventListener("click", () => {
            window.location.href = "alerts-secondary.html";
        });
    }

    if (cancelActiveSosButton) {
        cancelActiveSosButton.addEventListener("click", () => {

            sosActivePanel.classList.add("hidden");

        });
    }

});

    