const homeUserGreeting = document.getElementById("home-user-greeting");

function getCurrentSessionUser() {
    try {
        return JSON.parse(localStorage.getItem("saferouteCurrentUser"));
    } catch (error) {
        return null;
    }
}

function getEditedProfile() {
    try {
        return JSON.parse(localStorage.getItem("safeRouteUserProfile"));
    } catch (error) {
        return null;
    }
}

function getFirstName(fullName) {
    if (!fullName) {
        return "usuario";
    }

    return fullName.trim().split(" ")[0];
}

function renderHomeUserName() {
    const currentUser = getCurrentSessionUser();
    const editedProfile = getEditedProfile();

    const profileBelongsToCurrentUser =
        editedProfile &&
        currentUser &&
        editedProfile.email === currentUser.email;

    const userName =
        profileBelongsToCurrentUser
            ? editedProfile.name
            : currentUser?.name || "usuario";

    // El saludo se arma con un span traducible ("Buenos días" / "Good morning")
    // más el nombre del usuario, que no se traduce.
    if (homeUserGreeting) {
        homeUserGreeting.innerHTML = '';

        const greetingWordSpan = document.createElement('span');
        greetingWordSpan.setAttribute('data-i18n', 'home.goodMorning');
        greetingWordSpan.textContent = 'Buenos días';

        homeUserGreeting.appendChild(greetingWordSpan);
        homeUserGreeting.appendChild(document.createTextNode(` ${getFirstName(userName)}`));

        // Como el span se crea después de que corrió la traducción inicial,
        // se traduce de una vez si el motor de i18n ya está disponible.
        if (typeof window.applySafeRouteTranslations === 'function') {
            window.applySafeRouteTranslations();
        }
    }
}

renderHomeUserName();

