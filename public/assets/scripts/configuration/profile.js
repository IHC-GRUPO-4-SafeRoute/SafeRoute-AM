const openLogoutModalButton = document.getElementById("open-logout-modal");
const logoutModal = document.getElementById("logout-modal");
const cancelLogoutButton = document.getElementById("cancel-logout");
const confirmLogoutButton = document.getElementById("confirm-logout");

function openLogoutModal() {
    logoutModal.classList.add("show");
}

function closeLogoutModal() {
    logoutModal.classList.remove("show");
}

openLogoutModalButton.addEventListener("click", openLogoutModal);
cancelLogoutButton.addEventListener("click", closeLogoutModal);

logoutModal.addEventListener("click", (event) => {
    if (event.target === logoutModal) {
        closeLogoutModal();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && logoutModal.classList.contains("show")) {
        closeLogoutModal();
    }
});

confirmLogoutButton.addEventListener("click", () => {
    window.location.href = "../login-sign_up/login.html";
});