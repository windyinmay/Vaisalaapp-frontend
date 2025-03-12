document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const welcomePage = document.getElementById('welcome-page');
    const appOverviewPage = document.getElementById('app-overview-page');
    const loginPage = document.getElementById('login-page');
    const scanPage = document.getElementById('scan-page');
    const connectedPage = document.getElementById('connected-page');
    const loginForm = document.getElementById('login-form');
    const nfcStatus = document.getElementById('nfc-status');
    const deviceId = document.getElementById('device-id');
    const skipNfcBtn = document.getElementById('skip-nfc-btn');
    const startScanBtn = document.getElementById('start-scan-btn');
    const skipInstructionsBtn = document.getElementById('skip-instructions-btn');
    const mainMenuBtns = document.querySelectorAll('#welcome-page .btn');
    const backButton = document.querySelector('.back-button');

    if (backButton) {
        backButton.addEventListener('click', function () {
            showPage('welcome-page');
        });
    }

    // Update top toolbar text based on current page
    function updateTopToolbarText_no() {
        const backButtonText = document.querySelector('.back-button span');
        if (!backButtonText) return;

        if (document.getElementById('app-overview-page').classList.contains('active')) {
            backButtonText.textContent = 'Set up new sensor';
        } else if (document.getElementById('login-page').classList.contains('active')) {
            backButtonText.textContent = 'Calibrate existing sensor';
        } else if (document.getElementById('scan-page').classList.contains('active')) {
            backButtonText.textContent = 'Scan NFC tag';
        } else if (document.getElementById('connected-page').classList.contains('active')) {
            backButtonText.textContent = 'Connected device';
        }
    }

    // Call this function when changing pages
    const originalShowPage = window.showPage || function () { };
    window.showPage = function (pageId) {
        originalShowPage(pageId);
        updateTopToolbarText();
    };

    // Show specified page
    function showPageold(pageId) {
        // Hide all pages by removing active class
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // Show the specified page by adding active class
        const pageToShow = document.getElementById(pageId);
        if (pageToShow) {
            pageToShow.classList.add('active');
        }
    }
    // Add this near the top of your document.addEventListener('DOMContentLoaded', function () { ... });
    // This adds a class to the body to indicate when we're at the welcome page

    // Set initial state based on which page is active on load
    if (document.getElementById('welcome-page').classList.contains('active')) {
        document.body.classList.add('at-welcome-page');
    } else {
        document.body.classList.remove('at-welcome-page');
    }

    // Update the showPage function to manage the body class
    function showPage(pageId) {
        // Hide all pages by removing active class
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // Show the specified page by adding active class
        const pageToShow = document.getElementById(pageId);
        if (pageToShow) {
            pageToShow.classList.add('active');
        }

        // Update body class to control toolbar visibility
        if (pageId === 'welcome-page') {
            document.body.classList.add('at-welcome-page');
        } else {
            document.body.classList.remove('at-welcome-page');
        }
    }

    // Set up event listeners for welcome page buttons
    if (mainMenuBtns) {
        mainMenuBtns.forEach((btn, index) => {
            btn.addEventListener('click', function () {
                if (index === 0) { // "Set up new sensor"
                    showPage('app-overview-page');
                } else if (index === 1) { // "Calibrate existing sensor"
                    showPage('login-page');
                } else if (index === 2) { // "Instructions"
                    showPage('app-overview-page');
                }
            });
        });
    }

    // Skip instructions button
    if (skipInstructionsBtn) {
        skipInstructionsBtn.addEventListener('click', function () {
            showPage('login-page');
        });
    }

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent form submission
            showPage('scan-page');
            return false;
        });
    }

    // Start scan button - initiate NFC scanning
    if (startScanBtn) {
        startScanBtn.addEventListener('click', function () {
            startNFC();
        });
    }

    // Skip NFC button - just go to the connected page
    if (skipNfcBtn) {
        skipNfcBtn.addEventListener('click', function () {
            if (deviceId) {
                deviceId.textContent = "NO-NFC-USED";
            }
            showPage('connected-page');
        });
    }

    // Done button
    const doneBtn = document.getElementById('done-btn');
    if (doneBtn) {
        doneBtn.addEventListener('click', function () {
            showPage('welcome-page');
        });
    }

    // NFC Scanning functionality
    async function startNFC() {
        // Check if Web NFC is available
        if (typeof NDEFReader === 'undefined') {
            if (nfcStatus) {
                nfcStatus.textContent = 'Web NFC is not supported in this browser';
            }
            return;
        }

        try {
            const ndef = new NDEFReader();
            if (nfcStatus) {
                nfcStatus.textContent = 'Requesting NFC permissions...';
            }

            await ndef.scan();
            if (nfcStatus) {
                nfcStatus.textContent = 'NFC Started! Scanning for tags...';
            }

            ndef.addEventListener("reading", (event) => {
                if (deviceId) {
                    deviceId.textContent = event.serialNumber;
                }
                showPage('connected-page');
            });

            ndef.addEventListener("readingerror", (error) => {
                if (nfcStatus) {
                    nfcStatus.textContent = `Error reading tag: ${error.message}`;
                }
            });

        } catch (error) {
            let errorMessage = `Error: ${error.name}`;
            if (error.name === 'NotAllowedError') {
                errorMessage += ' - NFC permission denied';
            } else if (error.name === 'NotSupportedError') {
                errorMessage += ' - NFC not supported on this device';
            } else {
                errorMessage += ` - ${error.message}`;
            }
            if (nfcStatus) {
                nfcStatus.textContent = errorMessage;
            }
        }
    }

});