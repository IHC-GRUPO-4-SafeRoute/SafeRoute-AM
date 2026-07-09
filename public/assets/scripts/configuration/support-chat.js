/*
    Pantalla complementaria: Chat de Soporte Online

    Implementación:
    - Carga conversación según query param chatId o new.
    - Permite enviar mensajes escritos.
    - Simula respuestas automáticas del asistente.
    - Permite seleccionar y enviar archivos.
    - Permite seleccionar y enviar imágenes.
    - Permite simular envío de audio.
    - Guarda la conversación en localStorage.
*/

const SUPPORT_CHAT_MESSAGES_KEY = "safeRouteSupportChatMessages";
const SUPPORT_CHATS_KEY = "safeRouteSupportChats";

const backButton = document.getElementById("back-button");
const notificationLink = document.getElementById("notification-link");
const chatMessages = document.getElementById("chat-messages");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const fileInput = document.getElementById("file-input");
const imageInput = document.getElementById("image-input");
const clipButton = document.getElementById("clip-button");
const photoButton = document.getElementById("photo-button");
const audioButton = document.getElementById("audio-button");

const params = new URLSearchParams(window.location.search);
const isNewChat = params.get("new") === "true";
const chatIdParam = params.get("chatId");

const currentChatId = isNewChat
    ? `support-chat-${Date.now()}`
    : chatIdParam || "active-report-assistant";

const defaultConversation = [
    {
        sender: "assistant",
        text: "Hola! Bienvenido soy tu asistente virtual",
        time: ""
    },
    {
        sender: "assistant",
        text: "En que puedo ayudarte hoy?",
        time: "14:00"
    },
    {
        sender: "user",
        text: "¡Hola! Tengo una pregunta. ¿Cómo puedo realizar un reporte?",
        time: "14:01"
    },
    {
        sender: "assistant",
        text: "Respuesta a su solicitud: Puede generar un reporte dirigiéndose a la sección de reportes",
        time: ""
    },
    {
        sender: "assistant",
        text: "Presionando el botón de crear un reporte",
        time: "14:03"
    },
    {
        sender: "user",
        text: "Ok! Muchas gracias",
        time: "14:05"
    },
    {
        sender: "assistant",
        text: "Fue un placer atender su solicitud. ¡Hasta pronto!",
        time: ""
    }
];

const newConversation = [
    {
        sender: "assistant",
        text: "Hola! Bienvenido soy tu asistente virtual",
        time: ""
    },
    {
        sender: "assistant",
        text: "En que puedo ayudarte hoy?",
        time: getCurrentTime()
    }
];

function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
}

function getStoredMessages() {
    try {
        return JSON.parse(localStorage.getItem(SUPPORT_CHAT_MESSAGES_KEY)) || {};
    } catch (error) {
        return {};
    }
}

function saveStoredMessages(messagesData) {
    localStorage.setItem(SUPPORT_CHAT_MESSAGES_KEY, JSON.stringify(messagesData));
}

function getConversation() {
    const messagesData = getStoredMessages();

    if (!messagesData[currentChatId]) {
        messagesData[currentChatId] = isNewChat ? newConversation : defaultConversation;
        saveStoredMessages(messagesData);
    }

    return messagesData[currentChatId];
}

function saveConversation(messages) {
    const messagesData = getStoredMessages();

    messagesData[currentChatId] = messages;
    saveStoredMessages(messagesData);
}

function updateSupportChatList(lastMessage) {
    if (!isNewChat) {
        return;
    }

    let chats = [];

    try {
        chats = JSON.parse(localStorage.getItem(SUPPORT_CHATS_KEY)) || [];
    } catch (error) {
        chats = [];
    }

    const alreadyExists = chats.some((chat) => {
        return chat.id === currentChatId;
    });

    if (alreadyExists) {
        return;
    }

    const newChatSummary = {
        id: currentChatId,
        title: "Asistente de Reporte",
        lastMessage,
        dateLabel: "Hoy",
        finished: true
    };

    chats.unshift(newChatSummary);
    localStorage.setItem(SUPPORT_CHATS_KEY, JSON.stringify(chats));
}