document.addEventListener('DOMContentLoaded', () => {
    function openModal(modal) {
        if (!modal) return;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        if (!modal) return;
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.modal-overlay').forEach((overlay) => {
        overlay.addEventListener('click', (event) => {
            if (event.target === overlay) {
                closeModal(overlay);
            }
        });
    });
    
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.show').forEach(closeModal);
            document.querySelectorAll('.center-overlay-container:not(.hidden)').forEach(el => el.classList.add('hidden'));
        }
    });

    const riskDetailModal = document.getElementById('risk-detail-modal'); 
    const mediumRiskModal = document.getElementById('medium-risk-modal'); 
    const activeNodeModal = document.getElementById('active-node-modal');
    const inactiveNodeModal = document.getElementById('inactive-node-modal'); 
    const zoneInfoModalTop = document.getElementById('zone-info-modal-top'); 
    const zoneInfoModal = document.getElementById('zone-info-modal'); 
    const zoneListModal = document.getElementById('zone-list-modal'); 
    const filterModal = document.getElementById('filter-modal'); 
    const navigationModal = document.getElementById('navigation-modal'); 
    const shareModal = document.getElementById('share-modal');
    const timerModal = document.getElementById('timer-modal');

    const btnOpenRiskDetail = document.getElementById('open-risk-detail');
    const btnOpenMediumRisk = document.getElementById('open-medium-risk');
    const btnOpenActiveNode = document.getElementById('open-active-node');
    const btnOpenInactiveNode = document.getElementById('open-inactive-node');
    const btnOpenZoneInfoTop = document.getElementById('open-zone-info-top');
    const btnOpenZoneInfoBottom = document.getElementById('open-zone-info-bottom');
    const btnOpenZoneList = document.getElementById('open-zone-list'); 
    const btnOpenFilter = document.getElementById('open-filter');
    const homeChatbotButton = document.getElementById('home-chatbot-button');

    const openNavigationBtn = document.getElementById('open-navigation-modal');
    const openShareBtn = document.getElementById('open-share-modal');
    const openTimerBtn = document.getElementById('open-timer-modal');

    btnOpenRiskDetail?.addEventListener('click', () => openModal(riskDetailModal));
    btnOpenMediumRisk?.addEventListener('click', () => openModal(mediumRiskModal));
    btnOpenActiveNode?.addEventListener('click', () => openModal(activeNodeModal));
    btnOpenInactiveNode?.addEventListener('click', () => openModal(inactiveNodeModal));
    btnOpenZoneList?.addEventListener('click', () => openModal(zoneListModal));
    btnOpenFilter?.addEventListener('click', () => openModal(filterModal));

    btnOpenZoneInfoTop?.addEventListener('click', () => openModal(zoneInfoModalTop));
    btnOpenZoneInfoBottom?.addEventListener('click', () => openModal(zoneInfoModal));
    homeChatbotButton?.addEventListener('click', () => {
        window.location.href = '../configuration/support-online.html?returnTo=../home/home.html';
    });

    openNavigationBtn?.addEventListener('click', () => openModal(riskDetailModal));
    document.getElementById('close-risk-detail')?.addEventListener('click', () => closeModal(riskDetailModal));
    document.getElementById('close-medium-risk')?.addEventListener('click', () => closeModal(mediumRiskModal));
    document.getElementById('close-active-node')?.addEventListener('click', () => closeModal(activeNodeModal));
    document.getElementById('close-inactive-node')?.addEventListener('click', () => closeModal(inactiveNodeModal));
    document.getElementById('close-zone-info-top')?.addEventListener('click', () => closeModal(zoneInfoModalTop));
    document.getElementById('close-zone-info')?.addEventListener('click', () => closeModal(zoneInfoModal));
    document.getElementById('close-zone-list')?.addEventListener('click', () => closeModal(zoneListModal));
    document.getElementById('close-filter-modal')?.addEventListener('click', () => closeModal(filterModal));
    document.getElementById('close-navigation-modal')?.addEventListener('click', () => closeModal(navigationModal));
    document.getElementById('cancel-navigation')?.addEventListener('click', () => closeModal(navigationModal));
    document.getElementById('close-share-modal')?.addEventListener('click', () => closeModal(shareModal));
    document.getElementById('close-timer-modal')?.addEventListener('click', () => closeModal(timerModal));
    document.getElementById('cancel-timer')?.addEventListener('click', () => closeModal(timerModal));
    const openNotificationsButton = document.getElementById('open-notifications');
    openNotificationsButton?.addEventListener('click', () => {
    window.location.href = '../notifications/notifications.html';
    });
    openTimerBtn?.addEventListener('click', () => {
        resetTimerModal();
        openModal(timerModal);
    });

    // ====== Compartir Ubicación ======
    const shareContactCheckboxes = document.querySelectorAll('input[name="share-contact"]');
    const shareDurationRadios = document.querySelectorAll('input[name="share-duration"]');
    const shareContactListEl = document.querySelector('.share-contact-list');
    const shareToastOverlay = document.getElementById('share-toast-overlay');
    const shareToastMessage = document.getElementById('share-toast-message');
    let shareToastTimeout = null;

    function resetShareModal() {
        shareContactCheckboxes.forEach(cb => cb.checked = false);
        shareDurationRadios.forEach(radio => {
            radio.checked = radio.value === 'arrival';
        });
    }

    openShareBtn?.addEventListener('click', () => {
        resetShareModal();
        openModal(shareModal);
    });

    document.getElementById('share-location')?.addEventListener('click', async () => {
        const selectedContacts = Array.from(shareContactCheckboxes).filter(cb => cb.checked);

        if (selectedContacts.length === 0) {
            shareContactListEl.classList.remove('shake');
            void shareContactListEl.offsetWidth; // reinicia la animación
            shareContactListEl.classList.add('shake');
            return;
        }

        const selectedDuration = document.querySelector('input[name="share-duration"]:checked')?.value || 'arrival';

        // Los nombres de los contactos no se traducen (son datos), pero el
        // texto de duración y el conector "y"/"and" sí, según el idioma activo.
        const durationLabel = (typeof window.getTranslation === 'function')
            ? await window.getTranslation(`home.shareDurationLabels.${selectedDuration}`)
            : selectedDuration;
        const connector = (typeof window.getTranslation === 'function')
            ? await window.getTranslation('home.andConnector')
            : 'y';

        const names = selectedContacts.map(cb =>
            cb.closest('.share-contact').querySelector('strong').textContent
        );
        const namesText = names.length === 1
            ? names[0]
            : names.slice(0, -1).join(', ') + ` ${connector} ` + names[names.length - 1];

        if (shareToastMessage) {
            shareToastMessage.removeAttribute('data-i18n');
            shareToastMessage.textContent = `Compartiendo con ${namesText} · ${durationLabel}`;
        }

        closeModal(shareModal);

        shareToastOverlay?.classList.remove('hidden');
        clearTimeout(shareToastTimeout);
        shareToastTimeout = setTimeout(() => {
            shareToastOverlay?.classList.add('hidden');
        }, 2500);
    });

    document.getElementById('close-share-toast')?.addEventListener('click', () => {
        shareToastOverlay?.classList.add('hidden');
        clearTimeout(shareToastTimeout);
    });

    // ====== Temporizador de Seguridad ======
    const timerPresets = [5, 15, 30, 60]; // minutos permitidos
    const securityTimeInput = document.getElementById('security-time');
    const selectedTimeLabel = document.getElementById('selected-time');
    const rangeTicks = document.querySelectorAll('.range-tick');

    const timerNotificationBanner = document.getElementById('timer-notification-banner');
    const timerNotificationTime = document.getElementById('timer-notification-time');
    const timerProgressBar = document.getElementById('timer-progress-bar');
    const closeTimerNotificationBtn = document.getElementById('close-timer-notification');

    let timerCountdownInterval = null;
    let timerRemainingSeconds = 0;

    function formatTimerClock(totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function updateActiveTick(index) {
        rangeTicks.forEach((tick) => {
            tick.classList.toggle('active', Number(tick.dataset.value) === index);
        });
    }

    function resetTimerModal() {
        securityTimeInput.value = 1; // 15 min por defecto
        selectedTimeLabel.textContent = `${timerPresets[1]} min`;
        updateActiveTick(1);
    }

    securityTimeInput?.addEventListener('input', () => {
        const index = Number(securityTimeInput.value);
        selectedTimeLabel.textContent = `${timerPresets[index]} min`;
        updateActiveTick(index);
    });

    function stopTimerCountdown() {
        clearInterval(timerCountdownInterval);
        timerCountdownInterval = null;
    }

    function hideTimerNotification() {
        stopTimerCountdown();
        timerNotificationBanner.classList.remove('show');
        setTimeout(() => timerNotificationBanner.classList.add('hidden'), 400);
    }

    function showTimerNotification(minutes) {
        timerRemainingSeconds = minutes * 60;
        timerNotificationTime.textContent = formatTimerClock(timerRemainingSeconds);

        // Mostrar la notificación con animación de deslizamiento desde arriba
        timerNotificationBanner.classList.remove('hidden');
        void timerNotificationBanner.offsetWidth; // fuerza reflow para que la transición se aplique
        timerNotificationBanner.classList.add('show');

        // Animación de la barra de progreso reduciéndose durante todo el tiempo elegido
        timerProgressBar.style.transition = 'none';
        timerProgressBar.style.width = '100%';
        void timerProgressBar.offsetWidth;
        timerProgressBar.style.transition = `width ${timerRemainingSeconds}s linear`;
        timerProgressBar.style.width = '0%';

        stopTimerCountdown();
        timerCountdownInterval = setInterval(() => {
            timerRemainingSeconds -= 1;

            if (timerRemainingSeconds <= 0) {
                timerNotificationTime.textContent = '00:00';
                stopTimerCountdown();
                setTimeout(hideTimerNotification, 1500);
                return;
            }

            timerNotificationTime.textContent = formatTimerClock(timerRemainingSeconds);
        }, 1000);
    }

    document.getElementById('start-timer')?.addEventListener('click', () => {
        const index = Number(securityTimeInput.value);
        const minutes = timerPresets[index];
        closeModal(timerModal);
        showTimerNotification(minutes);
    });

    closeTimerNotificationBtn?.addEventListener('click', hideTimerNotification);

    const filterOptions = document.querySelectorAll('.filter-option');
    filterOptions.forEach(option => {
        option.addEventListener('click', () => {
            option.classList.toggle('active');
        });
    });

    document.getElementById('card-farmacia')?.addEventListener('click', () => {
        closeModal(zoneListModal);
        openModal(activeNodeModal);
    });

    document.getElementById('card-medium-risk')?.addEventListener('click', () => {
        closeModal(zoneListModal);
        openModal(mediumRiskModal);
    });

    document.getElementById('card-high-risk')?.addEventListener('click', () => {
        closeModal(zoneListModal);
        openModal(riskDetailModal);
    });

    const toggleButtons = document.querySelectorAll('.toggle-btn');

    toggleButtons.forEach(btn => {
        let isOpen = btn.getAttribute('data-default-open') === 'true';
        const targetPanel = document.getElementById(btn.getAttribute('data-target'));
        const iconImg = document.getElementById(btn.getAttribute('data-icon'));
        const textSpan = document.getElementById(btn.getAttribute('data-text'));

        btn.addEventListener('click', () => {
            isOpen = !isOpen;

            if (isOpen) {
                targetPanel.classList.remove('hidden');
                textSpan.setAttribute('data-i18n', 'home.nodeShowLess');
                iconImg.src = '../../assets/images/home/dropup.png';
            } else {
                targetPanel.classList.add('hidden');
                if (btn.getAttribute('data-target') === 'inactive-info-panel') {
                    textSpan.setAttribute('data-i18n', 'home.nodeShowMoreInactive');
                } else {
                    textSpan.setAttribute('data-i18n', 'home.nodeShowMore');
                }
                iconImg.src = '../../assets/images/home/dropdown.png';
            }

            // Vuelve a traducir para que el nuevo texto salga en el idioma activo
            if (typeof window.applySafeRouteTranslations === 'function') {
                window.applySafeRouteTranslations();
            }
        });
    });

    const inactiveToastOverlay = document.getElementById('inactive-toast-overlay');
    const activeToastOverlay = document.getElementById('active-toast-overlay');

    document.getElementById('trigger-inactive-toast')?.addEventListener('click', () => {
        inactiveToastOverlay.classList.remove('hidden');
    });

    document.getElementById('close-inactive-toast')?.addEventListener('click', () => {
        inactiveToastOverlay.classList.add('hidden');
    });

    document.getElementById('trigger-active-toast')?.addEventListener('click', () => {
        activeToastOverlay.classList.remove('hidden');
    });

    document.getElementById('close-active-toast')?.addEventListener('click', () => {
        activeToastOverlay.classList.add('hidden');
    });

    const sosModal = document.getElementById('sos-modal');
    const openSosButton = document.getElementById('open-sos-modal');
    const closeSosButton = document.getElementById('close-sos-modal');
    const cancelSosButton = document.getElementById('cancel-sos');
    const confirmSosButton = document.getElementById('confirm-sos');

    const sosActivePanel = document.getElementById('sos-active-panel');
    const cancelActiveSosButton = document.getElementById('cancel-active-sos');
    const quickActionsPanel = document.querySelector('.quick-actions-panel');

    openSosButton?.addEventListener('click', () => openModal(sosModal));
    closeSosButton?.addEventListener('click', () => closeModal(sosModal));
    cancelSosButton?.addEventListener('click', () => closeModal(sosModal));

    confirmSosButton?.addEventListener('click', () => {
        closeModal(sosModal);
        sosActivePanel?.classList.remove('hidden');
        quickActionsPanel?.classList.add('hidden');
    });

    cancelActiveSosButton?.addEventListener('click', () => {
        sosActivePanel?.classList.add('hidden');
        quickActionsPanel?.classList.remove('hidden');
    });
});