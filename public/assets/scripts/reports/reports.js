const allReportsButton = document.getElementById("allReports");
const myReportsButton = document.getElementById("myReports");

const allReportsSection = document.getElementById("allReportsSection");
const myReportsSection = document.getElementById("myReportsSection");

if (
    allReportsButton &&
    myReportsButton &&
    allReportsSection &&
    myReportsSection
) {

    allReportsButton.addEventListener("click", () => {

        allReportsButton.classList.add("active");
        myReportsButton.classList.remove("active");

        allReportsSection.hidden = false;
        myReportsSection.hidden = true;

    });

    myReportsButton.addEventListener("click", () => {

        myReportsButton.classList.add("active");
        allReportsButton.classList.remove("active");

        myReportsSection.hidden = false;
        allReportsSection.hidden = true;

    });

}