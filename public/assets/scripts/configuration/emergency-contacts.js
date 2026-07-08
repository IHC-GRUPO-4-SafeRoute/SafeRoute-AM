/*
    Pantalla: Contactos de Emergencia

    HU-US25: Registro de contactos de emergencia

    Criterios de aceptación cubiertos:
    - Escenario 1: Registro exitoso de contacto.
      Al completar nombre, relación y teléfono, el contacto se agrega dinámicamente y se almacena en localStorage.
    - Escenario 2: Información inválida del contacto.
      Si algún campo obligatorio está vacío, se muestra un mensaje de validación.

    Implementación:
    - Los contactos no son estáticos.
    - Se renderizan desde localStorage.
    - Se pueden agregar y eliminar contactos.
*/

const STORAGE_KEY = "safeRouteEmergencyContacts";

const defaultContacts = [
    {
        id: crypto.randomUUID(),
        name: "Maria Perez",
        relation: "Mamá",
        phone: "+1 555-0001"
    },
    {
        id: crypto.randomUUID(),
        name: "Carlos González",
        relation: "Amigo",
        phone: "+1 555-0002"
    }
];

const contactsList = document.getElementById("contacts-list");
const showContactFormButton = document.getElementById("show-contact-form");
const contactForm = document.getElementById("contact-form");
const cancelContactButton = document.getElementById("cancel-contact");
const backButton = document.getElementById("back-button");

const contactNameInput = document.getElementById("contact-name");
const contactRelationInput = document.getElementById("contact-relation");
const contactPhoneInput = document.getElementById("contact-phone");
const formMessage = document.getElementById("form-message");

function getSavedContacts() {
    const savedContacts = localStorage.getItem(STORAGE_KEY);

    if (!savedContacts) {
        saveContacts(defaultContacts);
        return defaultContacts;
    }

    try {
        return JSON.parse(savedContacts);
    } catch (error) {
        saveContacts(defaultContacts);
        return defaultContacts;
    }
}

function saveContacts(contacts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
}

function getInitial(name) {
    return name.trim().charAt(0).toUpperCase();
}

function renderContacts() {
    const contacts = getSavedContacts();

    contactsList.innerHTML = "";

    contacts.forEach((contact) => {
        const contactCard = document.createElement("article");
        contactCard.className = "contact-card";

        contactCard.innerHTML = `
            <div class="contact-avatar">${getInitial(contact.name)}</div>

            <div class="contact-info">
                <h2>${contact.name}</h2>
                <p>${contact.relation} / ${contact.phone}</p>
            </div>

            <button class="delete-contact-button" type="button" aria-label="Eliminar contacto" data-id="${contact.id}">
                <img src="../../assets/images/configuration/trash.png" alt="">
            </button>
        `;

        contactsList.appendChild(contactCard);
    });
}

function showForm() {
    showContactFormButton.classList.add("hidden");
    contactForm.classList.remove("hidden");
    contactNameInput.focus();
}

function hideForm() {
    contactForm.classList.add("hidden");
    showContactFormButton.classList.remove("hidden");
    contactForm.reset();
    formMessage.textContent = "";
}

function validateContactForm() {
    const name = contactNameInput.value.trim();
    const relation = contactRelationInput.value.trim();
    const phone = contactPhoneInput.value.trim();

    if (!name || !relation || !phone) {
        formMessage.textContent = "Completa todos los campos del contacto.";
        return false;
    }

    if (phone.length < 7) {
        formMessage.textContent = "Ingresa un teléfono válido.";
        return false;
    }

    formMessage.textContent = "";
    return true;
}

function addContact() {
    const contacts = getSavedContacts();

    const newContact = {
        id: crypto.randomUUID(),
        name: contactNameInput.value.trim(),
        relation: contactRelationInput.value.trim(),
        phone: contactPhoneInput.value.trim()
    };

    contacts.push(newContact);
    saveContacts(contacts);
    renderContacts();
    hideForm();
}

function deleteContact(contactId) {
    const contacts = getSavedContacts();
    const updatedContacts = contacts.filter((contact) => contact.id !== contactId);

    saveContacts(updatedContacts);
    renderContacts();
}

showContactFormButton.addEventListener("click", showForm);
cancelContactButton.addEventListener("click", hideForm);

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateContactForm()) {
        return;
    }

    addContact();
});

contactsList.addEventListener("click", (event) => {
    const deleteButton = event.target.closest(".delete-contact-button");

    if (!deleteButton) {
        return;
    }

    deleteContact(deleteButton.dataset.id);
});

backButton.addEventListener("click", () => {
    window.location.href = "./profile.html";
});

renderContacts();