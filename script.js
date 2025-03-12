// Inline JavaScript to ensure it's loaded
// DOM Elements
document.addEventListener('DOMContentLoaded', function () {
    const loginPage = document.getElementById('login-page');
    const scanPage = document.getElementById('scan-page');
    const connectedPage = document.getElementById('connected-page');
    const loginForm = document.getElementById('login-form');
    const nfcStatus = document.getElementById('nfc-status');
    const deviceId = document.getElementById('device-id');
    const skipNfcBtn = document.getElementById('skip-nfc-btn');
    const startScanBtn = document.getElementById('start-scan-btn');

    // Make sure all pages are hidden except the active one
    document.querySelectorAll('.page').forEach(page => {
        if (page.id !== 'login-page') {
            page.style.display = 'none';
        }
    });

    // Show specified page
    function showPage(pageId) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.style.display = 'none';
        });

        // Show the specified page
        const pageToShow = document.getElementById(pageId);
        if (pageToShow) {
            pageToShow.style.display = 'block';
        }
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
