const SUPPORT_CHATS_KEY = "safeRouteSupportChats";

const backButton = document.getElementById("back-button");
const activeChatCard = document.getElementById("active-chat-card");
const finishedChatsList = document.getElementById("finished-chats-list");
const newChatButton = document.getElementById("new-chat-button");
const params = new URLSearchParams(window.location.search);
const returnTo = params.get("returnTo");

const initialFinishedChats = [
    {
        id: "help-center-ready-account",
        title: "Centro de ayuda",
        lastMessage: "Tu cuenta está lista para usar...",
        dateLabel: "Feb 8",
        finished: true
    },
    {
        id: "report-assistant-dec-24",
        title: "Asistente de Reporte",
        lastMessage: "¡Hola! Estoy aquí para ayudarte.",
        dateLabel: "Dic 24",
        finished: true
    },
    {
        id: "report-assistant-nov-5",
        title: "Asistente de Reporte",
        lastMessage: "¡Hola! Estoy aquí para ayudarte.",
        dateLabel: "Nov 5",
        finished: true
    },
    {
        id: "report-assistant-sep-4",
        title: "Asistente de Reporte",
        lastMessage: "Hola, ¿cómo estás hoy?",
        dateLabel: "Set 4",
        finished: true
    }
];

function getStoredChats() {
    try {
        const parsedChats = JSON.parse(localStorage.getItem(SUPPORT_CHATS_KEY));
        return Array.isArray(parsedChats) ? parsedChats : [];
    } catch (error) {
        console.error("No se pudo leer safeRouteSupportChats:", error);
        return [];
    }
}

function saveStoredChats(chats) {
    localStorage.setItem(SUPPORT_CHATS_KEY, JSON.stringify(chats));
}

function ensureInitialChats() {
    const existingChats = getStoredChats();

    if (existingChats.length > 0) {
        return existingChats;
    }

    saveStoredChats(initialFinishedChats);
    return initialFinishedChats;
}

function createFinishedChatButton(chat) {
    const button = document.createElement("button");
    button.className = "finished-chat-item";
    button.type = "button";
    button.setAttribute("data-chat-id", chat.id);

    const icon = document.createElement("img");
    icon.className = "chat-icon";
    icon.src = "../../assets/images/configuration/chatbot_message.png";
    icon.alt = "";

    const chatInfo = document.createElement("div");
    chatInfo.className = "chat-info";

    const title = document.createElement("h2");
    title.textContent = chat.title;

    const preview = document.createElement("p");
    preview.textContent = chat.lastMessage;

    const date = document.createElement("span");
    date.className = "chat-time";
    date.textContent = chat.dateLabel;

    chatInfo.appendChild(title);
    chatInfo.appendChild(preview);

    button.appendChild(icon);
    button.appendChild(chatInfo);
    button.appendChild(date);

    button.addEventListener("click", () => {
        window.location.href = `./support-chat.html?chatId=${chat.id}`;
    });

    return button;
}

function renderFinishedChats() {
    const chats = ensureInitialChats();
    const finishedChats = chats.filter((chat) => chat && chat.id && chat.finished !== false);

    finishedChatsList.innerHTML = "";

    finishedChats.forEach((chat) => {
        finishedChatsList.appendChild(createFinishedChatButton(chat));
    });
}

backButton.addEventListener("click", () => {
    if (returnTo) {
        window.location.href = returnTo;
        return;
    }

    window.location.href = "./support-security.html";
});

activeChatCard.addEventListener("click", () => {
    window.location.href = "./support-chat.html?chatId=active-report-assistant";
});

newChatButton.addEventListener("click", () => {
    window.location.href = "./support-chat.html?new=true";
});

renderFinishedChats();