function createMessageElement(message) {
    const row = document.createElement("div");
    row.className = `message-row ${message.sender}`;

    const bubble = document.createElement("div");
    bubble.className = "message-bubble";

    if (message.type === "image") {
        const label = document.createElement("span");
        label.textContent = message.text;

        const image = document.createElement("img");
        image.className = "message-image-preview";
        image.src = message.imageData;
        image.alt = "Imagen enviada";

        bubble.appendChild(label);
        bubble.appendChild(image);
    } else {
        bubble.textContent = message.text;
    }

    row.appendChild(bubble);

    if (message.time) {
        const time = document.createElement("span");
        time.className = "message-time";
        time.textContent = message.time;
        row.appendChild(time);
    }

    return row;
}

function renderMessages() {
    const messages = getConversation();

    chatMessages.innerHTML = "";

    messages.forEach((message) => {
        chatMessages.appendChild(createMessageElement(message));
    });

    if (!isNewChat && currentChatId !== "active-report-assistant") {
        const endedLabel = document.createElement("span");
        endedLabel.className = "chat-ended-label";
        endedLabel.textContent = "14:06 | Chat terminado";
        chatMessages.appendChild(endedLabel);
    }

    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });
}

function addMessage(sender, text, extraData = {}) {
    const messages = getConversation();

    const newMessage = {
        sender,
        text,
        time: getCurrentTime(),
        ...extraData
    };

    messages.push(newMessage);
    saveConversation(messages);

    if (sender === "user") {
        updateSupportChatList(text);
    }

    renderMessages();
}

function addAssistantReply(userMessage) {
    setTimeout(() => {
        const normalizedMessage = userMessage.toLowerCase();

        if (normalizedMessage.includes("reporte")) {
            addMessage(
                "assistant",
                "Puedes realizar un reporte desde la sección Reportes, completando el tipo de incidente, ubicación, descripción y evidencia."
            );
            return;
        }

        if (normalizedMessage.includes("ruta")) {
            addMessage(
                "assistant",
                "Puedes revisar rutas seguras desde la sección Rutas y elegir la alternativa con mejores indicadores de seguridad."
            );
            return;
        }

        if (normalizedMessage.includes("emergencia") || normalizedMessage.includes("sos")) {
            addMessage(
                "assistant",
                "Si estás en una situación de riesgo, usa el botón SOS o contacta a tus contactos de emergencia."
            );
            return;
        }

        if (normalizedMessage.includes("archivo")) {
            addMessage(
                "assistant",
                "Archivo recibido correctamente. Lo revisaremos como parte de tu solicitud de soporte."
            );
            return;
        }

        if (normalizedMessage.includes("foto") || normalizedMessage.includes("imagen")) {
            addMessage(
                "assistant",
                "Imagen recibida correctamente. Gracias por compartir la evidencia."
            );
            return;
        }

        if (normalizedMessage.includes("audio")) {
            addMessage(
                "assistant",
                "Audio recibido correctamente. Nuestro equipo lo revisará para darte una mejor orientación."
            );
            return;
        }

        addMessage(
            "assistant",
            "Gracias por escribirnos. Puedo ayudarte con reportes, rutas, alertas, configuración o seguridad de tu cuenta."
        );
    }, 700);
}

chatForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const message = chatInput.value.trim();

    if (!message) {
        return;
    }

    addMessage("user", message);
    chatInput.value = "";
    addAssistantReply(message);
});

chatInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        chatForm.requestSubmit();
    }
});

clipButton.addEventListener("click", () => {
    fileInput.click();
});

photoButton.addEventListener("click", () => {
    imageInput.click();
});

fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];

    if (!file) {
        return;
    }

    addMessage("user", `📎 Archivo adjunto: ${file.name}`);
    addAssistantReply("archivo adjunto");

    fileInput.value = "";
});

imageInput.addEventListener("change", () => {
    const imageFile = imageInput.files[0];

    if (!imageFile) {
        return;
    }

    const reader = new FileReader();

    reader.addEventListener("load", () => {
        addMessage(
            "user",
            `📷 Imagen enviada: ${imageFile.name}`,
            {
                type: "image",
                imageData: reader.result
            }
        );

        addAssistantReply("imagen enviada");
    });

    reader.readAsDataURL(imageFile);
    imageInput.value = "";
});

audioButton.addEventListener("click", () => {
    addMessage("user", "🎙️ Audio enviado al asistente.");
    addAssistantReply("audio enviado");
});

backButton.addEventListener("click", () => {
    window.location.href = "./support-online.html";
});

function updateNotificationReturnPath() {
    const currentPath = `../configuration/support-chat.html${window.location.search}`;
    notificationLink.href = `../notifications/notifications.html?returnTo=${encodeURIComponent(currentPath)}`;
}

updateNotificationReturnPath();
renderMessages();