/*
    Pantalla complementaria: Soporte y Seguridad

    Implementación:
    - Cambia entre vista FAQ y Contáctanos.
    - Filtra por categoría.
    - Filtra por texto de búsqueda.
    - Expande y contrae preguntas frecuentes.
    - Redirige a Soporte Online desde Servicio al cliente.
*/

const backButton = document.getElementById("back-button");
const supportTabs = document.querySelectorAll(".support-tab");
const categoryTabs = document.querySelectorAll(".category-tab");
const categoryTabsContainer = document.getElementById("category-tabs");
const searchBox = document.getElementById("search-box");
const searchInput = document.getElementById("support-search");
const faqPanel = document.getElementById("faq-panel");
const contactsPanel = document.getElementById("contacts-panel");
const faqItems = document.querySelectorAll(".faq-item");
const contactRows = document.querySelectorAll(".contact-row");
const supportMessage = document.getElementById("support-message");

let activeView = "faq";
let activeCategory = "general";

function normalizeText(text) {
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function setActiveView(view) {
    activeView = view;
    const isFaqView = view === "faq";

    supportTabs.forEach((tab) => {
        tab.classList.toggle("is-active", tab.dataset.view === view);
    });

    categoryTabsContainer.classList.toggle("hidden", !isFaqView);
    searchBox.classList.toggle("hidden", !isFaqView);
    faqPanel.classList.toggle("hidden", !isFaqView);
    contactsPanel.classList.toggle("hidden", isFaqView);

    searchInput.value = "";
    supportMessage.textContent = "";

    filterContent();
}

function setActiveCategory(category) {
    activeCategory = category;

    categoryTabs.forEach((tab) => {
        tab.classList.toggle("is-active", tab.dataset.category === category);
    });

    filterContent();
}

function filterFaqItems(searchText) {
    faqItems.forEach((item) => {
        const itemCategory = item.dataset.category;
        const questionText = item.querySelector(".faq-question span").textContent;
        const answerText = item.querySelector(".faq-answer").textContent;

        const matchesCategory = itemCategory === activeCategory;
        const matchesSearch =
            normalizeText(questionText).includes(searchText) ||
            normalizeText(answerText).includes(searchText);

        item.classList.toggle("hidden", !(matchesCategory && matchesSearch));
    });
}

function filterContactRows(searchText) {
    contactRows.forEach((row) => {
        const rowText = row.textContent;
        const matchesSearch = normalizeText(rowText).includes(searchText);

        row.classList.toggle("hidden", !matchesSearch);
    });
}

function filterContent() {
    const searchText = normalizeText(searchInput.value.trim());

    if (activeView === "faq") {
        filterFaqItems(searchText);
        return;
    }

    filterContactRows(searchText);
}

supportTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        setActiveView(tab.dataset.view);
    });
});

categoryTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        setActiveCategory(tab.dataset.category);
    });
});

faqItems.forEach((item) => {
    const questionButton = item.querySelector(".faq-question");

    questionButton.addEventListener("click", () => {
        item.classList.toggle("is-open");
    });
});

contactRows.forEach((row) => {
    row.addEventListener("click", () => {
        const contactType = row.dataset.contact;

        if (contactType === "instagram") {
            supportMessage.textContent = "Abriendo canal de Instagram...";
            return;
        }

        if (contactType === "whatsapp") {
            supportMessage.textContent = "Abriendo canal de Whatsapp...";
        }
    });
});

searchInput.addEventListener("input", filterContent);

backButton.addEventListener("click", () => {
    window.location.href = "./profile.html";
});

setActiveView("faq");
setActiveCategory("general");