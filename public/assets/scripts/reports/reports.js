const allReportsButton = document.getElementById("allReportsButton");
const myReportsButton = document.getElementById("myReportsButton");

const allReportsSection = document.getElementById("allReportsSection");
const myReportsSection = document.getElementById("myReportsSection");

allReportsButton.addEventListener("click", () => {

    allReportsButton.classList.add("active");
    myReportsButton.classList.remove("active");

    allReportsSection.style.display = "flex";
    myReportsSection.style.display = "none";

});

myReportsButton.addEventListener("click", () => {

    myReportsButton.classList.add("active");
    allReportsButton.classList.remove("active");

    allReportsSection.style.display = "none";
    myReportsSection.style.display = "flex";

});