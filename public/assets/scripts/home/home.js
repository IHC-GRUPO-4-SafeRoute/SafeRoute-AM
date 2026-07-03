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
                textSpan.textContent = 'Ocultar información';
                iconImg.src = '../../assets/images/home/dropup.png';
            } else {
                targetPanel.classList.add('hidden');
                if (btn.getAttribute('data-target') === 'inactive-info-panel') {
                    textSpan.textContent = 'Ver más información del nodo';
                } else {
                    textSpan.textContent = 'Ver más información';
                }
                iconImg.src = '../../assets/images/home/dropdown.png';
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