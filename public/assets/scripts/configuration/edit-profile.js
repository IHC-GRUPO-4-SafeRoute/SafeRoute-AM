/*
    Pantalla: Editar Perfil

    HU-US35: Edición de perfil de usuario

    Criterios de aceptación cubiertos:
    - El usuario puede editar nombre, correo, teléfono y avatar.
    - Los cambios se guardan en safeRouteUserProfile.
    - También se actualiza saferouteCurrentUser y saferouteUsers.
*/

const STORAGE_KEY = "safeRouteUserProfile";
const USERS_KEY = "saferouteUsers";
const CURRENT_USER_KEY = "saferouteCurrentUser";

const defaultProfile = {
    name: "Usuario SafeRoute",
    email: "usuario@saferoute.com",
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

function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
    } catch (error) {
        return null;
    }
}

function saveCurrentUser(user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

function getUsers() {
    try {
        return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch (error) {
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getSavedEditedProfile() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch (error) {
        return null;
    }
}

function getSavedProfile() {
    const currentUser = getCurrentUser();
    const editedProfile = getSavedEditedProfile();

    const sessionProfile = {
        ...defaultProfile,
        name: currentUser?.name || defaultProfile.name,
        email: currentUser?.email || defaultProfile.email,
        phone: currentUser?.phone || defaultProfile.phone,
        avatar: currentUser?.avatar || defaultProfile.avatar
    };

    const profileBelongsToCurrentUser =
        editedProfile &&
        currentUser &&
        editedProfile.email === currentUser.email;

    if (!profileBelongsToCurrentUser) {
        return sessionProfile;
    }

    return {
        ...sessionProfile,
        ...editedProfile
    };
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
        formMessage.style.color = "#C15A2E";
        formMessage.textContent = "La información es obligatoria.";
        return false;
    }

    if (!email.includes("@")) {
        formMessage.style.color = "#C15A2E";
        formMessage.textContent = "Ingresa un correo válido.";
        return false;
    }

    formMessage.textContent = "";
    return true;
}

function updateUserSessionAndList(updatedProfile) {
    const currentUser = getCurrentUser();

    if (!currentUser) {
        return;
    }

    const users = getUsers();

    const updatedCurrentUser = {
        ...currentUser,
        name: updatedProfile.name,
        email: updatedProfile.email,
        phone: updatedProfile.phone,
        avatar: updatedProfile.avatar
    };

    const userIndex = users.findIndex((user) => {
        return user.email === currentUser.email;
    });

    if (userIndex !== -1) {
        users[userIndex] = {
            ...users[userIndex],
            name: updatedProfile.name,
            email: updatedProfile.email,
            phone: updatedProfile.phone,
            avatar: updatedProfile.avatar
        };

        saveUsers(users);
    }

    saveCurrentUser(updatedCurrentUser);
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
        email: emailInput.value.trim().toLowerCase(),
        phone: phoneInput.value.trim(),
        avatar: selectedAvatar
    };

    saveProfile(updatedProfile);
    updateUserSessionAndList(updatedProfile);

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