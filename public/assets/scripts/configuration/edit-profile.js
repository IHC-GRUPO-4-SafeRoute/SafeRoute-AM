/*
    Pantalla: Editar Perfil

    HU-US35: Edición de perfil de usuario

    Criterios de aceptación cubiertos:
    - Escenario 1: Actualización exitosa del perfil.
      Al guardar cambios, se almacenan nombre, correo, teléfono y avatar en localStorage.
      Luego profile.html puede leer esos datos y reflejarlos.
    - Escenario 2: Información inválida.
      Si los campos obligatorios están vacíos, se muestra un mensaje de validación.
*/

const STORAGE_KEY = "safeRouteUserProfile";

const defaultProfile = {
    name: "Lucía Martínez",
    email: "lucia@gmail.com",
    phone: "+1 555-0100",
    avatar: "../../assets/images/configuration/profile1.png"
};

const form = document.getElementById("edit-profile-form");
const backButton = document.getElementById("back-button");
const currentAvatar = document.getElementById("current-avatar");
const avatarUpload = document.getElementById("avatar-upload");
const deletePhotoButton = document.getElementById("delete-photo-button");
const avatarOptions = document.querySelectorAll(".avatar-option");
const nameInput = document.getElementById("profile-name-input");
const emailInput = document.getElementById("profile-email-input");
const phoneInput = document.getElementById("profile-phone-input");
const formMessage = document.getElementById("form-message");

let selectedAvatar = defaultProfile.avatar;

function getSavedProfile() {
    const savedProfile = localStorage.getItem(STORAGE_KEY);

    if (!savedProfile) {
        return defaultProfile;
    }

    try {
        return {
            ...defaultProfile,
            ...JSON.parse(savedProfile)
        };
    } catch (error) {
        return defaultProfile;
    }
}

function saveProfile(profile) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

function setSelectedAvatar(avatarSource) {
    selectedAvatar = avatarSource;
    currentAvatar.src = avatarSource;

    avatarOptions.forEach((option) => {
        const isSelected = option.dataset.avatar === avatarSource;
        option.classList.toggle("selected", isSelected);
    });
}

function loadProfileData() {
    const profile = getSavedProfile();

    nameInput.value = profile.name;
    emailInput.value = profile.email;
    phoneInput.value = profile.phone;
    setSelectedAvatar(profile.avatar);
}

function validateForm() {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();

    if (!name || !email || !phone) {
        formMessage.textContent = "La información es obligatoria.";
        return false;
    }

    formMessage.textContent = "";
    return true;
}

avatarOptions.forEach((option) => {
    option.addEventListener("click", () => {
        setSelectedAvatar(option.dataset.avatar);
    });
});

avatarUpload.addEventListener("change", () => {
    const file = avatarUpload.files[0];

    if (!file) {
        return;
    }

    const reader = new FileReader();

    reader.addEventListener("load", () => {
        setSelectedAvatar(reader.result);
    });

    reader.readAsDataURL(file);
});

deletePhotoButton.addEventListener("click", () => {
    avatarUpload.value = "";
    setSelectedAvatar(defaultProfile.avatar);
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    const updatedProfile = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        avatar: selectedAvatar
    };

    saveProfile(updatedProfile);

    formMessage.style.color = "#023686";
    formMessage.textContent = "Perfil actualizado correctamente.";

    setTimeout(() => {
        window.location.href = "./profile.html";
    }, 600);
});

backButton.addEventListener("click", () => {
    window.location.href = "./profile.html";
});

loadProfileData();