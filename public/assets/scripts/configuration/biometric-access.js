/*
    Pantalla: Acceso Biométrico

    HU-US43: Activación y gestión de acceso biométrico

    Implementación funcional:
    - Muestra varias huellas registradas por usuario.
    - Cada huella se guarda con id, nombre y fecha.
    - Permite abrir el detalle de una huella específica.
    - Permite agregar nuevas huellas.
*/

const BIOMETRIC_KEY = "safeRouteBiometricAccess";
const CURRENT_USER_KEY = "saferouteCurrentUser";
const PROFILE_KEY = "safeRouteUserProfile";

const backButton = document.getElementById("back-button");
const addBiometricButton = document.getElementById("add-biometric-button");
const biometricList = document.getElementById("biometric-list");
const biometricMessage = document.getElementById("biometric-message");

function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
    } catch (error) {
        return null;
    }
}

function getEditedProfile() {
    try {
        return JSON.parse(localStorage.getItem(PROFILE_KEY));
    } catch (error) {
        return null;
    }
}

function getUserName() {
    const currentUser = getCurrentUser();
    const editedProfile = getEditedProfile();

    const profileBelongsToCurrentUser =
        editedProfile &&
        currentUser &&
        editedProfile.email === currentUser.email;

    if (profileBelongsToCurrentUser) {
        return editedProfile.name;
    }

    return currentUser?.name || "Usuario";
}

function getFirstName(fullName) {
    return fullName.trim().split(" ")[0];
}

function getCurrentUserKey() {
    const currentUser = getCurrentUser();
    return currentUser?.email || "demo-user";
}

function getBiometricData() {
    try {
        return JSON.parse(localStorage.getItem(BIOMETRIC_KEY)) || {};
    } catch (error) {
        return {};
    }
}

function saveBiometricData(data) {
    localStorage.setItem(BIOMETRIC_KEY, JSON.stringify(data));
}

function getDefaultFingerprintLabel() {
    return `Huella dactilar de ${getFirstName(getUserName())}`;
}

function normalizeUserBiometricData() {
    const data = getBiometricData();
    const userKey = getCurrentUserKey();
    const userData = data[userKey];

    if (!userData) {
        data[userKey] = {
            records: []
        };

        saveBiometricData(data);
        return data[userKey];
    }

    /*
        Compatibilidad con la versión anterior:
        antes se guardaba una sola huella como:
        { enabled: true, label: "Huella dactilar de Luna" }
    */
    if (!Array.isArray(userData.records)) {
        data[userKey] = {
            records: userData.enabled
                ? [
                    {
                        id: crypto.randomUUID(),
                        label: userData.label || getDefaultFingerprintLabel(),
                        enabled: true,
                        registeredAt: userData.registeredAt || new Date().toISOString()
                    }
                ]
                : []
        };

        saveBiometricData(data);
    }

    return data[userKey];
}

function getEnabledFingerprints() {
    const userData = normalizeUserBiometricData();

    return userData.records.filter((record) => {
        return record.enabled;
    });
}

function createFingerprintItem(record) {
    const button = document.createElement("button");
    button.className = "biometric-option";
    button.type = "button";

    button.innerHTML = `
        <span class="biometric-icon fingerprint-icon">
            <img src="../../assets/images/configuration/finger-print.png" alt="">
        </span>

        <span class="biometric-text">
            ${record.label}
        </span>

        <img class="arrow-icon" src="../../assets/images/configuration/right_arrow.png" alt="">
    `;

    button.addEventListener("click", () => {
        window.location.href = `./biometric-detail.html?id=${record.id}`;
    });

    return button;
}

function renderBiometricAccess() {
    const records = getEnabledFingerprints();

    biometricList.innerHTML = "";

    if (records.length === 0) {
        biometricMessage.textContent = "Aún no tienes una huella dactilar registrada.";
    } else {
        biometricMessage.textContent = "";
    }

    records.forEach((record) => {
        biometricList.appendChild(createFingerprintItem(record));
    });
}

addBiometricButton.addEventListener("click", () => {
    window.location.href = "./biometric-enroll.html";
});

backButton.addEventListener("click", () => {
    window.location.href = "./security-settings.html";
});

renderBiometricAccess();