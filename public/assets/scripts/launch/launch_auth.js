const loginButton = document.getElementById("login-button");
const registerButton = document.getElementById("register-button");
const forgotPasswordButton = document.getElementById("forgot-password-button");

loginButton.addEventListener("click", () => {
    console.log("Login");
});

registerButton.addEventListener("click", () => {
    console.log("Register");
});

forgotPasswordButton.addEventListener("click", () => {
    console.log("Forgot Password");
});