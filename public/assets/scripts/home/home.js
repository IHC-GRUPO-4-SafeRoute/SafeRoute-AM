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

            document
                .querySelectorAll('.modal-overlay.show')
                .forEach(closeModal);

        }

    });

    const sosModal = document.getElementById('sos-modal');
    const openSosButton = document.getElementById('open-sos-modal');
    const closeSosButton = document.getElementById('close-sos-modal');
    const cancelSosButton = document.getElementById('cancel-sos');
    const confirmSosButton = document.getElementById('confirm-sos');

    const sosActivePanel = document.getElementById('sos-active-panel');
    const cancelActiveSosButton = document.getElementById('cancel-active-sos');
    const quickActionsPanel = document.querySelector('.quick-actions-panel');

    openSosButton?.addEventListener('click', () => {
        openModal(sosModal);
    });

    closeSosButton?.addEventListener('click', () => {
        closeModal(sosModal);
    });

    cancelSosButton?.addEventListener('click', () => {
        closeModal(sosModal);
    });

    confirmSosButton?.addEventListener('click', () => {
        closeModal(sosModal);
        activateSos();
    });

    cancelActiveSosButton?.addEventListener('click', () => {
        deactivateSos();
    });

    function activateSos() {
        sosActivePanel?.classList.remove('hidden');
        quickActionsPanel?.classList.add('hidden');
    }

    function deactivateSos() {
        sosActivePanel?.classList.add('hidden');
        quickActionsPanel?.classList.remove('hidden');
    }

});